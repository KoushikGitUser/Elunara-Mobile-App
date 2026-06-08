# Response to Apple App Review — Guideline 2.1(b)

**App Name:** Elunara
**Bundle ID:** com.elunara.gradlnk
**Submission:** 1.0.0 (build 2)
**Guideline referenced:** 2.1(b) — Information Needed

---

## About Elunara (context)

Elunara is an AI-powered learning companion designed primarily for students and lifelong learners. The app lets users chat with multiple AI models (GPT, Claude, Gemini, and others), organise their conversations into focused workspaces called **Learning Labs**, attach files or images to questions, save important answers as **notes**, and customise the AI's response style, language, and citation format.

All AI features are consumed **inside the app**. There is no separate web product or external service where the same features can be purchased. The only monetised resource in the app is a **prepaid wallet**, which holds a balance that is consumed each time the user invokes an AI feature (sending a prompt, regenerating a response, attaching a file for analysis, etc.).

---
 
## Answers to the 5 questions

### Q1 — Who are the users that will use the paid features in the app?

The paid features are intended for **students, learners, and education-focused users** who want to use Elunara beyond the free promotional period.

Specifically:
- **Free trial users**: Every new account receives a **7-day promotional trial** with full access to all AI features at no cost.
- **Paying users (after the trial)**: Once the 7-day trial ends, the user must activate their wallet to continue using the AI features. From that point onwards, AI usage is metered against the wallet balance.

There are no separate user tiers or subscription levels — the paid functionality is the same set of AI features that the trial offers, just continued beyond the 7-day promotional window.

---

### Q2 — Where can users purchase the features that can be accessed in the app?

Users purchase by **adding balance to their in-app wallet**, exclusively from inside the iOS app. There is **no external website, no other store, no other purchase path**.

The current purchase flow on iOS is as follows:

1. User opens the app → goes to **Wallet / Recharge** (in the Profile & Settings section).
2. User chooses one of the preset amounts — **₹99, ₹499, ₹999, or ₹9,999** — or enters a custom amount.
3. The user taps **Recharge**, which opens an embedded third-party payment gateway (**Juspay HyperSDK**) inside the app.
4. Juspay presents UPI, card, net-banking, and wallet payment options.
5. Once payment succeeds, our backend credits the user's wallet, and the user can immediately resume AI usage.

The very first recharge after the trial period is a **mandatory ₹999 "wallet activation" recharge**. Subsequent recharges have a minimum of ₹99 and a maximum of ₹9,999 per transaction.

We acknowledge that this current flow uses an **external payment gateway (Juspay) for digital in-app content**, which is the reason we believe Apple has surfaced Guideline 2.1(b) / 3.1.1.

---

### Q3 — What specific types of previously purchased features can a user access in the app?

A user can access only **one** previously purchased thing: their **wallet balance**.

Specifically:
- After a successful recharge, the recharged amount is added to the user's wallet on our backend.
- This balance is consumed gradually as the user invokes paid AI features.
- The balance has **no expiry** ("usage-based balance — no expiry").
- The balance is **tied to the user's account**, not to any specific device, and is accessible from any device after the user signs in.

There are **no separate one-time purchases, no consumable items besides wallet credits, no level unlocks, no premium content libraries, and no auto-renewing or non-renewing subscriptions**. The wallet balance is the only purchasable digital good in the app.

---

### Q4 — What paid content, subscriptions, or features are unlocked within the app that do not use In-App Purchase?

**All paid functionality in the iOS app currently does not use Apple's In-App Purchase.**

Concretely, the following are unlocked / paid for **without IAP**:

1. **Wallet activation** — the mandatory ₹999 first recharge required to continue using AI features beyond the 7-day trial.
2. **Subsequent wallet top-ups** — ₹99 to ₹9,999 per transaction, used to maintain or grow the user's balance.
3. **Continued AI usage** — chat prompts, response regeneration, file analysis, and all other AI-powered features that draw against the wallet balance.

All three of the above are currently paid for via the **Juspay HyperSDK** payment gateway inside the iOS app, **not via Apple's In-App Purchase system**.

We understand that, per Guideline 3.1.1, digital content and services consumed inside the app on iOS must be sold through Apple's In-App Purchase. We would like to confirm Apple's specific direction on this so we can implement the correct compliance approach for the iOS build (we are prepared to integrate Apple In-App Purchase if that is required).

---

### Q5 — Do users have to pay a fee to create an account?

**No.** Account creation is **free**.

- Users sign up using email (with OTP verification) or via a supported social provider.
- After sign-up, the user is automatically placed on a **7-day free promotional trial** with full access to AI features at zero cost.
- No payment, no credit card, no recharge is required to create an account or to begin using the app.

The only point at which any payment is involved is **after** the 7-day trial period ends, when the user must activate the wallet to continue using AI features.

---

## Closing note

We have provided the above information as accurately and transparently as possible.

We acknowledge that our current iOS build uses an external payment processor (Juspay HyperSDK) for in-app digital content, and we understand that Guideline 3.1.1 requires the use of Apple In-App Purchase for such purchases on iOS.

**We respectfully request Apple's explicit direction on how to proceed.** If Apple's position is that the wallet recharge and AI-usage credits must be moved to In-App Purchase on iOS, we will plan and implement the integration accordingly and submit a revised build for review. We have not yet implemented this change in case Apple's review identifies the feature as exempt or wishes to confirm the correct categorisation first.

We appreciate the review team's time and look forward to Apple's guidance on the appropriate next step.

Thank you,
The Elunara Team
