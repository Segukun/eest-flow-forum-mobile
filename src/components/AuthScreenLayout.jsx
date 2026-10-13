import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import authStyles from '../styles/authStyles';
import colors from '../styles/colors';

export default function AuthScreenLayout({ title, description, children }) {
  const isFocused = useIsFocused();

  return (
    <ImageBackground
      source={require('../../assets/images/FotoEscuela.jpg')}
      resizeMode="cover"
      style={styles.background}
    >
      {isFocused ? <StatusBar style="light" /> : null}
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          style={styles.keyboardArea}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <SafeAreaView style={styles.safeArea}>
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="on-drag"
            >
              <View style={styles.card}>
                <View style={styles.identity}>
                  <View style={styles.logoContainer}>
                    <Image
                      source={require('../../assets/logo/eestn1logo.png')}
                      resizeMode="contain"
                      style={styles.logo}
                      accessibilityLabel="Escudo de E.E.S.T. N.º 1 República de México"
                    />
                  </View>
                  <Text style={styles.brand}>EEST Flow</Text>
                </View>

                <View style={styles.heading}>
                  <Text style={authStyles.title} accessibilityRole="header">
                    {title}
                  </Text>
                  <Text style={authStyles.description}>{description}</Text>
                </View>

                {children}
              </View>
            </ScrollView>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.graphite,
  },
  overlay: {
    flex: 1,
    backgroundColor: colors.authOverlay,
  },
  keyboardArea: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  card: {
    width: '100%',
    maxWidth: 440,
    padding: 24,
    gap: 24,
    borderRadius: 24,
    backgroundColor: colors.offWhite,
  },
  identity: {
    alignItems: 'center',
    gap: 8,
  },
  logoContainer: {
    width: '100%',
    height: 110,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  logo: {
    width: 110,
    height: 110,
    flexShrink: 0,
  },
  brand: {
    color: colors.graphite,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  heading: {
    gap: 10,
  },
});
