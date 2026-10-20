import { useCallback, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from './src/navigation/AppNavigator';
import { apiConfig } from './src/config/api';
import * as authService from './src/services/authService';
import * as forumService from './src/services/forumService';

export default function App() {
  const [session, setSession] = useState(null);

  const handleLogin = useCallback(async (email, password) => {
    const nextSession = await authService.login(email, password);
    setSession(nextSession);
  }, []);

  const handleLogout = useCallback(async () => {
    await authService.logout();
    setSession(null);
  }, []);

  // Orquestador: las pantallas reciben callbacks, nunca implementaciones HTTP.
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <AppNavigator
        session={session}
        isMock={apiConfig.mode === 'mock'}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onRequestPasswordReset={authService.requestPasswordReset}
        onConfirmPasswordReset={authService.confirmPasswordReset}
        onLoadPosts={forumService.getPosts}
        onLoadPost={forumService.getPostById}
      />
    </SafeAreaProvider>
  );
}
