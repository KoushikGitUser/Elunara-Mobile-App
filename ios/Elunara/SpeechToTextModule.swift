import Foundation
import Speech
import AVFoundation
import React

@objc(SpeechToTextModule)
class SpeechToTextModule: RCTEventEmitter {

  private var speechRecognizer: SFSpeechRecognizer?
  private var recognitionRequest: SFSpeechAudioBufferRecognitionRequest?
  private var recognitionTask: SFSpeechRecognitionTask?
  private let audioEngine = AVAudioEngine()
  private var hasListeners = false
  private var isListening = false

  override init() {
    super.init()
  }

  // MARK: - RCTEventEmitter

  override static func requiresMainQueueSetup() -> Bool {
    return true
  }

  override func supportedEvents() -> [String]! {
    return [
      "onSpeechStart",
      "onSpeechEnd",
      "onSpeechResults",
      "onSpeechPartialResults",
      "onSpeechError",
      "onSpeechVolumeChanged"
    ]
  }

  override func startObserving() {
    hasListeners = true
  }

  override func stopObserving() {
    hasListeners = false
  }

  private func sendEventSafe(_ name: String, body: [String: Any]) {
    if hasListeners {
      sendEvent(withName: name, body: body)
    }
  }

  // MARK: - Public methods exposed to JS

  @objc(startListening:)
  func startListening(_ locale: NSString?) {
    DispatchQueue.main.async {
      self.startInternal(locale: locale as String?)
    }
  }

  @objc(stopListening)
  func stopListening() {
    DispatchQueue.main.async {
      self.stopInternal()
    }
  }

  @objc(isAvailable:rejecter:)
  func isAvailable(_ resolve: @escaping RCTPromiseResolveBlock,
                   rejecter reject: @escaping RCTPromiseRejectBlock) {
    let recognizer = SFSpeechRecognizer()
    let available = recognizer?.isAvailable ?? false
    resolve(available)
  }

  // MARK: - Internal logic

  private func startInternal(locale: String?) {
    // Stop any prior session
    stopInternal()

    // Request authorization (speech)
    SFSpeechRecognizer.requestAuthorization { [weak self] authStatus in
      DispatchQueue.main.async {
        guard let self = self else { return }
        switch authStatus {
        case .authorized:
          self.beginRecognition(locale: locale)
        case .denied:
          self.sendEventSafe("onSpeechError", body: ["error": "Speech recognition permission denied", "code": 1])
        case .restricted:
          self.sendEventSafe("onSpeechError", body: ["error": "Speech recognition restricted on this device", "code": 2])
        case .notDetermined:
          self.sendEventSafe("onSpeechError", body: ["error": "Speech recognition not authorized", "code": 3])
        @unknown default:
          self.sendEventSafe("onSpeechError", body: ["error": "Unknown authorization status", "code": 4])
        }
      }
    }
  }

  private func beginRecognition(locale: String?) {
    let chosenLocale: Locale
    if let loc = locale, !loc.isEmpty {
      chosenLocale = Locale(identifier: loc)
    } else {
      chosenLocale = Locale.current
    }

    speechRecognizer = SFSpeechRecognizer(locale: chosenLocale) ?? SFSpeechRecognizer()

    guard let recognizer = speechRecognizer, recognizer.isAvailable else {
      sendEventSafe("onSpeechError", body: ["error": "Speech recognition not available on this device", "code": 5])
      return
    }

    do {
      // Configure audio session
      let audioSession = AVAudioSession.sharedInstance()
      try audioSession.setCategory(.record, mode: .measurement, options: .duckOthers)
      try audioSession.setActive(true, options: .notifyOthersOnDeactivation)

      recognitionRequest = SFSpeechAudioBufferRecognitionRequest()
      guard let recognitionRequest = recognitionRequest else {
        sendEventSafe("onSpeechError", body: ["error": "Unable to create recognition request", "code": 6])
        return
      }
      recognitionRequest.shouldReportPartialResults = true

      let inputNode = audioEngine.inputNode
      let recordingFormat = inputNode.outputFormat(forBus: 0)

      // Remove any existing tap before installing
      inputNode.removeTap(onBus: 0)
      inputNode.installTap(onBus: 0, bufferSize: 1024, format: recordingFormat) { [weak self] buffer, _ in
        self?.recognitionRequest?.append(buffer)

        // Volume metering — RMS approximation
        guard let channelData = buffer.floatChannelData?[0] else { return }
        let frameLength = Int(buffer.frameLength)
        var sum: Float = 0
        for i in 0..<frameLength {
          sum += channelData[i] * channelData[i]
        }
        let rms = sqrt(sum / Float(frameLength))
        let avgPower = 20 * log10(max(rms, 0.000001))
        self?.sendEventSafe("onSpeechVolumeChanged", body: ["value": Double(avgPower)])
      }

      audioEngine.prepare()
      try audioEngine.start()

      isListening = true
      sendEventSafe("onSpeechStart", body: [:])

      recognitionTask = recognizer.recognitionTask(with: recognitionRequest) { [weak self] result, error in
        guard let self = self else { return }

        if let result = result {
          let text = result.bestTranscription.formattedString
          if result.isFinal {
            self.sendEventSafe("onSpeechResults", body: ["text": text])
            self.stopInternal()
          } else {
            self.sendEventSafe("onSpeechPartialResults", body: ["text": text])
          }
        }

        if let error = error {
          let nsError = error as NSError
          // Code 203 / 1110 = "no speech" — match Android behavior of silent ignore by passing code through
          self.sendEventSafe("onSpeechError", body: [
            "error": nsError.localizedDescription,
            "code": nsError.code
          ])
          self.stopInternal()
        }
      }
    } catch {
      sendEventSafe("onSpeechError", body: [
        "error": error.localizedDescription,
        "code": -1
      ])
      stopInternal()
    }
  }

  private func stopInternal() {
    if audioEngine.isRunning {
      audioEngine.stop()
      audioEngine.inputNode.removeTap(onBus: 0)
    }
    recognitionRequest?.endAudio()
    recognitionTask?.cancel()
    recognitionRequest = nil
    recognitionTask = nil

    if isListening {
      isListening = false
      sendEventSafe("onSpeechEnd", body: [:])
    }

    do {
      try AVAudioSession.sharedInstance().setActive(false, options: .notifyOthersOnDeactivation)
    } catch {
      // Ignore
    }
  }

  override func invalidate() {
    super.invalidate()
    DispatchQueue.main.async {
      self.stopInternal()
    }
  }
}
