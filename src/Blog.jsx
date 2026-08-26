import { mediumPosts } from './data';

export default function Blog() {
  const hasPosts = mediumPosts.length > 0;

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="w-full bg-white shadow-xl rounded-sm p-8 sm:p-12 border-t-8 border-slate-900">
        <h2 className="text-2xl font-bold mb-4 text-slate-800">Blog & Medium Posts</h2>
        <p className="text-slate-700 mb-6">I sometimes share my PoV on current trends, challenges and opportunities in the Solution Architecture field in the era of AI-everything. In case you want to pick my brain, you can find me on Medium 😉</p>
        {hasPosts ? (
          <div className="space-y-4">
            {mediumPosts.map((post, i) => (
              <a key={i} href={post.url} target="_blank" rel="noreferrer" className="block p-4 border rounded-md hover:shadow-md transition-shadow bg-white">
                <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
                <p className="text-sm text-slate-500 mt-1">Read on Medium →</p>
              </a>
            ))}
          </div>
        ) : (
          <div className="blog-empty-state flex flex-col items-center justify-center text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 sm:py-14 dark:border-white/10 dark:bg-slate-800/80">
            <div className="text-4xl sm:text-5xl" aria-hidden="true">🕳️</div>
            <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">Nothing to see here yet</h3>
            <p className="mt-2 max-w-md text-slate-600 dark:text-slate-300">The blog is still waiting for its first post. Check back soon for something better than a blank page.</p>
          </div>
        )}
      </div>
    </div>
  );
}
