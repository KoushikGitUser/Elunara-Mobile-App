# Elunara — New Member Onboarding

A condensed map of the codebase, architecture, and conventions so a new developer can ramp up quickly. Read top to bottom; each section is short.

---

## 1. What the app is

- **Elunara**: an AI learning companion for students. Mobile app, React Native (Expo, prebuild workflow).
- Users chat with multiple LLMs (GPT, Claude, Gemini, etc.), organise conversations into **Learning Labs** (workspaces), save **Notes**, attach files/photos, and customise response style/language/citation format.
- Targets India primarily; supports multilingual content.

---

## 2. Tech stack

- **Framework**: React Native via **Expo SDK 54**, **prebuild** workflow (ios/ and android/ folders are committed; not pure managed Expo).
- **Language**: JavaScript (no TypeScript).
- **State**: Redux + Redux Toolkit (`@reduxjs/toolkit`).
- **Navigation**: React Navigation v7 (native-stack).
- **HTTP**: axios via a shared instance with interceptors.
- **Local storage**: `@react-native-async-storage/async-storage` + `expo-secure-store` for tokens.
- **Native modules**: `expo-video` (splash video), `hyper-sdk-react` (Juspay payments), `@react-native-community/blur`, native Speech-to-Text bridge (Swift + Kotlin).
- **Fonts**: Mukta family.
- **Bundle ID**: `com.elunara.gradlnk` (both iOS + Android).
- **Min versions**: iOS 12+, Android API 24 (Android 7.0+). Target API 35.

---

## 3. Top-level folder map

```
Elunara-Mobile-App/
├── App.js                # Entry: wraps everything in Redux Provider + NetworkProvider; also wires Juspay listener
├── index.js              # registerRootComponent
├── app.json              # Expo config (bundle id, permission strings, icons, etc.)
├── ios/                  # Native iOS project (Xcode, pods)
├── android/              # Native Android project (Gradle)
├── assets/               # Fonts, images, SVG icons
└── src/
    ├── navigation/       # AppNavigator (single native-stack)
    ├── providers/        # NetworkProvider (no-internet handling)
    ├── screens/          # Top-level screens grouped by feature
    ├── components/       # Reusable components grouped by feature
    ├── redux/            # State management (slices, handlers, store, helper)
    ├── services/         # Toast, navigation ref, etc.
    ├── data/             # Static seed data, mock content
    ├── themes/           # appColors
    ├── utils/            # responsive scaling, secure store helpers
    └── assets/           # Local images (some duplication with root assets/)
```

---

## 4. App entry flow

- **`App.js`** sets up: Redux `<Provider>` → `<NetworkProvider>` (wraps the no-internet screen) → `<AppNavigator>` + global `<Toaster>` + a `HyperPaymentListeners` component that initialises Juspay HyperSDK and listens for native payment events.
- **`AppNavigator.js`** uses React Navigation native-stack. Initial route: `Splash`. All screens registered here (full list below).
- **Splash screen** (`screens/SplashScreen/SplashScreen.js`) plays a video, then decides:
  - No token → `welcome`
  - Valid token → fetches user + wallet → `chat`
  - Invalid token → axios interceptor catches 401 → resets to `signin`

---

## 5. Navigation routes

All in `src/navigation/AppNavigator.js`. Key routes:

| Route | Screen | Purpose |
|---|---|---|
| `Splash` | SplashScreen | Initial video + auth check |
| `welcome` | WelcomeScreen | Marketing landing for logged-out users |
| `signin` / `signup` | Auth | Login + registration |
| `changepass` | ChangePassword | Reset password flow |
| `verify-email` | VerifyMailOtpPopup-driven | Email OTP verification |
| `auth-using-provider` | OAuth redirect handler | Social sign-in |
| `recover-account` | Recovery | Account recovery |
| `chat` | ChatScreen | **Main hub** — chats, sidebar, AI input |
| `allchats` | AllChatsPage | Full chat list, pinned/archived |
| `rooms` / `roomDetails` / `allRooms` | Rooms screens | Learning Labs (workspaces) |
| `notes` | Notes | Per-chat saved notes |
| `profile` | ProfileAndSettings | User profile + Settings hub |
| `settingsInnerPages` | SettingsPages router | All sub-settings (general, personalisation, help, billing, T&C, etc.) |
| `analyticsComplete` | Analytics | Learning analytics dashboard |
| `paymentStatus` | PaymentPage | Result screen after Juspay payment |
| `universalSearch` | Search | Global search across chats/labs |

