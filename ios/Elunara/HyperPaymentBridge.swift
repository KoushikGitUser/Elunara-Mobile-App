import Foundation
import React
import HyperSDK
import WebKit

@objc(HyperPaymentBridge)
class HyperPaymentBridge: RCTEventEmitter, HyperDelegate {

  private var hasListeners = false
  private var hyperServices: HyperServices?
  private var pendingProcessPayload: [String: Any]?
  private var watchdogToken: Int = 0

  override static func requiresMainQueueSetup() -> Bool {
    return true
  }

  override func supportedEvents() -> [String]! {
    return ["HyperPaymentEvent"]
  }

  override func startObserving() {
    hasListeners = true
  }

  override func stopObserving() {
    hasListeners = false
  }

  private func emitEvent(_ body: [String: Any]) {
    NSLog("HPBRIDGE Event: \(body)")
    if hasListeners {
      sendEvent(withName: "HyperPaymentEvent", body: body)
    }
  }

  @objc(openPaymentPage:)
  func openPaymentPage(_ data: NSString) {
    NSLog("HPBRIDGE openPaymentPage called")

    DispatchQueue.main.async { [weak self] in
      guard let self = self else { return }

      guard let jsonData = (data as String).data(using: .utf8),
            let payload = try? JSONSerialization.jsonObject(with: jsonData) as? [String: Any],
            !payload.isEmpty else {
        self.emitEvent(["error": "Invalid payload"])
        return
      }

      guard let rootVC = RCTPresentedViewController() ?? self.getTopViewController() else {
        self.emitEvent(["error": "No root view controller found"])
        return
      }

      self.emitEvent(["log": "VC=\(type(of: rootVC)), window=\(rootVC.view.window != nil); SDK v=\(HyperServices.hyperSDKVersion())"])

      let services = HyperServices()
      services.hyperDelegate = self
      self.hyperServices = services
      self.pendingProcessPayload = payload
      self.watchdogToken += 1
      let myToken = self.watchdogToken

      self.emitEvent(["log": "Calling initiate (new arch delegate wired)"])

      services.initiate(rootVC, payload: payload) { [weak self] response in
        guard let self = self else { return }
        let respDesc = response.map { "\($0)" } ?? "nil"
        self.emitEvent(["log": "initiate callback: \(respDesc.prefix(400))"])

        guard let response = response else { return }

        if let jsonData = try? JSONSerialization.data(withJSONObject: response),
           let jsonString = String(data: jsonData, encoding: .utf8) {
          self.emitEvent(["data": jsonString])
        }

        let event = (response["event"] as? String) ?? ""
        let innerPayload = (response["payload"] as? [String: Any]) ?? [:]
        let status = (innerPayload["status"] as? String) ?? ""

        if event == "initiate_result" {
          if status.caseInsensitiveCompare("SUCCESS") == .orderedSame {
            DispatchQueue.main.async { [weak self] in
              guard let self = self else { return }
              self.emitEvent(["log": "initiate SUCCESS; calling process"])
              if let processPayload = self.pendingProcessPayload {
                self.hyperServices?.process(processPayload)
              }
            }
          } else {
            self.emitEvent(["log": "initiate NON-SUCCESS status=\(status)"])
          }
        }
      }

      DispatchQueue.main.asyncAfter(deadline: .now() + 15.0) { [weak self] in
        guard let self = self, self.watchdogToken == myToken else { return }
        if self.pendingProcessPayload != nil {
          self.emitEvent(["log": "WATCHDOG: 15s elapsed"])
        }
      }
    }
  }

  // MARK: - HyperDelegate

  func merchantView(forViewType viewType: String) -> UIView? {
    emitEvent(["log": "merchantViewForViewType: \(viewType)"])
    return nil
  }

  func onWebViewReady(_ webView: WKWebView) {
    emitEvent(["log": "onWebViewReady; frame=\(webView.frame)"])
  }

  func didBackPressOnJuspaySafe() {
    emitEvent(["log": "didBackPressOnJuspaySafe"])
  }

  // MARK: - VC lookup fallback

  private func getTopViewController() -> UIViewController? {
    let windows: [UIWindow]
    if #available(iOS 13.0, *) {
      windows = UIApplication.shared.connectedScenes
        .compactMap { $0 as? UIWindowScene }
        .flatMap { $0.windows }
    } else {
      windows = UIApplication.shared.windows
    }
    guard let rootVC = (windows.first(where: { $0.isKeyWindow }) ?? windows.first)?.rootViewController else {
      return nil
    }
    return topMost(of: rootVC)
  }

  private func topMost(of viewController: UIViewController) -> UIViewController {
    if let presented = viewController.presentedViewController {
      return topMost(of: presented)
    }
    if let nav = viewController as? UINavigationController,
       let visible = nav.visibleViewController {
      return topMost(of: visible)
    }
    if let tab = viewController as? UITabBarController,
       let selected = tab.selectedViewController {
      return topMost(of: selected)
    }
    return viewController
  }

  @objc(addListener:)
  override func addListener(_ eventName: String!) {
    super.addListener(eventName)
  }

  @objc(removeListeners:)
  override func removeListeners(_ count: Double) {
    super.removeListeners(count)
  }
}
