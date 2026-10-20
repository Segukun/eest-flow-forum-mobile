import { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import colors from '../styles/colors';

export default function CodeInput({ value, onChangeText, hasError, editable = true }) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const activePosition = Math.min(value.length, 5);

  function focusInput() {
    if (editable) inputRef.current?.focus();
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={focusInput}
        disabled={!editable}
        accessibilityRole="button"
        accessibilityLabel="Ingresar código de 6 dígitos"
        accessibilityState={{ disabled: !editable }}
      >
        <View
          style={styles.cells}
          pointerEvents="none"
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        >
          {Array.from({ length: 6 }, (_, position) => (
            <View
              key={position}
              style={[
                styles.cell,
                isFocused && activePosition === position && styles.focused,
                hasError && styles.error,
              ]}
            >
              <Text style={styles.digit}>{value[position] || ''}</Text>
            </View>
          ))}
        </View>
      </Pressable>
      <TextInput
        ref={inputRef}
        pointerEvents="none"
        accessibilityLabel="Código de recuperación de 6 dígitos"
        value={value}
        onChangeText={(text) => onChangeText(text.replace(/\D/g, '').slice(0, 6))}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        keyboardType="number-pad"
        maxLength={6}
        autoComplete="one-time-code"
        textContentType="oneTimeCode"
        autoCorrect={false}
        editable={editable}
        caretHidden
        selectionColor="transparent"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  cells: {
    flexDirection: 'row',
    gap: 6,
  },
  cell: {
    flex: 1,
    minWidth: 0,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 10,
    backgroundColor: colors.surface,
  },
  focused: {
    borderColor: colors.green,
  },
  error: {
    borderColor: colors.error,
  },
  digit: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.graphite,
  },
  input: {
    ...StyleSheet.absoluteFillObject,
    color: 'transparent',
    backgroundColor: 'transparent',
    fontSize: 22,
  },
});
