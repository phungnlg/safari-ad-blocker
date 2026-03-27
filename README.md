# Ad Blocker - React Native/Expo

A cross-platform ad blocker app built with **React Native**, **Expo**, and **TypeScript**, adapted from a native iOS Safari Content Blocker.

## Overview

This is a React Native/Expo adaptation of a native iOS Safari Content Blocker app. While Safari Content Blocker APIs are iOS-only, this version provides equivalent functionality through a DNS-based blocking approach that works across platforms.

## Screenshots

| Safari Extension (iOS Native) |
|:-----------------------------:|
| <img src="screenshots/safari_extension.png" width="300"/> |

## Features

- **Filter Category Management**: Toggle blocking for Ads (25 rules), Trackers (15), Social Widgets (10), and Annoyances (10)
- **Whitelist Management**: Add/remove domains that bypass all blocking rules
- **Blocking Statistics**: Estimated blocked requests based on active rules and days of protection
- **DNS-Based Blocking**: Network-level ad blocking approach compatible with React Native
- **Onboarding Flow**: 3-step onboarding (Welcome, How It Works, Activate)
- **Dark Mode Support**: Automatic theme adaptation
- **Haptic Feedback**: Tactile feedback on key interactions
- **Persistent Settings**: All preferences stored locally via AsyncStorage

## Architecture

```
src/
  assets/filters/     # Bundled JSON filter rules (ads, trackers, social, annoyances)
  components/          # Reusable UI components
  constants/           # App constants, colors, filter category definitions
  services/
    FilterEngine.ts    # Rule assembly, domain extraction, URL matching
    StatsService.ts    # Estimated blocking statistics
  store/
    useStore.ts        # Zustand store (replaces @Observable + UserDefaults)
  types/               # TypeScript type definitions

app/                   # Expo Router file-based routing
  _layout.tsx          # Root layout with Stack navigator
  index.tsx            # Home screen (status, stats, category toggles)
  settings.tsx         # Settings screen (categories, whitelist, DNS, about)
  whitelist.tsx        # Whitelist domain management
  stats.tsx            # Blocking statistics
  onboarding/          # 3-step onboarding flow
    index.tsx          # Welcome screen
    how-it-works.tsx   # Feature explanation
    activate.tsx       # Setup guide
```

## Conversion Mapping

| iOS (Swift/SwiftUI) | React Native (TypeScript) |
|---------------------|--------------------------|
| `@Observable SettingsStore` | Zustand store with AsyncStorage persistence |
| `@Observable FilterEngine` | `FilterEngine` static service class |
| `@Observable StatsService` | `StatsService` static utility class |
| `FilterSourceProviding` protocol | Direct JSON imports from bundled assets |
| `UserDefaults` (App Groups) | `@react-native-async-storage/async-storage` |
| `SFContentBlockerManager` | DNS-based blocking configuration |
| SwiftUI `NavigationStack` | Expo Router `Stack` navigator |
| SwiftUI `@Environment` | Zustand `useStore` hook |
| `FilterCategory` enum | TypeScript union type + constants |
| `FilterRule` struct | TypeScript interface |
| `WhitelistEntry` struct | TypeScript interface |

## Filter Rules

All filter rules follow the Safari Content Blocker JSON format with trigger/action pairs:

| Category | Rules | Description |
|----------|-------|-------------|
| Ads | 25 | Ad networks (DoubleClick, Google Ads, Taboola, etc.) |
| Trackers | 15 | Analytics (Google Analytics, Facebook Pixel, Hotjar, etc.) |
| Social | 10 | Social widgets (Twitter embeds, Facebook plugins, etc.) |
| Annoyances | 10 | Cookie banners, newsletter popups, consent managers |

## DNS-Based Blocking Approach

Since Safari Content Blocker APIs are not available in React Native, this app uses a DNS-based blocking approach:

1. **Rule Assembly**: Filter rules are assembled based on enabled categories
2. **Domain Extraction**: Blocked domains are extracted from URL filter patterns
3. **DNS Configuration**: Domains can be fed to a DNS-based blocker (e.g., private DNS, local VPN)
4. **Whitelist**: Whitelisted domains are excluded from blocking

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator or Android Emulator (or Expo Go on a physical device)

### Install & Run

```bash
npm install
npx expo start
```

Press `i` for iOS simulator, `a` for Android emulator, or scan the QR code with Expo Go.

## Tech Stack

- **React Native** 0.83+ with **Expo** SDK 55
- **Expo Router** for file-based navigation
- **Zustand** for state management
- **AsyncStorage** for persistent settings
- **TypeScript** with strict mode
- **expo-haptics** for tactile feedback

## Original iOS Project

The original native iOS implementation uses:
- Swift 6 with SwiftUI
- Safari Content Blocker extension (`com.apple.Safari.content-blocker`)
- `@Observable` pattern (iOS 17+)
- App Groups for app-to-extension data sharing
- `SFContentBlockerManager` for extension reload
