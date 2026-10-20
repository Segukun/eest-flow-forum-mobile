// Cambiar el modo requiere implementar primero los contratos reales en services.
// Nunca se usa localhost ni una IP personal como valor predeterminado.
export const apiConfig = {
  mode: 'mock',
  baseUrl: (process.env.EXPO_PUBLIC_API_URL || '').trim(),
};

export function requireMockMode() {
  if (apiConfig.mode !== 'mock') {
    throw new Error('La conexión con el backend todavía no está implementada.');
  }
}
