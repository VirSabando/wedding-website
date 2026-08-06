import { cvData } from './data';

export default function Experience() {
  return (
    <div className="px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-sm p-8 sm:p-12 border-t-8 border-slate-900">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">Experience</h2>
        <div className="space-y-8">
          {cvData.experience.map((job, index) => (
            <div key={index} className="group">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                <h3 className="text-lg font-bold text-slate-900">{job.role}</h3>
                <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full w-fit sm:mt-0 mt-2">{job.duration}</span>
              </div>
              <div className="text-md font-semibold text-slate-600 mb-3">{job.company}</div>
              <p className="text-slate-700 leading-relaxed">{job.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
