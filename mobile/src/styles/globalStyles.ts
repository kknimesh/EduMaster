import { StyleSheet } from 'react-native';

// Color palette
export const Colors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  secondary: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  success: {
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
  },
  danger: {
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
  },
  warning: {
    500: '#f59e0b',
    600: '#d97706',
  },
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
};

// Typography
export const Typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 28,
    fontWeight: '600' as const,
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  h4: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  h5: {
    fontSize: 18,
    fontWeight: '500' as const,
    lineHeight: 24,
  },
  h6: {
    fontSize: 16,
    fontWeight: '500' as const,
    lineHeight: 22,
  },
  body1: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '500' as const,
    lineHeight: 20,
  },
};

// Spacing
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border Radius
export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
};

// Shadows
export const Shadows = {
  sm: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
};

// Global Styles
export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary[50],
  },
  safeArea: {
    flex: 1,
  },
  screen: {
    flex: 1,
    padding: Spacing.md,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    ...Shadows.sm,
  },
  button: {
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  buttonPrimary: {
    backgroundColor: Colors.primary[600],
  },
  buttonSecondary: {
    backgroundColor: Colors.secondary[200],
  },
  buttonDanger: {
    backgroundColor: Colors.danger[600],
  },
  buttonText: {
    ...Typography.button,
    color: Colors.white,
  },
  buttonTextSecondary: {
    ...Typography.button,
    color: Colors.secondary[700],
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.secondary[300],
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.sm,
    fontSize: 16,
    backgroundColor: Colors.white,
    minHeight: 44,
  },
  inputFocused: {
    borderColor: Colors.primary[500],
    borderWidth: 2,
  },
  label: {
    ...Typography.body2,
    color: Colors.secondary[700],
    marginBottom: Spacing.xs,
    fontWeight: '500',
  },
  errorText: {
    ...Typography.caption,
    color: Colors.danger[600],
    marginTop: Spacing.xs,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  textCenter: {
    textAlign: 'center',
  },
  mt: {
    marginTop: Spacing.md,
  },
  mb: {
    marginBottom: Spacing.md,
  },
  ml: {
    marginLeft: Spacing.md,
  },
  mr: {
    marginRight: Spacing.md,
  },
  pt: {
    paddingTop: Spacing.md,
  },
  pb: {
    paddingBottom: Spacing.md,
  },
  pl: {
    paddingLeft: Spacing.md,
  },
  pr: {
    paddingRight: Spacing.md,
  },
});