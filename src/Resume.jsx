import { cvData } from './data';

export default function Resume() {
  return (
    <div className="px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-sm p-8 sm:p-12 border-t-8 border-slate-900">
        
        <header className="border-b border-slate-200 pb-8 mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            {cvData.name}
          </h1>
          <p className="text-xl text-slate-600 mt-3 font-medium">
            {cvData.title}
          </p>
          <p className="text-sm text-slate-500 mt-2 font-mono">
            {cvData.contact}
          </p>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">Professional Profile</h2>
          <p className="text-slate-700 leading-relaxed">
            {cvData.about}
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6 text-slate-800">Experience</h2>
          <div className="space-y-8">
            {cvData.experience.map((job, index) => (
              <div key={index} className="group">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                  <h3 className="text-lg font-bold text-slate-900">{job.role}</h3>
                  <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full w-fit sm:mt-0 mt-2">
                    {job.duration}
                  </span>
                </div>
                <div className="text-md font-semibold text-slate-600 mb-3">
                  {job.company}
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {job.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-5 text-slate-800">Core Skills</h2>
          <div className="flex flex-wrap gap-2">
            {cvData.skills.map((skill, index) => (
              <span 
                key={index} 
                className="bg-slate-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-700 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}