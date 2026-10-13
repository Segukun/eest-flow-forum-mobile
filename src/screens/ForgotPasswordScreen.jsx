import { useState } from 'react';
import { Keyboard, Pressable, Text, TextInput, View } from 'react-native';

import AuthScreenLayout from '../components/AuthScreenLayout';
import authStyles from '../styles/authStyles';
import colors from '../styles/colors';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit() {
    if (!email.trim()) {
      setMessage('');
      setError('Ingresá tu email.');
      return;
    }

    Keyboard.dismiss();
    setError('');
    // Aviso local: todavía no se envían emails ni se generan códigos.
    setMessage('La recuperación se conectará al backend posteriormente.');
  }

  function handleBack() {
    Keyboard.dismiss();
    navigation.goBack();
  }

  return (
    <AuthScreenLayout
      title="Recuperar contraseña"
      description="Ingresá el email asociado a tu cuenta."
    >
      <View style={authStyles.form}>
        <View style={authStyles.field}>
          <Text style={authStyles.label}>Email</Text>
          <TextInput
            accessibilityLabel="Email de recuperación"
            value={email}
            onChangeText={(value) => {
              setEmail(value);
              setError('');
              setMessage('');
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onSubmitEditing={handleSubmit}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            returnKeyType="send"
            placeholder="correo@ejemplo.com"
            placeholderTextColor={colors.muted}
            selectionColor={colors.green}
            style={[
              authStyles.input,
              isFocused && authStyles.inputFocused,
              Boolean(error) && authStyles.inputError,
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

        {message ? (
          <Text style={authStyles.message} accessibilityLiveRegion="polite">
            {message}
          </Text>
        ) : null}

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Enviar código"
          onPress={handleSubmit}
          style={({ pressed }) => [authStyles.button, pressed && authStyles.pressed]}
        >
          <Text style={authStyles.buttonText}>Enviar código</Text>
        </Pressable>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={handleBack}
        style={({ pressed }) => [authStyles.link, pressed && authStyles.pressed]}
      >
        <Text style={authStyles.linkText}>Volver al inicio de sesión</Text>
      </Pressable>
    </AuthScreenLayout>
  );
}
