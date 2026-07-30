export default function Portfolio() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Web Portfolio</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Placeholder for a project card */}
        <div className="bg-white p-6 shadow-md rounded-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-2">Project Name</h2>
          <p className="text-slate-600 mb-4">A brief description of the web app you built.</p>
          <button className="text-blue-600 font-medium hover:underline">View Live</button>
        </div>
      </div>
    </div>
  );
}