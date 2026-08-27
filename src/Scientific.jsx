import { scientificItems } from './data';

export default function Scientific() {
  return (
    <div className="max-w-6xl mx-auto px-4 w-full" style={{ boxSizing: 'border-box' }}>
      <div className="bg-white w-full p-6 shadow-md rounded-sm border-t-8 border-slate-900">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Publications & Research</h2>
        <p className="text-slate-700 mb-8 sci-intro">Research is a lifelong passion of mine. Here is a curated list of papers and my PhD thesis, grouped by research topic.</p>

        <div className="sci-categories">
          {scientificItems.map((group) => (
            <section key={group.id} className="sci-category" aria-labelledby={group.id}>
              <h3 id={group.id} className="sci-category-title">{group.category}</h3>
              {group.items.length > 0 ? (
                <ul className="sci-list" role="list">
                  {group.items.map((item) => (
                    <li key={item.id} className="sci-list-item">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="sci-paper-link"
                      >
                        {item.title}
                      </a>
                      <p className="sci-paper-note">{item.note}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="sci-empty">No entries yet.</p>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}