import Ionicons from '@expo/vector-icons/Ionicons';
import { useRef, useState } from 'react';
import { Keyboard, Pressable, Text, TextInput, View } from 'react-native';

import AuthScreenLayout from '../components/AuthScreenLayout';
import authStyles from '../styles/authStyles';
import colors from '../styles/colors';

export default function LoginScreen({ navigation, onLogin, isMock }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const passwordInput = useRef(null);

  async function handleSubmit() {
    if (isSubmitting) return;
    setError('');
    setIsSubmitting(true);
    try {
      // El orquestador consulta al servicio y cambia la sesión/navegación.
      await onLogin(email, password);
      Keyboard.dismiss();
    } catch (loginError) {
      setError(loginError.message || 'No se pudo iniciar sesión.');
    } finally {
      setIsSubmitting(false);
    }
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
            editable={!isSubmitting}
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
          <View
            style={[
              authStyles.input,
              authStyles.passwordRow,
              focusedField === 'password' && authStyles.inputFocused,
              Boolean(error) && !password.trim() && authStyles.inputError,
            ]}
          >
            <TextInput
              ref={passwordInput}
              accessibilityLabel="Contraseña"
              value={password}
              editable={!isSubmitting}
              onChangeText={(value) => {
                setPassword(value);
                setError('');
              }}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              onSubmitEditing={handleSubmit}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="current-password"
              returnKeyType="go"
              placeholder="Contraseña"
              placeholderTextColor={colors.muted}
              selectionColor={colors.green}
              style={authStyles.passwordInput}
            />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              onPress={() => setShowPassword((visible) => !visible)}
              disabled={isSubmitting}
              style={({ pressed }) => [authStyles.eyeButton, pressed && authStyles.pressed]}
            >
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={22}
                color={colors.graphite}
                accessible={false}
              />
            </Pressable>
          </View>
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
          disabled={isSubmitting}
          accessibilityState={{ busy: isSubmitting, disabled: isSubmitting }}
          style={({ pressed }) => [authStyles.button, (pressed || isSubmitting) && authStyles.pressed]}
        >
          <Text style={authStyles.buttonText}>{isSubmitting ? 'Ingresando…' : 'Ingresar'}</Text>
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
        {isMock
          ? 'Acceso de demostración. No se verifican credenciales reales.'
          : 'Acceso exclusivo para personal autorizado.'}
      </Text>
    </AuthScreenLayout>
  );
}
