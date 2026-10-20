import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import colors from '../styles/colors';

export default function Loading({ message = 'Cargando…' }) {
  return (
    <View style={styles.container} accessibilityRole="progressbar" accessibilityLabel={message}>
      <ActivityIndicator color={colors.green} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    alignItems: 'center',
    gap: 12,
  },
  message: {
    color: colors.muted,
    fontSize: 16,
    textAlign: 'center',
  },
});
