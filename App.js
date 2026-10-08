import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// TODO: Conectar AppNavigator cuando se implemente la navegación.
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forum Mobile</Text>
      <Text>Base del proyecto inicializada con Expo.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
  },
});
