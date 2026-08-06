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
    </div>
  );
}