import { useState, useRef, useEffect } from 'react';

const EMAIL_ADDRESS = 'virsabando@gmail.com';

export default function Contact() {
  const [readyAt] = useState(() => Date.now());
  const formRef = useRef(null);
  const honeypotRef = useRef(null);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.action = `https://formsubmit.co/${EMAIL_ADDRESS}`;
    }
  }, []);

  function handleSubmit(event) {
    if (honeypotRef.current?.value) {
      event.preventDefault();
      return;
    }
    if (Date.now() - readyAt < 800) {
      event.preventDefault();
      return;
    }
  }

  return (
    <div className="contact-shell px-4 sm:px-6">
      <div className="contact-card bg-slate-950 text-white rounded-[2rem] p-8 shadow-[0_32px_80px_rgba(15,23,42,0.35)] border border-white/10 grid gap-8 lg:grid-cols-[1.9fr_1fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Get In Touch</p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-white">Have a project in mind or just want to chat? Feel free to reach out.</h1>
          <p className="mt-5 max-w-2xl text-slate-400 leading-8">Please leave your name, email, and a brief message. I’ll reply promptly and the form is protected against bots using a hidden honeypot and timing checks.</p>

          <form ref={formRef} method="POST" onSubmit={handleSubmit} className="mt-10 space-y-4">
            <input type="hidden" name="_subject" value="New message from portfolio site" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value="/" />
            <input type="text" name="_honey" ref={honeypotRef} className="hidden" autoComplete="off" tabIndex={-1} />
            <input type="hidden" name="timestamp" value={readyAt.toString()} />

            <label className="block">
              <span className="sr-only">Your Name</span>
              <input
                name="name"
                type="text"
                required
                placeholder="Your Name"
                autoComplete="name"
                className="contact-input"
              />
            </label>

            <label className="block">
              <span className="sr-only">Your Email</span>
              <input
                name="email"
                type="email"
                required
                placeholder="Your Email"
                autoComplete="email"
                className="contact-input"
              />
            </label>

            <label className="block">
              <span className="sr-only">Your Message</span>
              <textarea
                name="message"
                rows={6}
                required
                placeholder="Your Message"
                className="contact-textarea"
              />
            </label>

            <button type="submit" className="contact-submit">Send Message</button>
          </form>
        </div>

        <aside className="contact-panel bg-white/5 rounded-[2rem] p-8 border border-white/10 shadow-inner flex flex-col justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Connect with me</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="contact-icon">G</span>
              <span className="contact-icon">T</span>
              <span className="contact-icon">L</span>
            </div>
          </div>

          <div className="mt-10 rounded-[1.5rem] bg-white/5 p-6 border border-white/10">
            <p className="text-slate-400 text-sm uppercase tracking-[0.25em]">Or email me at:</p>
            <a href={`mailto:${EMAIL_ADDRESS}`} className="mt-4 block text-white text-base font-semibold hover:text-blue-300">{EMAIL_ADDRESS}</a>
          </div>
        </aside>
      </div>
    </div>
  );
}