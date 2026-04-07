#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(SpeechToTextModule, RCTEventEmitter)

RCT_EXTERN_METHOD(startListening:(NSString *)locale)
RCT_EXTERN_METHOD(stopListening)
RCT_EXTERN_METHOD(isAvailable:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
