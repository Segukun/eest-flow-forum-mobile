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

La base utiliza Expo SDK 57 y las versiones de React y React Native compatibles
incluidas en la plantilla oficial `blank` de Expo.

Backend existente, externo a este repositorio:

- Node.js
- Express
- MongoDB

La arquitectura futura será: cliente React Native → API REST existente → Node.js + Express → MongoDB.

## Estado

Expo está inicializado con JavaScript y una pantalla de inicio mínima para verificar el arranque.
`index.js` registra `App.js` como componente raíz y `app.json` contiene la configuración de Expo.
Los archivos de `src/` siguen siendo comentarios de responsabilidad y TODO;
login, foro, navegación y conexión con la API están pendientes.

## Ejecución local

Requisito: Node.js LTS y npm.

Al clonar el repositorio, instalar las dependencias con el lockfile:

```bash
npm ci
```

Iniciar el servidor de desarrollo:

```bash
npm start
```

Abrir el proyecto desde Expo Go compatible con el SDK del proyecto y escanear el QR.
El teléfono y la computadora deben estar conectados a la misma red.

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
│   │   └── .gitkeep
│   ├── icons/
│   │   ├── .gitkeep
│   │   ├── android-icon-background.png
│   │   ├── android-icon-foreground.png
│   │   └── android-icon-monochrome.png
│   └── logo/
│       ├── .gitkeep
│       └── icon.png
├── src/
│   ├── api/
│   │   ├── apiClient.js
│   │   ├── authApi.js
│   │   └── forumApi.js
│   ├── components/
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
│   │   └── ForumScreen.jsx
│   ├── styles/
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
Los iconos actuales provienen de la plantilla oficial de Expo y son provisionales.

| Carpeta | Responsabilidad prevista |
| --- | --- |
| `assets/` | Recursos estáticos de la aplicación. |
| `assets/images/` | Imágenes generales. |
| `assets/icons/` | Iconos. |
| `assets/logo/` | Logo de la aplicación. |
| `src/` | Código del cliente móvil. |
| `src/api/` | Comunicación con el backend: cliente HTTP, autenticación y publicaciones. |
| `src/components/` | Componentes reutilizables: tarjeta de publicación, carga y errores. |
| `src/config/` | Configuración de la aplicación y URL de la API. |
| `src/context/` | Estado global del usuario autenticado. |
| `src/navigation/` | Navegación futura entre login y foro. |
| `src/screens/` | Pantallas completas de login y foro. |
| `src/styles/` | Valores visuales reutilizables, como la paleta de colores. |
| `src/utils/` | Funciones auxiliares futuras. |

## Configuración de la API

`.env.example` documenta la variable pública de la URL del backend:

```dotenv
EXPO_PUBLIC_API_URL=
```

Su valor se configurará al conectar la API en una futura etapa.
La pantalla inicial no utiliza esta variable y no requiere un archivo `.env`.
Las variables `EXPO_PUBLIC_*` son públicas: no deben contener credenciales ni secretos.

## Próximos pasos

- Configurar la navegación.
- Implementar LoginScreen.
- Implementar ForumScreen.
- Conectar la autenticación con la API existente.
- Conectar la API del foro.

## Referencia

La inicialización utiliza las dependencias y recursos de la
[plantilla oficial `blank` de Expo](https://docs.expo.dev/more/create-expo/).
