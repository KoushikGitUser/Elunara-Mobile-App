import Foundation
import React
import HyperSDK

@objc(HyperPaymentBridge)
class HyperPaymentBridge: RCTEventEmitter {

  private var hasListeners = false
  private var hyperServices: HyperServices?

  override init() {
    super.init()
  }

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
    if hasListeners {
      sendEvent(withName: "HyperPaymentEvent", body: body)
    }
    // Also print for Xcode console
    print("[HyperPaymentBridge] Event: \(body)")
  }

  @objc(openPaymentPage:)
  func openPaymentPage(_ data: NSString) {
    print("[HyperPaymentBridge] openPaymentPage called")

    DispatchQueue.main.async { [weak self] in
      guard let self = self else { return }

      guard let jsonData = (data as String).data(using: .utf8),
            let payload = try? JSONSerialization.jsonObject(with: jsonData) as? [String: Any],
            !payload.isEmpty else {
        self.emitEvent(["error": "Invalid payload"])
        return
      }

      guard let rootVC = self.getTopViewController() else {
        self.emitEvent(["error": "No root view controller found"])
        return
      }

      self.emitEvent(["log": "VC found: \(type(of: rootVC)), creating HyperServices..."])

      // Create HyperServices instance
      if self.hyperServices == nil {
        self.hyperServices = HyperServices()
      }

      // Set up delegate (nil bridge is fine for openPaymentPage)
      self.emitEvent(["log": "Initiating with payload..."])

      // Use initiate first, then process
      self.hyperServices?.initiate(rootVC, payload: payload) { [weak self] response in
        self?.emitEvent(["log": "initiate callback: \(String(describing: response))"])

        if let response = response,
           let jsonData = try? JSONSerialization.data(withJSONObject: response),
           let jsonString = String(data: jsonData, encoding: .utf8) {
          self?.emitEvent(["data": jsonString])
        }

        // After initiate, call process
        DispatchQueue.main.async {
          self?.emitEvent(["log": "Calling process..."])
          self?.hyperServices?.process(payload)
        }
      }
    }
  }

  private func getTopViewController() -> UIViewController? {
    guard let windowScene = UIApplication.shared.connectedScenes
      .compactMap({ $0 as? UIWindowScene })
      .first,
          let rootVC = windowScene.windows.first(where: { $0.isKeyWindow })?.rootViewController else {
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
