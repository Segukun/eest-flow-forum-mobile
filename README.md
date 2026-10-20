# EEST Flow · Mobile Forum

Cliente móvil de EEST Flow con React Native, Expo SDK 57, JavaScript y React Navigation.
Esta versión permite revisar cinco pantallas con servicios mock. No conecta un backend,
no envía emails, no modifica contraseñas y no persiste una sesión.

## Arquitectura de tres capas

```text
Screens / UI: inputs, presentación, estados de carga/error y eventos
       ↓ callbacks
App.js / AppNavigator: sesión en memoria y coordinación de navegación
       ↓
Services: authService y forumService
       ↓
Datos mock locales / futuros adaptadores a la API existente
```

- Las pantallas reciben callbacks: `onLogin`, `onRequestPasswordReset`,
  `onConfirmPasswordReset`, `onLoadPosts`, `onLoadPost` y `onLogout`.
- `App.js` es el único punto que conecta esos callbacks con los servicios.
- `AppNavigator` muestra las rutas de autenticación o las del foro según la sesión.
  Al ingresar o salir se descarta el historial del grupo anterior.
- `authService` valida el acceso de demostración y la recuperación. No conserva contraseñas.
- `forumService` entrega copias de los mocks, ordena las fijadas primero y obtiene detalles por ID.
- `src/api/` y `src/context/AuthContext.jsx` son archivos base reservados de etapas anteriores;
  todavía no se usan. No hay otra implementación de autenticación en esas carpetas.

## Navegación

Un único Native Stack, con header nativo oculto y dos grupos condicionales:

```text
App
└── NavigationContainer
    └── Stack
        ├── Sin sesión
        │   ├── Login
        │   ├── ForgotPassword
        │   └── ResetPassword
        └── Sesión mock en memoria
            ├── Forum
            └── PostDetail
```

No se puede volver al login con el botón Atrás después de ingresar.
**Cerrar sesión** elimina el estado en memoria y vuelve al grupo de autenticación.
Cerrar o recargar la app también elimina la sesión.

## Autenticación y recuperación de demostración

- Login usa campos controlados y permite mostrar/ocultar la contraseña con Ionicons.
- El servicio rechaza email o contraseña vacíos, incluidos los que solo contienen espacios.
  Cualquier par de campos con contenido permite una sesión mock, sin comprobar credenciales.
- ForgotPassword llama al servicio y abre ResetPassword con el email normalizado como parámetro.
- ResetPassword muestra una vista previa del texto de envío junto a un aviso explícito de
  demostración: no se envían emails ni se genera un código real.
- Un solo `TextInput` recibe el código numérico y representa seis casillas. Permite escribir,
  borrar y pegar seis dígitos. No hay un código válido hardcodeado.
- Seis posiciones habilitan los campos de contraseña en la demostración; no verifican identidad.
- El servicio comprueba longitud del código, contraseñas vacías y coincidencia exacta.
- La confirmación solo muestra **La recuperación se conectará al backend posteriormente.**
  y limpia las nuevas contraseñas del formulario. Nunca afirma que hubo un cambio real.
- El vínculo de retorno elimina las pantallas de recuperación del historial y vuelve a Login.

`AuthScreenLayout` conserva el escudo de **110 × 110**, su contenedor y `contain`;
la foto real de la escuela con `cover`; el overlay; y la adaptación al teclado de Android/iOS.
Los tres formularios comparten ese layout y `authStyles`.

## Foro de demostración

- Cinco publicaciones ficticias en `src/data/forumPosts.js`, sin nombres personales reales.
- `PostCard` muestra sector, autor, fecha, título, vista previa e indicador de fijado.
- Forum utiliza `FlatList`, carga asincrónica y estados loading, error con reintento, vacío y éxito.
- El estado vacío informa **No hay publicaciones todavía.** y
  **Los avisos institucionales aparecerán en esta sección.**
- PostDetail recibe únicamente `postId` y solicita el contenido completo mediante el callback.
- No se incluyen creación de posts, edición, comentarios, reacciones, adjuntos ni paginación.

## Organización

