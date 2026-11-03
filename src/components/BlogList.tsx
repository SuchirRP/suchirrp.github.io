import { useState } from 'react';

export interface PostSummary {
  slug: string;
  title: string;
  summary: string;
  isoDate: string;
  date: string;
  meta: string;
  pinned: boolean;
}

export default function BlogList({ posts }: { posts: PostSummary[] }) {
  const [query, setQuery] = useState('');
  const [newestFirst, setNewestFirst] = useState(true);

  if (posts.length === 0) {
    return (
      <section className="blog-section">
        <div className="empty-state">
          <p>No posts yet.</p>
        </div>
      </section>
    );
  }

  const needle = query.trim().toLowerCase();
  const searching = needle !== '';
  const pinned = posts.find((post) => post.pinned);
  const visible = posts
    .filter((post) => (searching ? post.title.toLowerCase().includes(needle) : post !== pinned))
    .sort((a, b) => (newestFirst ? b.isoDate.localeCompare(a.isoDate) : a.isoDate.localeCompare(b.isoDate)));
  const count = searching ? visible.length : posts.length;
  const countLabel = `${count} ${count === 1 ? 'post' : 'posts'}${searching ? ' found' : ''}`;

  return (
    <>
      {pinned && !searching && (
        <section className="pinned" aria-label="Pinned post">
          <p className="label">Pinned</p>
          <h2>
            <a href={`/blog/${pinned.slug}/`}>{pinned.title}</a>
          </h2>
          <p className="pinned-summary">{pinned.summary}</p>
          <p className="mono-meta">
            {pinned.date} · {pinned.meta}
          </p>
        </section>
      )}

      <section className="blog-section" aria-labelledby="all-posts">
        <h2 id="all-posts" className="sr-only">
          All posts
        </h2>
        <div className="blog-controls">
          <div className="search">
            <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#A7B2C6" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-4-4" />
            </svg>
            <label htmlFor="post-search" className="sr-only">
              Search posts by title
            </label>
            <input
              id="post-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search posts by title"
            />
          </div>
          <button type="button" className="pill-button" onClick={() => setNewestFirst(!newestFirst)}>
            {newestFirst ? 'Newest first ↓' : 'Oldest first ↑'}
          </button>
        </div>

        <p className="mono-meta post-count" aria-live="polite">
          {countLabel}
        </p>

        {visible.map((post) => (
          <article className="post-row" key={post.slug}>
            <div className="post-row-date mono-meta">{post.date}</div>
            <div className="post-row-body">
              <h3>
                <a href={`/blog/${post.slug}/`}>{post.title}</a>
              </h3>
              <p className="post-row-summary">{post.summary}</p>
              <p className="mono-meta">{post.meta}</p>
            </div>
          </article>
        ))}

        {searching && visible.length === 0 && (
          <div className="empty-state">
            <p>No posts with that title.</p>
            <button type="button" className="pill-button" onClick={() => setQuery('')}>
              Clear search
            </button>
          </div>
        )}
      </section>
    </>
  );
}
