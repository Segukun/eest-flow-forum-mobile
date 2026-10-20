import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import colors from '../styles/colors';
import styles from '../styles/forumStyles';

export default function PostDetailScreen({ route, navigation, onLoadPost }) {
  const postId = route.params?.postId;
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let isActive = true;
    setIsLoading(true);
    setError('');

    async function loadPost() {
      try {
        const nextPost = await onLoadPost(postId);
        if (isActive) setPost(nextPost);
      } catch (loadError) {
        if (isActive) setError(loadError.message || 'No se pudo cargar la publicación.');
      } finally {
        if (isActive) setIsLoading(false);
      }
    }

    loadPost();
    return () => { isActive = false; };
  }, [onLoadPost, postId, reload]);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Volver al Foro"
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [styles.back, pressed && styles.pressed]}
        >
          <Ionicons name="arrow-back-outline" size={20} color={colors.graphite} accessible={false} />
          <Text style={styles.actionText}>Foro</Text>
        </Pressable>

        {isLoading ? <Loading message="Cargando publicación…" /> : error ? (
          <ErrorMessage message={error} onRetry={() => setReload((value) => value + 1)} />
        ) : post ? (
          <View style={styles.detail}>
            <Text style={styles.sector}>{post.sector}</Text>
            <Text style={styles.metadata}>{post.author} · {post.date}</Text>
            <Text style={styles.title} accessibilityRole="header">{post.title}</Text>
            {post.pinned ? (
              <View style={styles.pin}>
                <Ionicons name="pin-outline" size={14} color={colors.green} accessible={false} />
                <Text style={styles.pinText}>Publicación fijada</Text>
              </View>
            ) : null}
            <Text style={styles.body} selectable>{post.content}</Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
