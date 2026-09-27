import { BLOG_POSTS, type BlogPost } from "@/data/blog";

export interface ManagedBlogPost extends BlogPost {
  status?: "published" | "draft";
  tags?: string[];
  views?: number;
}

const STORAGE_KEY = "sujon_managed_blog_posts";

function getStoredPosts(): ManagedBlogPost[] {
  if (typeof window === "undefined") {
    return BLOG_POSTS.map((p) => ({ ...p, status: "published", tags: ["WordPress"], views: 124 }));
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    // fallback
  }

  const initial: ManagedBlogPost[] = BLOG_POSTS.map((p) => ({
    ...p,
    status: "published",
    tags: ["WordPress", "Web Development"],
    views: Math.floor(Math.random() * 300) + 80,
  }));

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  } catch (e) {}

  return initial;
}

function savePosts(posts: ManagedBlogPost[]) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch (e) {}
  }
}

export function getAllBlogPosts(): ManagedBlogPost[] {
  return getStoredPosts();
}

export function createBlogPost(post: Omit<ManagedBlogPost, "id">): ManagedBlogPost {
  const posts = getStoredPosts();
  const newPost: ManagedBlogPost = {
    ...post,
    id: `post-${Date.now()}`,
    views: 0,
  };
  posts.unshift(newPost);
  savePosts(posts);
  return newPost;
}

export function updateBlogPost(id: string, updates: Partial<ManagedBlogPost>): ManagedBlogPost | null {
  const posts = getStoredPosts();
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  posts[idx] = { ...posts[idx], ...updates };
  savePosts(posts);
  return posts[idx];
}

export function deleteBlogPost(id: string): boolean {
  const posts = getStoredPosts();
  const filtered = posts.filter((p) => p.id !== id);
  if (filtered.length === posts.length) return false;
  savePosts(filtered);
  return true;
}