---

## 6. Redux architecture (most important section)

- Store at **`src/redux/store/Store.js`** with four reducers mounted: `Auth`, `Toggle`, `Global`, `API`.
- Two API patterns in parallel — **understand both**.

### 6.1 Slice files (`src/redux/slices/`)

| Slice | Reducer mount | Purpose |
|---|---|---|
| `authSlice.js` | `Auth` | Legacy thunk-per-endpoint pattern for auth-only APIs (login, signup, OTP, refresh, email change). Each endpoint is its own `createAsyncThunk` with its own extraReducers. |
| `toggleSlice.js` | `Toggle` | UI toggle states (popups open/closed), wallet computed states, chat customisation selections. Pure reducers, no API thunks. |
| `globalDataSlice.js` | `Global` | App-wide non-API state: current chat messages, selected files, prompts, user signup mail, guided tour steps. Pure reducers. |
| `apiCommonSlice.js` | `API` | **Modern shared pattern.** One thunk (`commonFunctionForAPICalls`) handles ALL non-auth API calls. Per-feature state inside (chatsStates, settingsStates, roomsStates, walletStates, paymentStates, etc.). |

### 6.2 The common-thunk pattern (used for everything except auth)

A new dev MUST learn this. Flow:

1. **Component dispatches** `commonFunctionForAPICalls({ method, url, name, data?, params? })`.
2. The thunk runs axios → returns `{ data, status }` or rejects with `{ message, status, data }`.
3. `apiCommonSlice`'s extraReducers route the action by **`action.meta.arg.name`** to the right handler.
4. Handlers live in **`src/redux/apiExtraReducerHandlers/`** organised by feature: `chatsHandlers`, `roomsHandlers`, `settingsHandlers`, `notesHandlers`, `attachmentsHandlers`, `searchHandlers`, `walletHandlers`.
5. Each handler is `{ pending, fulfilled, rejected }` — mutates state for that specific API call.
6. Handlers are **registered** in `src/redux/handlersFunctionsStore.js` — name → handler mapping per feature.
7. Routing helpers: `src/redux/addCases/{pending,fulfilled,rejected}.js` look up the handler by name and call its corresponding lifecycle function.

**Initial state** for each feature lives in `src/redux/allInitialStates/*States.js` and is combined in `allInitialStates.js`. Read state via `useSelector((s) => s.API.<featureStates>)`.

### 6.3 Adding a new API (the recipe)

1. Add any new state fields to the relevant `xxxStates.js` initial state.
2. Add a `handleYourApi = { pending, fulfilled, rejected }` to the right handler file.
3. Register it in `handlersFunctionsStore.js` under the matching feature category. **Name must be unique across all categories.**
4. In the component, `dispatch(commonFunctionForAPICalls({ method, url, name: "yourHandlerKey", data?, params? }))`.
5. Read state with `useSelector` — no extra wiring needed.

---

## 7. API layer (axios + interceptors) — `src/redux/helper.js`

- **`baseURL`** = `https://api.elunara.ai/api/v1`.
- **Request interceptor**: auto-attaches `Authorization: Bearer <accessToken>` from secure store.
- **Response interceptor**: on 401:
  1. Tries refresh via `/auth/refresh-token` (using `refreshToken` from secure store).
  2. On success, stores new tokens and retries the original request.
  3. On failure, clears tokens, calls `reset("signin")` (via `services/navigationService.js`), shows toast.
- Login/refresh endpoints are skipped to avoid loops.

**Tokens** are kept in `expo-secure-store` (encrypted on iOS/Android) via `src/utils/Secure/secureStore.js`.

---

## 8. Auth flow

- **Sign up** (`screens/auth/SignUp`) → email OTP (`components/SignUp/VerifyMailOtpPopup.js`) → backend creates user → tokens stored → navigate to `chat`.
- **Sign in** (`screens/auth/SignIn`) → password or social → tokens stored → navigate to `chat`.
- **Change password / Recover** → `changepass` route.
- **Email verification resend** → uses common-thunk API `resendVerificationOTPMail`.
- **Mobile number verification** is a separate post-signup flow (`components/ChatScreen/MobileVerificationPopup.js`) — required within 10 days post-signup.

