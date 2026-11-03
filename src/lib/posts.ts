import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

// Drafts only exist when running locally, so they never reach the public build.
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function postMeta(post: Post): string {
  const words = (post.body ?? '').trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return [`${minutes} min read`, ...(post.data.tags.length ? [post.data.tags.join(', ')] : [])].join(' · ');
}
