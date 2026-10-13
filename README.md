# Forum Mobile

Aplicación móvil del foro de EEST Flow, desarrollada con React Native y Expo.
Este repositorio contiene exclusivamente el cliente móvil.

## Objetivo

La primera versión permitirá:

- Iniciar sesión.
- Visualizar publicaciones del foro.
- Cerrar sesión.

La aplicación utilizará posteriormente la misma API REST que la aplicación web.
En futuras versiones se podrá ampliar el alcance con creación y detalle de publicaciones.

## Tecnologías

Cliente móvil:

- React Native
- Expo
- JavaScript / JSX
- React Navigation (Native Stack)

La base utiliza Expo SDK 57 y las versiones de React y React Native compatibles
incluidas en la plantilla oficial `blank` de Expo.

Backend existente, externo a este repositorio:

- Node.js
- Express
- MongoDB

La arquitectura futura será: cliente React Native → API REST existente → Node.js + Express → MongoDB.

## Estado

Expo está inicializado con JavaScript, login visual, recuperación visual y un foro temporal.
`index.js` registra `App.js` como componente raíz y `app.json` contiene la configuración de Expo.
`App.js` incorpora el proveedor de área segura y `AppNavigator` define la navegación Stack.
Las carpetas de API, contexto y componentes futuros conservan sus TODO.
La autenticación real, las publicaciones y la conexión con la API están pendientes.

## Navegación temporal

El Stack comienza en `Login`, mantiene oculto el header nativo y ofrece dos recorridos:

```text
Login
├── Forum
└── ForgotPassword
```

- `LoginScreen` muestra el escudo institucional, **FORO INSTITUCIONAL**, email,
  contraseña oculta y **Ingresar**, dentro de una tarjeta clara sobre la foto de la escuela.
- Los campos utilizan estado local; los vacíos (incluidos los que solo contienen espacios)
  muestran **Completá email y contraseña.** e impiden navegar.
- Si ambos campos tienen contenido, **Ingresar** ejecuta `navigation.navigate('Forum')`;
  no se verifica el email ni la contraseña y no se inicia una sesión real.
- **¿Olvidaste tu contraseña?** abre `ForgotPasswordScreen`.
- La recuperación solicita un email: si está vacío muestra **Ingresá tu email.**;
  si tiene contenido muestra **La recuperación se conectará al backend posteriormente.**
  No se envían correos ni se generan códigos. **Volver al inicio de sesión** vuelve con `goBack()`.
- `AuthScreenLayout` comparte la foto, el overlay, el logo y la tarjeta de ambos formularios.
  Los inputs y botones reutilizan `authStyles` y `colors`.
- `ForumScreen` muestra Foro Institucional y «Las publicaciones aparecerán aquí.».
- **Volver** ejecuta `navigation.goBack()` para regresar al login.

Se utilizan `@react-navigation/native`, `@react-navigation/native-stack`,
`react-native-screens` y `react-native-safe-area-context`. Las dependencias nativas
se instalaron mediante Expo para mantener la compatibilidad con el SDK del proyecto.
La base utiliza módulos incluidos en Expo Go y no requiere un development build.

## Ejecución local

Requisito: Node.js LTS y npm.

Al clonar el repositorio, instalar las dependencias:

```bash
npm install
```

Iniciar el servidor de desarrollo:

```bash
npx expo start
```

Abrir el proyecto desde Expo Go compatible con el SDK del proyecto y escanear el QR.
El teléfono y la computadora deben estar conectados a la misma red.
También se puede iniciar el servidor con `npm start`.

Para verificar el flujo en Expo Go:

1. Confirmar que Login muestra el escudo, la foto de la escuela y **FORO INSTITUCIONAL**.
2. Tocar **Ingresar** con campos vacíos o uno sin completar: debe mostrar el error y seguir en login.
3. Completar ambos campos y tocar **Ingresar**: debe abrir el placeholder del foro.
4. Tocar **Volver** y confirmar que se regresa al login.
5. Comprobar que el email no se capitaliza, la contraseña se oculta y el formulario
   permite desplazarse con el teclado abierto en Android e iOS, especialmente en pantallas pequeñas.
6. Abrir **¿Olvidaste tu contraseña?**, probar el email vacío y luego completarlo.
   Debe mostrar solo el aviso de conexión futura, sin indicar que se envió un correo.
7. Tocar **Volver al inicio de sesión** y repetir ambos recorridos. En Android,
   comprobar también el botón o gesto de volver del sistema.

## Teclado y recursos de los formularios

Los recursos locales se cargan mediante `require()`:

- Fondo: `assets/images/FotoEscuela.jpg`, con `ImageBackground` y `resizeMode="cover"`.
- Escudo: `assets/logo/eestn1logo.png`, con `Image` y `resizeMode="contain"`.