---

## 9. Main features (where the code lives)

### 9.1 Chat — the heart of the app

- **`screens/ChatScreen/ChatScreen.js`** is the central hub (large file, ~1500+ lines).
- **`components/ChatScreen/ChatInputMain.js`** — the input box: text, voice (mic → speech-to-text), file attachments, send.
- **`components/ChatScreen/ChatHeader.js`** — menu icon, new chat button, model/style indicators.
- **`components/ChatScreen/ChatHistorySidebar/`** — slide-out sidebar with recent chats, pinned chats/labs, all-labs entry.
- **`components/ChatScreen/ChatMiddleSection/`** — message rendering, curriculum picker, response comparison, regeneration.
- **`components/ChatScreen/Messages/`** — individual user/AI message bubbles + action menus (copy, share, save to notes, change response, regenerate).
- Customisation: selected LLM, response style, language, citation format — all in `chatCustomisationStates`.

### 9.2 Learning Labs (Rooms)

- **`screens/Rooms/`** — list, create, edit, view.
- A "Lab" groups chats + sources (PDFs/docs) into a workspace.
- Code uses the word **"rooms"** internally; UI shows "Learning Labs".

### 9.3 Notes

- **`screens/Notes/`** — per-chat saved Q/A pairs. Auto-save on edit.

### 9.4 Profile & Settings

- **`screens/ProfileAndSettings/`** — wraps a router that renders one of many sub-pages (general settings, personalisation, help center, payment & billing, T&C, privacy policy, academic links, analytics, edit profile).
- Sub-pages are in **`screens/SettingsPages/`**.

### 9.5 Wallet & Payments

- Users recharge a **wallet** (currently via **Juspay HyperSDK**, external payment) and the balance is spent on AI usage.
- **`screens/SettingsPages/MakePaymentPage.js`** — recharge UI.
- **`screens/SettingsPages/PaymentBilling.js`** — balance, transactions.
- **App-level Juspay listener** in `App.js` handles the native payment result event.
- **iOS regulatory note**: Apple requires In-App Purchase for in-app digital credits. Juspay is currently used on iOS, which Apple has flagged. Future iOS builds must either (a) use Apple IAP, or (b) hide paid features. Android is fine with Juspay due to the 2023 CCI antitrust ruling.

### 9.6 Help Center & Guided Tour

- **`screens/SettingsPages/HelpCenter.js`** + **`components/ProfileAndSettings/HelpCenterCompo/`** — FAQ + 3 walkthrough demos: Navigation, Chat Functions, Learning Labs.
- Demos render via **`DemoPreviewScreen.js`** (a self-contained spotlight-tooltip system — large file, custom positioning logic per device size).

### 9.7 Search

- **`screens/UniversalSearch/`** — global search across chats and rooms.

### 9.8 No internet handling

- **`providers/NetworkProvider.js`** wraps the app, shows **`screens/NoInternetScreen`** when offline.

---

## 10. Native integrations

| Module | Purpose | Files |
|---|---|---|
| **Juspay HyperSDK** | UPI / card payments on Android (and iOS for now) | `App.js`, `MakePaymentPage.js`, native bridges in `ios/Elunara/HyperPaymentBridge.swift|.m` |
| **Speech-to-Text** | Microphone → text in chat input | Native: `android/app/.../SpeechToTextModule.kt`, `ios/Elunara/SpeechToTextModule.swift|.m`. JS: imported via `NativeModules.SpeechToTextModule` |
| **expo-video** | Splash video playback | Splash screen only |
| **@react-native-community/blur** | Blurred backgrounds on popups | Used widely; **known to cause Android release crashes occasionally** — keep in mind |
| **expo-secure-store** | Token storage | `utils/Secure/secureStore.js` |

---

## 11. Theming & responsive

- **`themes/appColors.js`** — colour constants (use these, not hardcoded hex).
- **`utils/responsive.js`** — `scale`, `verticalScale`, `moderateScale`, `scaleFont`, `isTablet` (≥ 768px width). Use `scaleFont(n)` for font sizes everywhere.
- **Important convention**: when using `scaleFont`, set `lineHeight` proportionally (`scaleFont(fontSize) * 1.4-1.6`) — fixed lineHeight breaks layout on iPads.
- **iPad-only tweaks**: many components have `const IS_BIG_IPAD = SCREEN_WIDTH >= 768` and conditional styles.

