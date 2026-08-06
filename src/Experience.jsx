import { cvData } from './data';

export default function Experience() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="w-full bg-white shadow-xl rounded-sm p-8 sm:p-12 border-t-8 border-slate-900">
        <h2 className="text-2xl font-bold mb-4 text-slate-800">Experience</h2>
        <p className="text-slate-700 mb-8">Roles and accomplishments across companies I've worked with.</p>
        
        <div className="relative">
                  
          <div className="absolute left-8 top-0 w-1 h-full bg-gradient-to-b from-slate-300 to-slate-100" />
          
          <div className="space-y-10">
            {cvData.experience.map((company, companyIndex) => (
              
              
              <div key={companyIndex} className="relative pl-16 pt-2">
                
            
                <div className="absolute left-[26px] top-2 w-4 h-4 bg-slate-900 rounded-full border-4 border-white shadow-md" />
                
                {/* Company section */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{company.company}</h3>
                  
                  {/* Roles under company */}
                  <div className="space-y-6 mt-4">
                    {company.roles.map((job, roleIndex) => (
                      <div key={roleIndex} className="pl-4">
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                          <p className="text-sm font-semibold text-slate-900">{job.role}</p>
                          <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">{job.duration}</p>
                        </div>
                        <p className="text-slate-700 leading-relaxed mt-2">{job.shortDesc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}