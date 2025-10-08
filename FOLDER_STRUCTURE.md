# Elunara Mobile App - Folder Structure Documentation

## Overview
This document explains the purpose and usage of each folder in the project structure, following React Native and Redux industry best practices.

---

## 📁 `src/` - Source Root
The main source directory containing all application code.

---

## 📁 `src/api/`
**Purpose:** Centralized API communication layer

**What goes here:**
- Axios or Fetch API client configuration
- Base API instance with interceptors
- API endpoint definitions organized by feature
- Request/response interceptors for authentication tokens
- Error handling for network requests

**Example files:**
```
api/
├── client.js          # Axios instance configuration
├── authApi.js         # Authentication endpoints
├── userApi.js         # User-related endpoints
├── productApi.js      # Product endpoints
└── interceptors.js    # Request/response interceptors
```

**Why separate from services?**
- Clear separation between HTTP communication and business logic
- Easy to mock for testing
- Single point for API configuration changes
- Better error handling and retry logic

---

## 📁 `src/assets/`
**Purpose:** Static resources used throughout the app

### `src/assets/fonts/`
**What goes here:**
- Custom font files (.ttf, .otf)
- Font family definitions

**Example:**
```
fonts/
├── Roboto-Regular.ttf
├── Roboto-Bold.ttf
└── OpenSans-Regular.ttf
```

### `src/assets/icons/`
**What goes here:**
- SVG icon files
- PNG/JPG icon files
- Icon sets for tab bars, buttons, etc.

**Example:**
```
icons/
├── home.svg
├── profile.svg
├── search.svg
└── cart.svg
```

### `src/assets/images/`
**What goes here:**
- Static images (logos, backgrounds, placeholders)
- Splash screens
- Onboarding images

**Example:**
```
images/
├── logo.png
├── splash-background.png
├── placeholder-avatar.png
└── empty-state.png
```

**Why organize assets this way?**
- Easy to locate specific asset types
- Better for performance optimization
- Clear import paths
- Easier asset management and cleanup

---

## 📁 `src/components/`
**Purpose:** Reusable UI components used across multiple screens

**What goes here:**
- Button components
- Input fields
- Cards
- Headers
- Modals
- List items
- Loading indicators
- Any component used in 2+ places

**Organization pattern:**
```
components/
├── Button/
│   ├── Button.js
│   ├── Button.styles.js
│   └── index.js
├── Input/
│   ├── Input.js
│   ├── Input.styles.js
│   └── index.js
├── Card/
│   ├── Card.js
│   └── index.js
└── index.js           # Export all components
```

**Best practices:**
- Each component in its own folder
- Include styles with the component
- Keep components small and focused
- Make them reusable and configurable via props
- Export from index.js for clean imports