```text
assets/
├── images/FotoEscuela.jpg
└── logo/eestn1logo.png
src/
├── api/                          # Adaptadores futuros, sin implementar
├── components/
│   ├── AuthScreenLayout.jsx
│   ├── CodeInput.jsx
│   ├── ErrorMessage.jsx
│   ├── Loading.jsx
│   └── PostCard.jsx
├── config/api.js                 # Modo mock/backend y URL futura, centralizados
├── context/AuthContext.jsx       # Base reservada, actualmente sin usar
├── data/forumPosts.js
├── navigation/AppNavigator.jsx
├── screens/
│   ├── LoginScreen.jsx
│   ├── ForgotPasswordScreen.jsx
│   ├── ResetPasswordScreen.jsx
│   ├── ForumScreen.jsx
│   └── PostDetailScreen.jsx
├── services/
│   ├── authService.js
│   └── forumService.js
├── styles/
│   ├── authStyles.js
│   ├── colors.js
│   └── forumStyles.js
└── utils/
tests/services.test.mjs
App.js
app.json
index.js
package.json
package-lock.json
.env.example
```

Los iconos de la aplicación generados con la plantilla de Expo siguen siendo provisionales.
El escudo y la foto institucionales utilizados dentro de la app son los recursos originales.

## Configuración de backend futura

`src/config/api.js` concentra `apiConfig.mode` (`mock` actualmente) y `baseUrl`, leída de:

```dotenv
EXPO_PUBLIC_API_URL=
```

La app no requiere `.env` para usar los mocks. No se hardcodea ninguna IP ni ningún endpoint.
En un teléfono físico, `localhost` apunta al teléfono: cuando se integre el backend,
se configurará la dirección LAN o una URL accesible desde el dispositivo.
Las variables `EXPO_PUBLIC_*` son públicas y no deben contener secretos.

Cambiar el modo a `backend` hoy produce un error explícito de implementación pendiente;
no hace solicitudes ni presenta mocks como datos reales. Antes de habilitar ese modo hay que
verificar los contratos existentes e implementarlos dentro de los servicios/adaptadores.
Las pantallas y sus callbacks se mantienen. Este repositorio no implementa ni modifica backend.

## Ejecución con Expo Go

Requisitos: Node.js LTS, npm y Expo Go compatible con Expo SDK 57.

```bash
npm install
npx expo start
```

Escanear el QR desde Expo Go, con teléfono y computadora en la misma red.
Para limpiar la caché después de actualizar dependencias:

```bash
npx expo start --clear
```

También están disponibles `npm start` y `npm run android` para un emulador configurado.
`npm run ios` requiere macOS y Xcode para abrir el simulador.
Los módulos usados son compatibles con Expo Go; no se requiere un development build.

## Verificación automática

```bash
npm test
npx expo install --check
npx expo-doctor
npx expo export --platform android --output-dir dist/android
npx expo export --platform ios --output-dir dist/ios
```

Las pruebas de servicios usan únicamente `node:test` y `node:assert`.
Comprueban validaciones, ausencia de contraseñas/tokens en las respuestas, modo backend
no implementado, orden de fijadas, copias independientes y detalle inexistente.
Los bundles verifican el empaquetado de JavaScript/Hermes y los assets;
no reemplazan la prueba visual y táctil en un dispositivo. `dist/` se ignora en Git.

Para comprobar temporalmente el empty state se puede inyectar `onLoadPosts` que resuelva
`[]` en un entorno de prueba. No existe un interruptor de prueba ni una publicación especial
para esto en la aplicación.

## Recorrido de prueba en Expo Go

1. Abrir Login e ingresar email y contraseña.
2. Mostrar y ocultar la contraseña; comprobar que se conserva lo escrito.
3. Probar campos vacíos: debe aparecer el error y mantenerse Login.
4. Completar ambos campos: debe aparecer el Foro.
5. Recorrer la lista: las publicaciones fijadas aparecen primero.
6. Abrir una tarjeta, leer el contenido completo y volver al Foro.
7. Cerrar sesión: debe volver a Login y no permitir regresar al Foro con Atrás.
8. Abrir **¿Olvidaste tu contraseña?** y probar el email vacío.
9. Completar el email: debe abrir ResetPassword mostrando esa dirección.
10. Probar un código incompleto, contraseñas vacías y contraseñas diferentes.
11. Probar seis dígitos y contraseñas iguales: solo debe mostrar el aviso de backend pendiente.
12. Volver a Login y repetir el recorrido con el teclado abierto en un teléfono pequeño.
13. Verificar la foto de fondo, el escudo contenido y la posibilidad de alcanzar los botones
    con el teclado de Android e iOS.

## Pendientes de integración

- Verificar e integrar los contratos reales de autenticación y recuperación.
- Integrar la consulta de publicaciones y detalles cuando exista el contrato del foro.
- Definir persistencia de sesión y cierre real junto al backend.
- Validar visualmente y mediante interacción táctil esta versión en Expo Go.
