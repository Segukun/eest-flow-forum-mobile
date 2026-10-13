import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import colors from '../styles/colors';

export default function ForumScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.identity}>
          <Text style={styles.brand}>EEST Flow</Text>
          <Text style={styles.title}>Foro Institucional</Text>
          <Text style={styles.description}>Las publicaciones aparecerán aquí.</Text>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        >
          <Text style={styles.buttonText}>Volver</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.offWhite,
  },
  content: {
    flex: 1,
    padding: 24,
    gap: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  identity: {
    alignItems: 'center',
    gap: 12,
  },
  brand: {
    color: colors.graphite,
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
  },
  title: {
    color: colors.green,
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  description: {
    color: colors.graphite,
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    minHeight: 48,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.graphite,
    fontSize: 16,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.75,
  },
});
