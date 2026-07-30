export default function Scientific() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Scientific Portfolio</h1>
      <div className="bg-white p-8 shadow-md rounded-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Publications & Research</h2>
        <ul className="list-disc list-inside text-slate-700 space-y-2">
          <li>Research Paper Title (Year) - Journal Name</li>
          <li>Poster Presentation (Year) - Conference Name</li>
        </ul>
      </div>
    </div>
  );
}