---

## 12. Build & deployment

### iOS
- Bundle ID: `com.elunara.gradlnk`
- Build: archive via `xcodebuild` in `ios/`, requires `JAVA_HOME` set to Android Studio's JBR for some scripts.
- Distribution: Xcode → Organizer → App Store Connect upload.
- Currently **iPhone-only** (Targeted Device Family = 1). iPad support disabled.
- TestFlight + App Store: managed in App Store Connect under the developer team.

### Android
- Package: `com.elunara.gradlnk`
- Release signing: `android/app/elunara-upload-key.keystore` (gitignored). Credentials in `android/keystore.properties` (gitignored).
- Build AAB: `cd android && JAVA_HOME="..." ./gradlew bundleRelease` → `android/app/build/outputs/bundle/release/app-release.aab`
- Build APK: `assembleRelease` (signed) or `assembleDebug` (for testing on devices).
- Distribution: Google Play Console.

### Version bumping
- iOS: `Info.plist` `CFBundleVersion` + `app.json` `ios.buildNumber`
- Android: `android/app/build.gradle` `versionCode` + `versionName`

---

## 13. Conventions / things to watch out for

- **Naming registry keys**: when adding a common-thunk API name, look at neighbouring registry entries — some use camelCase (`getAllChatsAvailable`), others use kebab-case (`get-rooms`). Match the file's existing pattern. Names must be globally unique.
- **Modal stacking on iOS**: you CANNOT show two `<Modal>` components on top of each other on iOS. If you need to chain modals (close one → open another), use the parent modal's `onDismiss` callback. See `DemoPopup.js` for the pattern.
- **TextInput controlled by Redux**: avoid dispatching on every keystroke — use local state + debounced dispatch (see `ChatInputMain.js` for the established pattern). Otherwise typing lags on slower devices.
- **BlurView on Android release builds**: occasionally crashes on certain devices. If you see flaky release crashes, suspect BlurView first.
- **Splash screen race conditions**: the splash plays a video; any API call/navigation must wait for `videoFinished` to avoid mid-play crashes. See `SplashScreen.js`.
- **Permission popups on iOS**: text in `Info.plist` `NSXxxUsageDescription` keys is what users see in the system popup. Apple rejects vague descriptions — be specific + give an example + add a privacy reassurance.
- **iOS regulatory**: digital purchases on iOS must use Apple IAP (not Juspay). See section 9.5.
- **Account deletion**: required by Apple — currently NOT implemented; on the to-do.

---

## 14. Where to start (a suggested first week)

1. **Day 1**: clone, run on iOS simulator + Android device. Read `App.js`, `AppNavigator.js`, `Store.js`, `helper.js`.
2. **Day 2**: trace one full feature end-to-end. Pick `Get all rooms`: dispatch in `SidebarMiddle.js` → `commonFunctionForAPICalls` → handler in `roomsHandlers.js` → state in `roomsStates.js` → consumed in component. Do the same for one auth flow.
3. **Day 3**: read `ChatScreen.js` top to bottom (long, but it's the hub).
4. **Day 4**: look at `ChatInputMain.js` + the speech-to-text bridge + the file attachment flow.
5. **Day 5**: payments — read `MakePaymentPage.js`, the Juspay listener in `App.js`, and `walletHandlers.js`.
6. **Ongoing**: when stuck, search the codebase — patterns repeat (e.g., popups, list rendering, accordions, action menus).

---

## 15. Backend & APIs

- Backend lives separately (not in this repo); REST API on `api.elunara.ai/api/v1`.
- All requests go through axios; responses are typically `{ data: { ... } }` (one level of unwrapping inside handlers: `action?.payload?.data?.data`).
- Auth uses Bearer tokens (access + refresh).

---

## 16. Owners & support

- **iOS App Store / TestFlight**: managed via the developer's Apple Developer account.
- **Google Play Console**: managed via the developer's Google Play account.
- **Juspay merchant**: HDFC master tenant (`clientId=hdfcmaster` in `android/gradle.properties`).
- For any backend question / API change, talk to the backend team — not handled in this repo.

---

*End of doc. Ask questions early — the codebase has a lot of patterns that repeat; once you grok 2-3 of them the rest reads itself.*
