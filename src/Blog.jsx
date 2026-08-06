import { mediumPosts } from './data';

export default function Blog() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="w-full bg-white shadow-xl rounded-sm p-8 sm:p-12 border-t-8 border-slate-900">
        <h2 className="text-2xl font-bold mb-4 text-slate-800">Blog & Medium Posts</h2>
        <p className="text-slate-700 mb-6">Short essays on frontend patterns, performance, and accessibility.</p>
        <div className="space-y-4">
          {mediumPosts.map((post, i) => (
            <a key={i} href={post.url} target="_blank" rel="noreferrer" className="block p-4 border rounded-md hover:shadow-md transition-shadow bg-white">
              <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
              <p className="text-sm text-slate-500 mt-1">Read on Medium →</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
