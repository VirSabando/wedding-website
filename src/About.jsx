import { cvData } from './data';

export default function About() {
  const paragraphs = cvData.about.split('\n').filter(p => p.trim());

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-6">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">About Me</h1>
        {paragraphs.map((para, i) => (
          <p key={i} className="text-slate-700 leading-relaxed">
            {para.trim()}
          </p>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-5 gap-4">
        {cvData.stats.map((stat, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center p-5 rounded-2xl bg-white shadow-sm border border-slate-100 transition-transform duration-200 hover:scale-105 cursor-default"
          >
            <span className="text-4xl font-extrabold tracking-tight text-slate-900">{stat.value}</span>
            <span className="mt-2 text-xs text-slate-500 uppercase tracking-wide leading-snug">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
