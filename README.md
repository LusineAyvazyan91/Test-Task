# Issues Management App

A React Native application for managing issues with offline-first capabilities, built with Expo and TypeScript.

## 📱 Features

### Issues List Screen

- ✅ Fetch and display issues from REST endpoint
- ✅ Display issue details: title, status (open/closed), priority (low/medium/high), updatedAt
- ✅ Pull-to-refresh functionality
- ✅ Loading skeleton state
- ✅ Error state handling
- ✅ Empty state with retry option
- ✅ Client-side search by title
- ✅ Filter by status (open/closed/all)
- ✅ Issue summary with progress bar and statistics

### Issue Details Screen

- ✅ Full issue details display
- ✅ Change status (open/closed toggle)
- ✅ Change priority (segmented control)
- ✅ Optimistic UI updates (local state updates immediately)
- ✅ Sync status badge (Synchronized/Pending Sync/Offline Mode)
- ✅ Network status detection

### Offline-First Architecture

- ✅ AsyncStorage caching with 4-hour TTL
- ✅ Show cached data immediately on app launch
- ✅ Background sync from network
- ✅ Visual indicators for offline/pending sync states

### Networking

- ✅ RESTful API layer (GET /issues, GET /issues/:id, PATCH /issues/:id)
- ✅ Request cancellation support (AbortSignal)
- ✅ Retry logic with exponential backoff (2 retries, max 30s delay)
- ✅ Stale response handling via React Query

### Performance Optimizations

- ✅ FlatList with proper `keyExtractor`
- ✅ Memoization (`useMemo`, `useCallback`, `React.memo`)
- ✅ Optimized rendering (`removeClippedSubviews`, `maxToRenderPerBatch`)
- ✅ Efficient re-render prevention

### Accessibility

- ✅ Accessible labels for all buttons and interactive elements
- ✅ Proper `accessibilityRole` and `accessibilityState`
- ✅ Screen reader support

## 🛠 Tech Stack

- **Framework**: React Native with Expo (~54.0.31)
- **Language**: TypeScript (~5.9.2)
- **State Management**: TanStack Query (React Query) v5.90.16
- **Navigation**: React Navigation v7 (Native Stack)
- **Storage**: AsyncStorage for offline caching
- **Network**: NetInfo for network status detection
- **UI Components**: Custom components with SVG icons
- **Styling**: StyleSheet with custom color system

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- Expo CLI (optional, but recommended)
- iOS Simulator (for iOS) or Android Emulator (for Android)

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd task
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on specific platform**

   ```bash
   # iOS
   npm run ios

   # Android
   npm run android

   # Web
   npm run web
   ```

## 📁 Project Structure

```
task/
├── assets/
│   ├── fonts/              # Custom fonts (Outfit)
│   └── svgs/               # SVG icons
├── src/
│   ├── api/
│   │   └── issues.api.ts   # API layer (mock implementation)
│   ├── features/
│   │   └── issues/
│   │       ├── components/ # Issue-related components
│   │       │   ├── skeleton/ # Skeleton loading components
│   │       │   ├── BadgeStatus.tsx
│   │       │   ├── IssueCard.tsx
│   │       │   ├── IssueFilters.tsx
│   │       │   ├── IssueSummary.tsx
│   │       │   ├── SearchBar.tsx
│   │       │   └── SegmentControl.tsx
│   │       ├── hooks/      # Custom React hooks
│   │       │   ├── useIssue.ts      # Single issue hook
│   │       │   ├── useIssues.ts     # Issues list hook
│   │       │   ├── useNetworkStatus.ts
│   │       │   └── useUpdateIssues.ts
│   │       ├── screens/    # Screen components
│   │       │   ├── IssueDetailsScreen.tsx
│   │       │   └── IssuesListScreen.tsx
│   │       └── types.ts     # TypeScript types
│   ├── navigation/
│   │   └── AppNavigator.tsx # Navigation setup
│   ├── providers/
│   │   └── AppProviders.tsx # React Query provider
│   ├── storage/
│   │   └── issues.storage.ts # AsyncStorage utilities
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── SkeletonBlock.tsx
│   │   └── Text.tsx
│   ├── utils/
│   │   ├── colors.ts        # Color constants
│   │   └── issueUtils.ts    # Utility functions
│   └── App.tsx              # Root component
├── index.ts                 # Entry point
├── metro.config.js          # Metro bundler config
├── tsconfig.json            # TypeScript config
└── package.json
```

