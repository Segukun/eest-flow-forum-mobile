import { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import PostCard from '../components/PostCard';
import styles from '../styles/forumStyles';

export default function ForumScreen({ navigation, onLoadPosts, onLogout, isMock }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [reload, setReload] = useState(0);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState('');

  useEffect(() => {
    let isActive = true;
    setIsLoading(true);
    setError('');

    async function loadPosts() {
      try {
        const nextPosts = await onLoadPosts();
        if (isActive) setPosts(nextPosts);
      } catch (loadError) {
        if (isActive) setError(loadError.message || 'No se pudieron cargar las publicaciones.');
      } finally {
        if (isActive) setIsLoading(false);
      }
    }

    loadPosts();
    return () => { isActive = false; };
  }, [onLoadPosts, reload]);

  async function handleLogout() {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    setLogoutError('');
    try {
      await onLogout();
    } catch (sessionError) {
      setLogoutError(sessionError.message || 'No se pudo cerrar la sesión.');
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        style={styles.list}
        data={isLoading || error ? [] : posts}
        keyExtractor={(post) => post.id}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onPress={() => navigation.navigate('PostDetail', { postId: item.id })}
          />
        )}
        contentContainerStyle={styles.content}
        ListHeaderComponent={(
          <View style={styles.header}>
            <View style={styles.topRow}>
              <Text style={styles.brand}>EEST Flow</Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Cerrar sesión"
                disabled={isLoggingOut}
                onPress={handleLogout}
                style={({ pressed }) => [styles.action, (pressed || isLoggingOut) && styles.pressed]}
              >
                <Text style={styles.actionText}>{isLoggingOut ? 'Saliendo…' : 'Cerrar sesión'}</Text>
              </Pressable>
            </View>
            <Text style={styles.title} accessibilityRole="header">Foro Institucional</Text>
            <Text style={styles.description}>Avisos y novedades para el personal de la institución.</Text>
            {isMock ? <Text style={styles.demo}>Publicaciones de demostración</Text> : null}
            {logoutError ? <ErrorMessage message={logoutError} /> : null}
          </View>
        )}
        ListEmptyComponent={isLoading ? (
          <Loading message="Cargando publicaciones…" />
        ) : error ? (
          <ErrorMessage message={error} onRetry={() => setReload((value) => value + 1)} />
        ) : (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No hay publicaciones todavía.</Text>
            <Text style={styles.emptyDescription}>
              Los avisos institucionales aparecerán en esta sección.
            </Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
