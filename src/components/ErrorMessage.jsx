import { Pressable, StyleSheet, Text, View } from 'react-native';

import colors from '../styles/colors';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <View style={styles.container}>
      <Text style={styles.message} accessibilityRole="alert" accessibilityLiveRegion="polite">
        {message}
      </Text>
      {onRetry ? (
        <Pressable
          accessibilityRole="button"
          onPress={onRetry}
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        >
          <Text style={styles.buttonText}>Reintentar</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12, paddingVertical: 24 },
  message: { color: colors.error, fontSize: 16, lineHeight: 24, textAlign: 'center' },
  button: { minHeight: 48, padding: 12, alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: colors.graphite, fontSize: 16, fontWeight: '600' },
  pressed: { opacity: 0.7 },
});