## 🏗 Architecture

### State Management

The app uses **TanStack Query (React Query)** for server state management:

- **`useIssues`**: Fetches and caches the list of issues with AsyncStorage integration
- **`useIssue`**: Fetches a single issue by ID with placeholder data from cache
- **`useUpdateIssue`**: Handles issue updates with optimistic UI

### Offline-First Strategy

1. **Cache on Mount**: Load cached data from AsyncStorage immediately
2. **Background Sync**: Fetch fresh data from network in background
3. **TTL Management**: Cache expires after 4 hours
4. **Visual Feedback**: Badge shows sync status (Synchronized/Pending Sync/Offline Mode)

### API Layer

The API layer (`src/api/issues.api.ts`) is currently a mock implementation. To connect to a real API:

1. Replace mock data with actual API endpoints
2. Update `IssuesAPI` methods to use `fetch` or `axios`
3. Ensure all methods support `AbortSignal` for cancellation

### Component Architecture

- **Feature-based structure**: Components organized by feature (issues)
- **Reusable UI components**: Shared components in `src/ui/`
- **Custom hooks**: Business logic separated into hooks
- **Type safety**: Full TypeScript coverage

## 🔧 Configuration

### Metro Bundler

Configured to handle SVG imports via `react-native-svg-transformer`:

```javascript
// metro.config.js
transformer: {
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
}
```

### TypeScript

Type definitions for SVG imports in `declarations.d.ts`:

```typescript
declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
```

## 📋 Requirements Checklist

| Requirement              | Status | Implementation                     |
| ------------------------ | ------ | ---------------------------------- |
| Issues List Screen       | ✅     | Complete with all features         |
| Issue Details Screen     | ✅     | Complete with optimistic UI        |
| Offline-first (4h cache) | ✅     | AsyncStorage with TTL              |
| Network layer            | ✅     | API layer with cancellation        |
| Retry logic              | ✅     | Exponential backoff                |
| React Query              | ✅     | Properly implemented               |
| Safe areas               | ✅     | SafeAreaView used                  |
| List performance         | ✅     | Optimized with memoization         |
| Accessibility            | ✅     | Labels on all interactive elements |

## 🎨 Design

The app follows a pixel-perfect design implementation matching the provided Figma specifications:

- Custom typography (Outfit font family)
- Consistent spacing and layout
- Custom color system
- SVG icons throughout
- Loading skeletons matching the design

## 🚀 Running the App

### Development Mode

```bash
npm start
```

Then:

- Press `i` for iOS Simulator
- Press `a` for Android Emulator
- Press `w` for Web
- Scan QR code with Expo Go app

### Production Build

```bash
# iOS
expo build:ios

# Android
expo build:android
```

## 🧪 Testing

The app is structured for easy testing:

- Hooks are pure functions (testable independently)
- Components are modular and isolated
- API layer can be easily mocked

## 📝 Notes

- The current API implementation is a mock. Replace `src/api/issues.api.ts` with real API endpoints.
- Cache TTL is set to 4 hours as per requirements. Adjust in `src/storage/issues.storage.ts` if needed.
- Retry logic uses exponential backoff (2 retries, max 30s delay). Configure in `src/providers/AppProviders.tsx`.

## 📄 License

This project is private and proprietary.

## 👤 Author

Built as a React Native Developer Test Task implementation.

---

**Built with ❤️ using React Native and Expo**
