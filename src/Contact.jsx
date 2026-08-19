const EMAIL_ADDRESS = 'virsabando@gmail.com';

export default function Contact() {
  return (
    <div className="contact-shell px-6 sm:px-10">
      <div className="contact-card text-slate-900 dark:text-white rounded-[2rem] p-8 sm:p-12 flex flex-col items-center gap-8 text-center">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-600 dark:text-slate-300">Get In Touch</p>
          <h1 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">Want to connect or collaborate? Reach out!</h1>
        </div>

        <div className="w-full">
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://github.com/VirSabando" target="_blank" rel="noreferrer" className="contact-icon" aria-label="GitHub">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.838 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.603-3.369-1.342-3.369-1.342-.455-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.607.069-.607 1.004.071 1.532 1.032 1.532 1.032.892 1.529 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.22-.252-4.555-1.111-4.555-4.945 0-1.091.39-1.983 1.029-2.68-.103-.253-.447-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.338 1.909-1.294 2.748-1.025 2.748-1.025.547 1.377.203 2.394.1 2.647.64.697 1.028 1.589 1.028 2.68 0 3.842-2.338 4.69-4.566 4.937.36.309.682.92.682 1.856 0 1.338-.012 2.419-.012 2.748 0 .268.18.58.688.482A10.002 10.002 0 0022 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/vir-sabando/" target="_blank" rel="noreferrer" className="contact-icon" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8.5h5V24H0V8.5zm7.5 0h4.8v2.16h.07c.67-1.27 2.3-2.61 4.73-2.61 5.06 0 6 3.33 6 7.66V24h-5v-7.43c0-1.77-.03-4.04-2.46-4.04-2.46 0-2.84 1.92-2.84 3.91V24h-5V8.5z" />
              </svg>
            </a>
            <a href="https://scholar.google.com/citations?user=4Jz8LscAAAAJ&hl" target="_blank" rel="noreferrer" className="contact-icon" aria-label="Google Scholar">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                <path d="M2 6l10-4 10 4-10 4L2 6zm10 2.5l6.5-2.6L12 4 5.5 5.9 12 8.5zM12 12.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
              </svg>
            </a>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-700 dark:text-slate-200">My resume is available on demand or on LinkedIn.</p>
        </div>

        <div className="w-full border-t border-black/10 dark:border-white/10 pt-6">
          <p className="text-slate-700 dark:text-slate-200 text-sm uppercase tracking-[0.25em]">Email</p>
          <a href={`mailto:${EMAIL_ADDRESS}`} className="mt-3 inline-block text-slate-900 dark:text-white text-lg font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200">{EMAIL_ADDRESS}</a>
        </div>
      </div>
    </div>
  );
}
