package com.smgdev.elunara

import android.content.Intent
import android.os.Bundle
import android.speech.RecognitionListener
import android.speech.RecognizerIntent
import android.speech.SpeechRecognizer
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.util.Locale

class SpeechToTextModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private var speechRecognizer: SpeechRecognizer? = null
    private var isListening = false

    override fun getName(): String = "SpeechToTextModule"

    private fun sendEvent(eventName: String, params: WritableMap) {
        reactApplicationContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
    }

    @ReactMethod
    fun startListening(locale: String?) {
        val activity = reactApplicationContext.currentActivity ?: return

        activity.runOnUiThread {
            try {
                stopListeningInternal()

                if (!SpeechRecognizer.isRecognitionAvailable(reactApplicationContext)) {
                    val params = Arguments.createMap().apply {
                        putString("error", "Speech recognition not available on this device")
                    }
                    sendEvent("onSpeechError", params)
                    return@runOnUiThread
                }

                speechRecognizer = SpeechRecognizer.createSpeechRecognizer(reactApplicationContext)

                speechRecognizer?.setRecognitionListener(object : RecognitionListener {
                    override fun onReadyForSpeech(params: Bundle?) {
                        isListening = true
                        sendEvent("onSpeechStart", Arguments.createMap())
                    }

                    override fun onBeginningOfSpeech() {}

                    override fun onRmsChanged(rmsdB: Float) {
                        val params = Arguments.createMap().apply {
                            putDouble("value", rmsdB.toDouble())
                        }
                        sendEvent("onSpeechVolumeChanged", params)
                    }

                    override fun onBufferReceived(buffer: ByteArray?) {}

                    override fun onEndOfSpeech() {
                        isListening = false
                        sendEvent("onSpeechEnd", Arguments.createMap())
                    }

                    override fun onError(error: Int) {
                        isListening = false
                        val errorMessage = when (error) {
                            SpeechRecognizer.ERROR_AUDIO -> "Audio recording error"
                            SpeechRecognizer.ERROR_CLIENT -> "Client side error"
                            SpeechRecognizer.ERROR_INSUFFICIENT_PERMISSIONS -> "Insufficient permissions"
                            SpeechRecognizer.ERROR_NETWORK -> "Network error"
                            SpeechRecognizer.ERROR_NETWORK_TIMEOUT -> "Network timeout"
                            SpeechRecognizer.ERROR_NO_MATCH -> "No speech detected"
                            SpeechRecognizer.ERROR_RECOGNIZER_BUSY -> "Recognizer busy"
                            SpeechRecognizer.ERROR_SERVER -> "Server error"
                            SpeechRecognizer.ERROR_SPEECH_TIMEOUT -> "No speech input"
                            else -> "Unknown error"
                        }
                        val params = Arguments.createMap().apply {
                            putString("error", errorMessage)
                            putInt("code", error)
                        }
                        sendEvent("onSpeechError", params)
                    }

                    override fun onResults(results: Bundle?) {
                        isListening = false
                        val matches = results?.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
                        val params = Arguments.createMap().apply {
                            putString("text", matches?.firstOrNull() ?: "")
                        }
                        sendEvent("onSpeechResults", params)
                    }

                    override fun onPartialResults(partialResults: Bundle?) {
                        val matches = partialResults?.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
                        val params = Arguments.createMap().apply {
                            putString("text", matches?.firstOrNull() ?: "")
                        }
                        sendEvent("onSpeechPartialResults", params)
                    }

                    override fun onEvent(eventType: Int, params: Bundle?) {}
                })

                val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply {
                    putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
                    putExtra(RecognizerIntent.EXTRA_LANGUAGE, locale ?: Locale.getDefault().toString())
                    putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true)
                    putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 1)
                }

                speechRecognizer?.startListening(intent)
            } catch (e: Exception) {
                val params = Arguments.createMap().apply {
                    putString("error", e.message ?: "Failed to start speech recognition")
                }
                sendEvent("onSpeechError", params)
            }
        }
    }

    @ReactMethod
    fun stopListening() {
        reactApplicationContext.currentActivity?.runOnUiThread {
            stopListeningInternal()
        }
    }

    private fun stopListeningInternal() {
        try {
            speechRecognizer?.stopListening()
            speechRecognizer?.destroy()
            speechRecognizer = null
            isListening = false
        } catch (e: Exception) {
            // Ignore cleanup errors
        }
    }

    @ReactMethod
    fun isAvailable(promise: Promise) {
        promise.resolve(SpeechRecognizer.isRecognitionAvailable(reactApplicationContext))
    }

    @ReactMethod
    fun addListener(eventName: String) {
        // Required for NativeEventEmitter
    }

    @ReactMethod
    fun removeListeners(count: Int) {
        // Required for NativeEventEmitter
    }

    override fun onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy()
        stopListeningInternal()
    }
}
