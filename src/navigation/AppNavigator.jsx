import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ForumScreen from '../screens/ForumScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import LoginScreen from '../screens/LoginScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import colors from '../styles/colors';

const Stack = createNativeStackNavigator();

export default function AppNavigator({
  session,
  isMock,
  onLogin,
  onLogout,
  onRequestPasswordReset,
  onConfirmPasswordReset,
  onLoadPosts,
  onLoadPost,
}) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.offWhite },
        }}
      >
        {session ? (
          <Stack.Group navigationKey="app">
            <Stack.Screen name="Forum">
              {(props) => (
                <ForumScreen {...props} isMock={isMock} onLoadPosts={onLoadPosts} onLogout={onLogout} />
              )}
            </Stack.Screen>
            <Stack.Screen name="PostDetail">
              {(props) => <PostDetailScreen {...props} onLoadPost={onLoadPost} />}
            </Stack.Screen>
          </Stack.Group>
        ) : (
          <Stack.Group navigationKey="auth">
            <Stack.Screen name="Login">
              {(props) => <LoginScreen {...props} isMock={isMock} onLogin={onLogin} />}
            </Stack.Screen>
            <Stack.Screen name="ForgotPassword">
              {(props) => (
                <ForgotPasswordScreen {...props} isMock={isMock} onRequestPasswordReset={onRequestPasswordReset} />
              )}
            </Stack.Screen>
            <Stack.Screen name="ResetPassword">
              {(props) => (
                <ResetPasswordScreen {...props} isMock={isMock} onConfirmPasswordReset={onConfirmPasswordReset} />
              )}
            </Stack.Screen>
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
