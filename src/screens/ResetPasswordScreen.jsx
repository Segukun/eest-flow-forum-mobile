import { useState } from 'react';
import { Keyboard, Pressable, Text, TextInput, View } from 'react-native';

import AuthScreenLayout from '../components/AuthScreenLayout';
import CodeInput from '../components/CodeInput';
import authStyles from '../styles/authStyles';
import colors from '../styles/colors';

export default function ResetPasswordScreen({ route, navigation, onConfirmPasswordReset, isMock }) {
  const email = route.params?.email || 'tu email';
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const canEditPassword = code.length === 6 && !isSubmitting;

  function clearFeedback() {
    setError('');
    setMessage('');
  }

  async function handleSubmit() {
    if (isSubmitting) return;
    clearFeedback();
    setIsSubmitting(true);
    try {
      const result = await onConfirmPasswordReset({ email, code, newPassword, repeatPassword });
      Keyboard.dismiss();
      setMessage(result.message);
      setNewPassword('');
      setRepeatPassword('');
    } catch (resetError) {
      setError(resetError.message || 'No se pudo continuar con la recuperación.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthScreenLayout
      title="Recuperar contraseña"
      description={isMock ? 'Vista previa de recuperación' : 'Ingresá el código de recuperación.'}
    >
      {isMock ? (
        <Text style={authStyles.notice}>Modo de demostración: no se envían emails ni códigos.</Text>
      ) : null}
      <View style={authStyles.field}>
        <Text style={authStyles.description}>Te hemos enviado un código al email:</Text>
        <Text style={authStyles.email}>{email}</Text>
      </View>

      <View style={authStyles.form}>
        <CodeInput
          value={code}
          onChangeText={(value) => {
            setCode(value);
            clearFeedback();
          }}
          hasError={Boolean(error) && code.length !== 6}
          editable={!isSubmitting}
        />
        <Text style={authStyles.message}>
          {isMock
            ? 'Una vez verificado el código podrás cambiar la contraseña. En esta demostración, seis dígitos solo habilitan los campos; no verifican un código real.'
            : 'Una vez verificado el código podrás cambiar la contraseña.'}
        </Text>

        <View style={authStyles.field}>
          <Text style={authStyles.label}>Nueva contraseña</Text>
          <TextInput
            accessibilityLabel="Nueva contraseña"
            value={newPassword}
            onChangeText={(value) => {
              setNewPassword(value);
              clearFeedback();
            }}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="new-password"
            placeholder="Nueva contraseña"
            placeholderTextColor={colors.muted}
            editable={canEditPassword}
            style={[authStyles.input, !canEditPassword && authStyles.inputDisabled]}
          />
        </View>

        <View style={authStyles.field}>
          <Text style={authStyles.label}>Repetir nueva contraseña</Text>
          <TextInput
            accessibilityLabel="Repetir nueva contraseña"
            value={repeatPassword}
            onChangeText={(value) => {
              setRepeatPassword(value);
              clearFeedback();
            }}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="new-password"
            placeholder="Repetir nueva contraseña"
            placeholderTextColor={colors.muted}
            editable={canEditPassword}
            returnKeyType="go"
            onSubmitEditing={handleSubmit}
            style={[authStyles.input, !canEditPassword && authStyles.inputDisabled]}
          />
        </View>

        {error ? (
          <Text style={authStyles.error} accessibilityRole="alert" accessibilityLiveRegion="polite">
            {error}
          </Text>
        ) : null}
        {message ? (
          <Text style={authStyles.message} accessibilityLiveRegion="polite">{message}</Text>
        ) : null}

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Confirmar contraseña"
          disabled={isSubmitting}
          accessibilityState={{ busy: isSubmitting, disabled: isSubmitting }}
          onPress={handleSubmit}
          style={({ pressed }) => [authStyles.button, (pressed || isSubmitting) && authStyles.pressed]}
        >
          <Text style={authStyles.buttonText}>
            {isSubmitting ? 'Confirmando…' : 'Confirmar contraseña'}
          </Text>
        </Pressable>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => {
          Keyboard.dismiss();
          navigation.popTo('Login');
        }}
        style={({ pressed }) => [authStyles.link, pressed && authStyles.pressed]}
      >
        <Text style={authStyles.linkText}>Volver al inicio de sesión</Text>
      </Pressable>
    </AuthScreenLayout>
  );
}
