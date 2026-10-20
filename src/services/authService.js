import { requireMockMode } from '../config/api.js';

export async function login(email, password) {
  requireMockMode();

  if (!email?.trim() || !password?.trim()) {
    throw new Error('Completá email y contraseña.');
  }

  // Sesión de demostración: no verifica credenciales ni devuelve un token.
  return { user: { email: email.trim() }, mode: 'mock' };
}

export async function logout() {
  requireMockMode();
  // La sesión pertenece al orquestador y solo existe en memoria.
}

export async function requestPasswordReset(email) {
  requireMockMode();

  if (!email?.trim()) {
    throw new Error('Ingresá tu email.');
  }

  // Solo permite recorrer la vista previa; no envía un email ni crea un código.
  return { email: email.trim(), mode: 'mock' };
}

export async function confirmPasswordReset({ code, newPassword, repeatPassword }) {
  requireMockMode();

  // La longitud habilita la demostración; no se comprueba un código válido real.
  if (typeof code !== 'string' || code.length !== 6) {
    throw new Error('Ingresá el código de 6 dígitos.');
  }

  if (!newPassword?.trim() || !repeatPassword?.trim()) {
    throw new Error('Ingresá la nueva contraseña.');
  }

  if (newPassword !== repeatPassword) {
    throw new Error('Las contraseñas no coinciden.');
  }

  // No se almacena ninguna contraseña ni se modifican usuarios.
  return {
    mode: 'mock',
    message: 'La recuperación se conectará al backend posteriormente.',
  };
}
