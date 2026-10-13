import { StyleSheet } from 'react-native';

import colors from './colors';

const authStyles = StyleSheet.create({
  title: {
    color: colors.graphite,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  description: {
    color: colors.graphite,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  form: {
    gap: 20,
  },
  field: {
    gap: 8,
  },
  label: {
    color: colors.graphite,
    fontSize: 15,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    minHeight: 56,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.orange,
    backgroundColor: colors.surface,
    color: colors.graphite,
    fontSize: 16,
  },
  inputFocused: {
    borderColor: colors.green,
  },
  inputError: {
    borderColor: colors.error,
  },
  error: {
    color: colors.error,
    fontSize: 14,
    lineHeight: 20,
  },
  message: {
    color: colors.graphite,
    fontSize: 14,
    lineHeight: 22,
  },
  button: {
    minHeight: 56,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.offWhite,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  link: {
    minHeight: 48,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkText: {
    color: colors.graphite,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  pressed: {
    opacity: 0.75,
  },
  notice: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },
});

export default authStyles;
