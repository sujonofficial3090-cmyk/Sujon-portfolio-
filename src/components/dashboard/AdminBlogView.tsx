import { useState, useEffect } from "react";
import { BookOpen, Plus, Pencil, Trash2, CheckCircle2, Eye, EyeOff, ExternalLink, X } from "lucide-react";
import { NeumorphicCard, NeumorphicButton } from "@/components/nm";
import {
  getAllBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  type ManagedBlogPost,
} from "@/lib/blogStore";
import { toast } from "sonner";

export function AdminBlogView() {
  const [posts, setPosts] = useState<ManagedBlogPost[]>(getAllBlogPosts());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<ManagedBlogPost | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("WordPress");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState("WordPress, Performance");
  const [status, setStatus] = useState<"published" | "draft">("published");
  const [imgUrl, setImgUrl] = useState("");

  const reload = () => setPosts(getAllBlogPosts());

  useEffect(() => {
    reload();
    window.addEventListener("sujon-blog-updated", reload);
    return () => window.removeEventListener("sujon-blog-updated", reload);
  }, []);

  const openCreateModal = () => {
    setEditingPost(null);
    setTitle("");
    setSlug("");
    setCategory("WordPress");
    setExcerpt("");
    setContent("");
    setTagsInput("WordPress, Elementor");
    setStatus("published");
    setImgUrl("https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80");
    setIsModalOpen(true);
  };

  const openEditModal = (p: ManagedBlogPost) => {
    setEditingPost(p);
    setTitle(p.title);
    setSlug(p.slug);
    setCategory(p.category);
    setExcerpt(p.excerpt);
    setContent(p.content);
    setTagsInput((p.tags || []).join(", "));
    setStatus(p.status);
    setImgUrl(p.img);
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingPost) {
      
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      );
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) {
      toast.error("Title and slug are required.");
      return;
    }

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingPost) {
      updateBlogPost(editingPost.id, {
        title: title.trim(),
        slug: slug.trim(),
        category,
        excerpt: excerpt.trim(),
        content: content.trim(),
        tags,
        status,
        img: imgUrl || editingPost.img,
      });
      toast.success("Blog post updated!");
    } else {
      createBlogPost({
        title: title.trim(),
        slug: slug.trim(),
        category,
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        author: "Sujon",
        img: imgUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        excerpt: excerpt.trim(),
        content: content.trim() || `## ${title}\n\nArticle content here...`,
        tags,
        status,
      });
      toast.success("New blog post created!");
    }

    setIsModalOpen(false);
    reload();
  };

  const handleToggleStatus = (p: ManagedBlogPost) => {
    const nextStatus = p.status === "published" ? "draft" : "published";
    updateBlogPost(p.id, { status: nextStatus });
    toast.success(`Post "${p.title}" marked as ${nextStatus}!`);
    reload();
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete blog post "${title}"?`)) {
      deleteBlogPost(id);
      toast.info("Blog post removed.");
      reload();
    }
  };

  const fieldClass =
    "nm-inset w-full rounded-[10px] px-3.5 py-2.5 text-[12px] text-foreground placeholder:text-muted-foreground/70 outline-none bg-surface";

  return (
    <div className="space-y-6">
      <NeumorphicCard depth="md" radius="lg" className="p-5 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/70">
          <div>
            <h2 className="text-[17px] font-extrabold uppercase tracking-wider text-foreground font-display flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-amber-500" />
              Blog & Tutorial Articles ({posts.length})
            </h2>
            <p className="text-[11.5px] text-muted-foreground mt-0.5">
              Create and manage WordPress insights and tutorials. Only published articles are visible to website visitors.
            </p>
          </div>

          <NeumorphicButton tone="brand" size="sm" onClick={openCreateModal} className="shrink-0 font-extrabold text-[11px] uppercase">
            <Plus className="h-3.5 w-3.5" /> Create Article
          </NeumorphicButton>
        </div>

        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="nm-raised-sm p-4 rounded-[14px] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3.5">
                <img
                  src={post.img}
                  alt={post.title}
                  className="h-14 w-20 rounded-[8px] object-cover shrink-0 nm-inset"
                />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-[14.5px] font-bold text-foreground">
                      {post.title}
                    </h3>
                    <span
                      className={`text-[9.5px] px-2 py-0.5 rounded-full nm-inset font-extrabold uppercase ${
                        post.status === "published"
                          ? "text-green-500 font-bold"
                          : "text-amber-500 font-bold"
                      }`}
                    >
                      {post.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Category: <strong className="text-foreground">{post.category}</strong> • {post.date} • /blog/{post.slug}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                <a
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nm-raised-sm p-2 rounded-[8px] text-muted-foreground hover:text-brand-deep transition-colors"
                  title="View live post"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => handleToggleStatus(post)}
                  className={`nm-raised-sm px-2.5 py-1 rounded-[8px] text-[10.5px] font-bold flex items-center gap-1 ${
                    post.status === "published"
                      ? "text-amber-500 hover:text-amber-600"
                      : "text-green-500 hover:text-green-600"
                  }`}
                  title={post.status === "published" ? "Unpublish to draft" : "Publish article"}
                >
                  {post.status === "published" ? (
                    <>
                      <EyeOff className="h-3 w-3" /> Draft
                    </>
                  ) : (
                    <>
                      <Eye className="h-3 w-3" /> Publish
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => openEditModal(post)}
                  className="nm-raised-sm p-2 rounded-[8px] text-muted-foreground hover:text-brand-deep transition-colors"
                  title="Edit post"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(post.id, post.title)}
                  className="nm-raised-sm p-2 rounded-[8px] text-muted-foreground hover:text-destructive transition-colors"
                  title="Delete post"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </NeumorphicCard>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[24px] bg-surface p-6 shadow-2xl border border-border nm-raised relative space-y-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="nm-raised-sm nm-interactive absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <h3 className="text-[17px] font-extrabold uppercase tracking-wider text-foreground font-display">
              {editingPost ? "Edit Blog Article" : "Create New Blog Article"}
            </h3>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How to Speed Up WordPress Using Caching"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className={fieldClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Slug *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="how-to-speed-up-wordpress"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className="block text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={fieldClass}
                  >
                    <option value="WordPress">WordPress</option>
                    <option value="Elementor">Elementor</option>
                    <option value="WooCommerce">WooCommerce</option>
                    <option value="Performance">Performance</option>
                    <option value="SEO">SEO</option>
                    <option value="Tutorials">Tutorials</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="WordPress, Speed, Cache"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className="block text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Publishing Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as "published" | "draft")}
                    className={fieldClass}
                  >
                    <option value="published">Published (Visible to all)</option>
                    <option value="draft">Draft (Private to owner)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Featured Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                  className={fieldClass}
                />
              </div>

              <div>
                <label className="block text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Short Excerpt *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="A compelling 1-2 sentence preview for the article card..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className={`${fieldClass} resize-none`}
                />
              </div>

              <div>
                <label className="block text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Markdown Content *
                </label>
                <textarea
                  rows={7}
                  required
                  placeholder="Write in Markdown (## Headings, - bullet points, **bold**)..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className={`${fieldClass} resize-none font-mono text-[11px]`}
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="nm-raised-sm px-4 py-2 rounded-[8px] text-[12px] font-bold text-muted-foreground"
                >
                  Cancel
                </button>
                <NeumorphicButton tone="brand" size="md" type="submit">
                  {editingPost ? "Save Article" : "Publish Article"}
                </NeumorphicButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
