import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, Text, View } from 'react-native';

import colors from '../styles/colors';
import styles from '../styles/forumStyles';

export default function PostCard({ post, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${post.title}. ${post.sector}. ${post.author}. ${post.date}${post.pinned ? '. Fijado' : ''}`}
      accessibilityHint="Abrir el contenido completo de la publicación"
      onPress={onPress}
      style={({ pressed }) => [styles.card, post.pinned && styles.pinnedCard, pressed && styles.pressed]}
    >
      <View style={styles.metadataRow}>
        <Text style={styles.sector}>{post.sector}</Text>
        <Text style={styles.metadata}>{post.date}</Text>
      </View>
      <Text style={styles.metadata}>{post.author}</Text>
      <Text style={styles.postTitle}>{post.title}</Text>
      <Text style={styles.preview} numberOfLines={3}>{post.content}</Text>
      {post.pinned ? (
        <View style={styles.pin}>
          <Ionicons name="pin-outline" size={14} color={colors.green} accessible={false} />
          <Text style={styles.pinText}>Fijado</Text>
        </View>
      ) : null}
    </Pressable>
  );
}
