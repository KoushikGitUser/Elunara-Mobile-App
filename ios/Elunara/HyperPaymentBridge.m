#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(HyperPaymentBridge, RCTEventEmitter)

RCT_EXTERN_METHOD(openPaymentPage:(NSString *)data)

@end
