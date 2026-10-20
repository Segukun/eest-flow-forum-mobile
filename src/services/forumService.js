import { requireMockMode } from '../config/api.js';
import forumPosts from '../data/forumPosts.js';

export async function getPosts() {
  requireMockMode();

  // Copias para que el ordenamiento o la UI no modifiquen los datos originales.
  return forumPosts
    .map((post) => ({ ...post }))
    .sort((first, second) => Number(second.pinned) - Number(first.pinned));
}

export async function getPostById(postId) {
  requireMockMode();

  const post = forumPosts.find((item) => item.id === postId);
  if (!post) {
    throw new Error('No se encontró la publicación.');
  }

  return { ...post };
}