**Why this matters:**
- DRY principle (Don't Repeat Yourself)
- Consistent UI across the app
- Easier maintenance and updates
- Better testing capabilities

---

## 📁 `src/config/`
**Purpose:** Application-wide configuration settings

**What goes here:**
- Environment-specific configurations
- Feature flags
- App constants that change per environment
- API base URLs
- Third-party service keys
- App settings

**Example files:**
```
config/
├── index.js           # Main config export
├── development.js     # Dev environment config
├── production.js      # Production config
└── staging.js         # Staging config
```

**Example content:**
```javascript
// config/index.js
export const config = {
  API_BASE_URL: __DEV__ ? 'http://localhost:3000' : 'https://api.elunara.com',
  GOOGLE_MAPS_API_KEY: 'your-key-here',
  ENABLE_ANALYTICS: !__DEV__,
  APP_VERSION: '1.0.0',
  TIMEOUT: 30000,
};
```

**Why separate config?**
- Easy environment switching
- Single source of truth for settings
- Prevents hardcoded values scattered in code
- Easier to manage different environments

---

## 📁 `src/constants/`
**Purpose:** Static values that never change during runtime

**What goes here:**
- Action types (if using traditional Redux)
- Screen names for navigation
- Fixed values (e.g., max file size, pagination limits)
- Enum-like values
- Regular expressions
- Status codes

**Example files:**
```
constants/
├── actionTypes.js     # Redux action types
├── screens.js         # Screen name constants
├── statusCodes.js     # HTTP status codes
├── regex.js           # Common regex patterns
└── index.js           # Export all constants
```

**Example content:**
```javascript
// constants/screens.js
export const SCREENS = {
  HOME: 'Home',
  PROFILE: 'Profile',
  LOGIN: 'Login',
  PRODUCT_DETAIL: 'ProductDetail',
};

// constants/app.js
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
};

export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png'],
};
```

**Why use constants?**
- Prevents typos and magic strings
- Easy refactoring (change in one place)
- Better IDE autocomplete
- Self-documenting code

---

## 📁 `src/hooks/`
**Purpose:** Custom React hooks for reusable logic

**What goes here:**
- Custom hooks following React's "use" naming convention
- Reusable stateful logic
- Side effects that are used in multiple components
- Business logic extraction from components

**Example files:**
```
hooks/
├── useAuth.js         # Authentication state/logic
├── useFetch.js        # Data fetching hook
├── useDebounce.js     # Debounce functionality
├── useForm.js         # Form handling
├── useKeyboard.js     # Keyboard visibility
└── index.js           # Export all hooks
```

**Example hook:**
```javascript
// hooks/useDebounce.js
import { useState, useEffect } from 'react';

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
```

**Why use custom hooks?**
- Reuse stateful logic across components
- Keep components clean and focused
- Easier testing of business logic
- Better separation of concerns

---

## 📁 `src/models/`
**Purpose:** Data structure definitions and type definitions

**What goes here:**
- TypeScript interfaces (if using TypeScript)
- PropTypes definitions
- Data shape validators
- Entity models
- DTO (Data Transfer Object) definitions

**Example files:**
```
models/
├── User.js
├── Product.js
├── Order.js
└── index.js
```

**Example content:**
```javascript
// models/User.js
import PropTypes from 'prop-types';

export const UserModel = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  role: PropTypes.oneOf(['user', 'admin']),
};

// If using TypeScript:
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
}
```

**Why define models?**
- Type safety and validation
- Clear data structure documentation
- Easier refactoring
- Better IDE support
- Consistent data handling

---

## 📁 `src/navigation/`
**Purpose:** App navigation configuration and structure

**What goes here:**
- React Navigation setup
- Stack navigators
- Tab navigators
- Drawer navigators
- Navigation helpers
- Deep linking configuration

**Example files:**
```
navigation/
├── AppNavigator.js       # Root navigator
├── AuthNavigator.js      # Auth flow navigation
├── MainNavigator.js      # Main app navigation
├── TabNavigator.js       # Bottom tabs
└── navigationService.js  # Navigation helpers
```

**Example structure:**
```javascript
// navigation/AppNavigator.js
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

export default function AppNavigator() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
```

**Why separate navigation?**
- Clear app flow structure
- Centralized routing logic
- Easier to modify navigation hierarchy
- Better deep linking management

---

## 📁 `src/redux/` - Redux State Management
**Purpose:** Complete Redux setup for global state management

### `src/redux/store/`
**What goes here:**
- Redux store configuration
- Store creation and setup
- DevTools integration
- Middleware application

**Example:**
```javascript
// redux/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers';
import customMiddleware from '../middleware';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customMiddleware),
  devTools: __DEV__,
});
```

### `src/redux/slices/`
**What goes here:** (Redux Toolkit approach - Modern & Recommended)
- Redux Toolkit slices
- Combined actions and reducers
- State logic for specific features

**Example:**
```javascript
// redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
```

### `src/redux/actions/`
**What goes here:** (Traditional Redux approach)
- Action creator functions
- Async action creators (with Redux Thunk)
- Action type definitions

**Example:**
```javascript
// redux/actions/userActions.js
export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export const fetchUser = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_USER_REQUEST });

  try {
    const user = await userApi.getUser(userId);
    dispatch({ type: FETCH_USER_SUCCESS, payload: user });
  } catch (error) {
    dispatch({ type: FETCH_USER_FAILURE, payload: error.message });
  }
};
```

### `src/redux/reducers/`
**What goes here:** (Traditional Redux approach)
- Pure reducer functions
- State update logic
- Root reducer combining all reducers

**Example:**
```javascript
// redux/reducers/userReducer.js
import { FETCH_USER_SUCCESS } from '../actions/userActions';

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return { ...state, currentUser: action.payload, loading: false };
    default:
      return state;
  }
}

// redux/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';

export default combineReducers({
  auth: authReducer,
  user: userReducer,
});
```

### `src/redux/middleware/`
**What goes here:**
- Custom Redux middleware
- Logging middleware
- Analytics middleware
- API middleware
- Error tracking middleware

**Example:**
```javascript
// redux/middleware/logger.js
const loggerMiddleware = (store) => (next) => (action) => {
  console.log('Dispatching:', action);
  const result = next(action);
  console.log('Next State:', store.getState());
  return result;
};

export default loggerMiddleware;
```

**Why both slices and actions/reducers folders?**
- **Slices:** Modern Redux Toolkit approach (less boilerplate, easier)
- **Actions/Reducers:** Traditional approach (more explicit, some teams prefer it)
- You can use either approach or mix both
- Redux Toolkit slices are recommended for new code

---

## 📁 `src/screens/`
**Purpose:** Individual screen/page components of the app

**What goes here:**
- Screen-level components
- Page containers
- Route components
- Screen-specific logic and state

**Organization pattern:**
```
screens/
├── HomeScreen/
│   ├── HomeScreen.js
│   ├── HomeScreen.styles.js
│   ├── components/          # Screen-specific components
│   │   └── FeaturedCard.js
│   └── index.js
├── ProfileScreen/
│   ├── ProfileScreen.js
│   └── index.js
├── LoginScreen/
└── index.js
```

**Example:**
```javascript
// screens/HomeScreen/HomeScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../../components';

export default function HomeScreen({ navigation }) {
  const user = useSelector(state => state.auth.user);

  return (
    <View>
      <Text>Welcome, {user.name}!</Text>
      <Button onPress={() => navigation.navigate('Profile')}>
        Go to Profile
      </Button>
    </View>
  );
}
```

**Why separate screens from components?**
- Screens are route-specific and not reusable
- Better organization and file discovery
- Clear distinction between pages and UI components
- Easier navigation management

---

## 📁 `src/services/`
**Purpose:** Business logic and application services

**What goes here:**
- Business logic layer
- Data transformation logic
- Third-party service integrations
- Storage services (AsyncStorage, SecureStore)
- Authentication service
- Analytics service
- Push notification service

**Example files:**
```
services/
├── authService.js         # Authentication logic
├── storageService.js      # Local storage operations
├── analyticsService.js    # Analytics tracking
├── notificationService.js # Push notifications
├── locationService.js     # Geolocation
└── index.js
```

**Example service:**
```javascript
// services/authService.js
import { authApi } from '../api/authApi';
import { storageService } from './storageService';

class AuthService {
  async login(email, password) {
    const response = await authApi.login(email, password);
    await storageService.saveToken(response.token);
    return response;
  }

  async logout() {
    await storageService.removeToken();
    await authApi.logout();
  }

  async refreshToken() {
    const token = await storageService.getToken();
    return authApi.refreshToken(token);
  }
}

export default new AuthService();
```

**Difference between services and api:**
- **API folder:** HTTP requests and responses
- **Services folder:** Business logic, data processing, orchestration
- Services USE the API, but add business rules and logic

**Why use services?**
- Separation of concerns
- Reusable business logic
- Easier testing (mock services instead of API calls)
- Single responsibility principle

---

## 📁 `src/styles/`
**Purpose:** Global styling and shared style definitions

**What goes here:**
- Global style definitions
- Common style mixins
- Shared dimensions and spacing
- Typography definitions
- Shadow styles
- Layout utilities

**Example files:**
```
styles/
├── colors.js          # Color palette
├── typography.js      # Font sizes, weights
├── spacing.js         # Margins, paddings
├── shadows.js         # Shadow definitions
├── mixins.js          # Reusable style objects
└── index.js
```

**Example content:**
```javascript
// styles/colors.js
export const colors = {
  primary: '#6200EE',
  secondary: '#03DAC6',
  background: '#FFFFFF',
  surface: '#FFFFFF',
  error: '#B00020',
  text: '#000000',
  textSecondary: '#666666',
};

// styles/typography.js
export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
};

// styles/spacing.js
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};
```

**Why separate styles?**
- Consistent design system
- Easy global style changes
- Better maintainability
- Reusable style definitions
- Design tokens approach

---

## 📁 `src/theme/`
**Purpose:** Theme configuration and theming system

**What goes here:**
- Light/Dark theme definitions
- Theme switching logic
- Styled components theme provider setup
- Theme-aware style utilities

**Example files:**
```
theme/
├── lightTheme.js
├── darkTheme.js
├── ThemeProvider.js
└── index.js
```

**Example content:**
```javascript
// theme/lightTheme.js
import { colors } from '../styles/colors';

export const lightTheme = {
  colors: {
    primary: colors.primary,
    background: '#FFFFFF',
    card: '#F5F5F5',
    text: '#000000',
    border: '#E0E0E0',
  },
  dark: false,
};

// theme/darkTheme.js
export const darkTheme = {
  colors: {
    primary: colors.primary,
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
    border: '#2C2C2C',
  },
  dark: true,
};

// theme/ThemeProvider.js
import React, { createContext, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { lightTheme } from './lightTheme';
import { darkTheme } from './darkTheme';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
}
```

**Difference between theme and styles:**
- **Styles:** Static style definitions
- **Theme:** Dynamic, switchable design system (light/dark mode)

**Why separate theme?**
- Support multiple themes (light/dark)
- Runtime theme switching
- Better user experience
- Modern app requirement

---

## 📁 `src/utils/`
**Purpose:** Utility functions and helper methods

**What goes here:**
- Pure utility functions
- Helper methods
- Data formatters
- Validators
- Converters
- Common algorithms

**Example files:**
```
utils/
├── validators.js      # Email, phone validation
├── formatters.js      # Date, currency formatting
├── helpers.js         # General helper functions
├── converters.js      # Data conversion utilities
└── index.js
```

**Example content:**
```javascript
// utils/validators.js
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isValidPhone = (phone) => {
  const regex = /^\+?[\d\s-()]+$/;
  return regex.test(phone);
};

// utils/formatters.js
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatDate = (date, format = 'short') => {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: format,
  }).format(new Date(date));
};

// utils/helpers.js
export const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
```

**Why use utils?**
- DRY principle
- Reusable pure functions
- Easy testing
- Consistent behavior across app
- Single source of truth for common operations

---

## 🎯 Summary: Key Principles

### Separation of Concerns
- **API:** Network requests only
- **Services:** Business logic
- **Components:** UI presentation
- **Screens:** Page-level containers
- **Redux:** State management
- **Utils:** Pure helper functions

### Scalability
- Each folder can grow independently
- Easy to find and modify code
- New developers can understand structure quickly
- Supports large teams and large codebases

### Maintainability
- Clear responsibility for each folder
- Predictable file locations
- Easy refactoring
- Consistent patterns

### Best Practices
- Keep files small and focused
- Use index.js for clean exports
- Organize by feature when folders grow large
- Document complex logic
- Follow naming conventions

---

## 📊 Folder Usage Priority

**Most frequently used:**
1. `screens/` - Every new page
2. `components/` - Reusable UI
3. `redux/slices/` - State management
4. `api/` - Backend integration

**Moderately used:**
5. `services/` - Business logic
6. `navigation/` - Route changes
7. `utils/` - Helper functions
8. `hooks/` - Custom hooks

**Less frequently changed:**
9. `constants/` - Static values
10. `config/` - Environment settings
11. `theme/` - Design system
12. `styles/` - Global styles
13. `models/` - Data structures
14. `assets/` - Static files

---

## 🚀 When Your App Grows

As your app scales, you might restructure to **feature-based folders:**

```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── screens/
│   │   ├── redux/
│   │   ├── api/
│   │   └── hooks/
│   ├── products/
│   └── orders/
└── shared/
    ├── components/
    ├── utils/
    └── hooks/
```

But start with the structure we created - it's perfect for small to medium apps and can evolve as needed.