El overlay se aplica desde React Native; las imágenes originales no se modifican.
El texto **EEST Flow** acompaña al escudo como nombre del proyecto.

El `KeyboardAvoidingView` envuelve el área segura y aplica `padding` en iOS y `height`
en Android. El `ScrollView` tiene `flex: 1`, contenido con `flexGrow: 1`, espacio inferior
y `keyboardShouldPersistTaps="handled"`, para permitir desplazamiento y pulsar los botones
con el teclado abierto. `android.softwareKeyboardLayoutMode` queda explícitamente en `resize`.
La comprobación en teléfonos pequeños y con los teclados reales de Android e iOS
debe realizarse desde Expo Go. Reiniciar el servidor tras cambiar `app.json`:

```bash
npx expo start --clear
```

Para abrir un emulador Android previamente configurado:

```bash
npm run android
```

`npm run ios` abre el simulador de iOS y requiere macOS con Xcode.
Desde Windows se puede probar en un iPhone físico con Expo Go.

## Verificación de la base

Comprobar la compatibilidad de dependencias y la configuración:

```bash
npx expo install --check
npx expo-doctor
```

Generar bundles de producción para comprobar el código sin instalar la app en un dispositivo:

```bash
npx expo export --platform android --output-dir dist/android
npx expo export --platform ios --output-dir dist/ios
```

Esto verifica el empaquetado de JavaScript y Hermes; las pruebas en un teléfono o emulador
se realizan por separado. Los archivos generados en `dist/` están ignorados por Git.

## Estructura

```text
.
├── assets/
│   ├── images/
│   │   ├── .gitkeep
│   │   └── FotoEscuela.jpg
│   ├── icons/
│   │   ├── .gitkeep
│   │   ├── android-icon-background.png
│   │   ├── android-icon-foreground.png
│   │   └── android-icon-monochrome.png
│   └── logo/
│       ├── .gitkeep
│       ├── eestn1logo.png
│       └── icon.png
├── src/
│   ├── api/
│   │   ├── apiClient.js
│   │   ├── authApi.js
│   │   └── forumApi.js
│   ├── components/
│   │   ├── AuthScreenLayout.jsx
│   │   ├── PostCard.jsx
│   │   ├── Loading.jsx
│   │   └── ErrorMessage.jsx
│   ├── config/
│   │   └── api.js
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── navigation/
│   │   └── AppNavigator.jsx
│   ├── screens/
│   │   ├── LoginScreen.jsx
│   │   ├── ForgotPasswordScreen.jsx
│   │   └── ForumScreen.jsx
│   ├── styles/
│   │   ├── authStyles.js
│   │   └── colors.js
│   └── utils/
│       └── .gitkeep
├── App.js
├── app.json
├── index.js
├── package.json
├── package-lock.json
├── .env.example
├── .gitignore
└── README.md
```

Los archivos `.gitkeep` mantienen la estructura de carpetas en Git.
`eestn1logo.png` y `FotoEscuela.jpg` son los recursos institucionales utilizados por
los formularios. Los iconos de la app generados con la plantilla de Expo siguen siendo provisionales.

| Carpeta | Responsabilidad prevista |
| --- | --- |
| `assets/` | Recursos estáticos de la aplicación. |
| `assets/images/` | Imágenes generales. |
| `assets/icons/` | Iconos. |
| `assets/logo/` | Logo de la aplicación. |
| `src/` | Código del cliente móvil. |
| `src/api/` | Comunicación con el backend: cliente HTTP, autenticación y publicaciones. |
| `src/components/` | Diseño compartido de formularios y componentes futuros de publicaciones, carga y errores. |
| `src/config/` | Configuración de la aplicación y URL de la API. |
| `src/context/` | Estado global del usuario autenticado. |
| `src/navigation/` | Stack con login, foro y recuperación. |
| `src/screens/` | Login y recuperación visuales, y pantalla temporal del foro. |
| `src/styles/` | Valores visuales reutilizables, como la paleta de colores. |
| `src/utils/` | Funciones auxiliares futuras. |

## Configuración de la API

`.env.example` documenta la variable pública de la URL del backend:

```dotenv
EXPO_PUBLIC_API_URL=
```

Su valor se configurará al conectar la API en una futura etapa.
Las pantallas temporales no utilizan esta variable y no requieren un archivo `.env`.
Las variables `EXPO_PUBLIC_*` son públicas: no deben contener credenciales ni secretos.

## Próximos pasos

- Conectar la autenticación con la API existente.
- Conectar la recuperación al backend y definir después el flujo de código y cambio de contraseña.
- Implementar la visualización de publicaciones con la API del foro.
- Agregar el detalle de publicación en una etapa posterior.

## Referencia

La inicialización utiliza las dependencias y recursos de la
[plantilla oficial `blank` de Expo](https://docs.expo.dev/more/create-expo/).
