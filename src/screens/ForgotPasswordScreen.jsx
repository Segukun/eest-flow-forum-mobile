import { useState } from 'react';
import { Keyboard, Pressable, Text, TextInput, View } from 'react-native';

import AuthScreenLayout from '../components/AuthScreenLayout';
import authStyles from '../styles/authStyles';
import colors from '../styles/colors';

export default function ForgotPasswordScreen({ navigation, onRequestPasswordReset, isMock }) {
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    if (isSubmitting) return;
    setError('');
    setIsSubmitting(true);
    try {
      const result = await onRequestPasswordReset(email);
      Keyboard.dismiss();
      navigation.navigate('ResetPassword', { email: result.email });
    } catch (resetError) {
      setError(resetError.message || 'No se pudo continuar con la recuperación.');
    } finally {
      setIsSubmitting(false);
    }
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
            editable={!isSubmitting}
            onChangeText={(value) => {
              setEmail(value);
              setError('');
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

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Enviar código"
          onPress={handleSubmit}
          disabled={isSubmitting}
          accessibilityState={{ busy: isSubmitting, disabled: isSubmitting }}
          style={({ pressed }) => [authStyles.button, (pressed || isSubmitting) && authStyles.pressed]}
        >
          <Text style={authStyles.buttonText}>{isSubmitting ? 'Continuando…' : 'Enviar código'}</Text>
        </Pressable>
      </View>

      {isMock ? <Text style={authStyles.notice}>Flujo de demostración: no se envían emails.</Text> : null}

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
