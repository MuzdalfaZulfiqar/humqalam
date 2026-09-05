export interface Post {
  id: string;
  author_id: string;
  title: string;
  slug: string;
  content: object;
  excerpt: string | null;
  cover_image: string | null;
  category_id: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}