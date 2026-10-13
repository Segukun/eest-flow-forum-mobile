import { useRef, useState } from 'react';
import { Keyboard, Pressable, Text, TextInput, View } from 'react-native';

import AuthScreenLayout from '../components/AuthScreenLayout';
import authStyles from '../styles/authStyles';
import colors from '../styles/colors';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [error, setError] = useState('');
  const passwordInput = useRef(null);

  function handleSubmit() {
    if (!email.trim() || !password.trim()) {
      setError('Completá email y contraseña.');
      return;
    }

    setError('');
    Keyboard.dismiss();
    // Navegación temporal hasta conectar la API; no autentica al usuario.
    navigation.navigate('Forum');
  }

  function handleForgotPassword() {
    Keyboard.dismiss();
    navigation.navigate('ForgotPassword');
  }

  return (
    <AuthScreenLayout
      title="FORO INSTITUCIONAL"
      description="Ingresá con tu cuenta para continuar."
    >
      <View style={authStyles.form}>
        <View style={authStyles.field}>
          <Text style={authStyles.label}>Email</Text>
          <TextInput
            accessibilityLabel="Email"
            value={email}
            onChangeText={(value) => {
              setEmail(value);
              setError('');
            }}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            onSubmitEditing={() => passwordInput.current?.focus()}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            returnKeyType="next"
            submitBehavior="submit"
            placeholder="correo@ejemplo.com"
            placeholderTextColor={colors.muted}
            selectionColor={colors.green}
            style={[
              authStyles.input,
              focusedField === 'email' && authStyles.inputFocused,
              Boolean(error) && !email.trim() && authStyles.inputError,
            ]}
          />
        </View>

        <View style={authStyles.field}>
          <Text style={authStyles.label}>Contraseña</Text>
          <TextInput
            ref={passwordInput}
            accessibilityLabel="Contraseña"
            value={password}
            onChangeText={(value) => {
              setPassword(value);
              setError('');
            }}
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField(null)}
            onSubmitEditing={handleSubmit}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="current-password"
            returnKeyType="go"
            placeholder="Contraseña"
            placeholderTextColor={colors.muted}
            selectionColor={colors.green}
            style={[
              authStyles.input,
              focusedField === 'password' && authStyles.inputFocused,
              Boolean(error) && !password.trim() && authStyles.inputError,
            ]}
          />
        </View>

        {error ? (
          <Text
            style={authStyles.error}
            accessibilityRole="alert"
            accessibilityLiveRegion="polite"
          >
            {error}
          </Text>
        ) : null}

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Ingresar al foro institucional"
          onPress={handleSubmit}
          style={({ pressed }) => [authStyles.button, pressed && authStyles.pressed]}
        >
          <Text style={authStyles.buttonText}>Ingresar</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="¿Olvidaste tu contraseña?"
          onPress={handleForgotPassword}
          style={({ pressed }) => [authStyles.link, pressed && authStyles.pressed]}
        >
          <Text style={authStyles.linkText}>¿Olvidaste tu contraseña?</Text>
        </Pressable>
      </View>

      <Text style={authStyles.notice}>
        Acceso exclusivo para personal autorizado.
      </Text>
    </AuthScreenLayout>
  );
}
