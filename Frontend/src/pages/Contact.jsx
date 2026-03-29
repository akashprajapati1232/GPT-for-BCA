import { useState } from 'react';
import '../styles/Contact.css';

const infoItems = [
  {
    icon: '📧',
    title: 'Email Us',
    text: 'akashprajapati1232@gmail.com',
  },
  {
    icon: '🎓',
    title: 'Institution',
    text: 'BCA Department — Academic Year 2023-2026',
  },
  {
    icon: '💻',
    title: 'Developer',
    text: 'github.com/akashprajapati1232',
  },
  {
    icon: '📍',
    title: 'Location',
    text: 'India',
  },
];

const initialForm = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      errs.name = 'Name must be at least 2 characters.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Please enter a valid email address.';
    if (!form.subject.trim() || form.subject.trim().length < 3)
      errs.subject = 'Please enter a subject (min 3 chars).';
    if (!form.message.trim() || form.message.trim().length < 10)
      errs.message = 'Message must be at least 10 characters.';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    // Simulate async submit
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setSubmitted(false);
  };

  return (
    <main className="page-wrapper">
      {/* ===== HERO ===== */}
      <section className="contact-hero">
        <div className="contact-hero-bg"></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-tag">Get In Touch</div>
          <h1>
            We'd Love to <span className="gradient-text">Hear From You</span>
          </h1>
          <p>
            Have questions, suggestions, or want to collaborate? Drop us a message
            and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Info Side */}
            <div className="contact-info">
              <h2 className="contact-info-title">Contact Information</h2>
              <p className="contact-info-desc">
                Reach out to us with any queries about the platform, syllabus, or partnership opportunities.
              </p>
              {infoItems.map((item, i) => (
                <div className="contact-info-item" key={i}>
                  <div className="contact-info-icon">{item.icon}</div>
                  <div className="contact-info-text">
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form Side */}
            <div className="contact-form-wrapper">
              {submitted ? (
                <div className="contact-success">
                  <div className="contact-success-icon">✅</div>
                  <h3>Message Sent Successfully!</h3>
                  <p>
                    Thank you for reaching out, <strong>{form.name}</strong>!<br />
                    We've received your message and will respond to <strong>{form.email}</strong> within 24–48 hours.
                  </p>
                  <button className="btn-primary" onClick={handleReset} id="send-another-btn">
                    ✉️ Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <div className="contact-form-header">
                    <h2>Send a Message</h2>
                    <p>All fields marked with <span style={{ color: 'var(--color-primary-light)' }}>*</span> are required.</p>
                  </div>

                  <form className="contact-form" onSubmit={handleSubmit} noValidate>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="contact-name">
                          Full Name <span>*</span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          className={`form-control ${errors.name ? 'error' : ''}`}
                          placeholder="Akash Prajapati"
                          value={form.name}
                          onChange={handleChange}
                          autoComplete="name"
                        />
                        {errors.name && <span className="form-error">⚠️ {errors.name}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="contact-email">
                          Email Address <span>*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          className={`form-control ${errors.email ? 'error' : ''}`}
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={handleChange}
                          autoComplete="email"
                        />
                        {errors.email && <span className="form-error">⚠️ {errors.email}</span>}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-subject">
                        Subject <span>*</span>
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        name="subject"
                        className={`form-control ${errors.subject ? 'error' : ''}`}
                        placeholder="Question about the syllabus..."
                        value={form.subject}
                        onChange={handleChange}
                      />
                      {errors.subject && <span className="form-error">⚠️ {errors.subject}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-message">
                        Message <span>*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={6}
                        className={`form-control ${errors.message ? 'error' : ''}`}
                        placeholder="Write your message here..."
                        value={form.message}
                        onChange={handleChange}
                      />
                      {errors.message && <span className="form-error">⚠️ {errors.message}</span>}
                    </div>

                    <button
                      type="submit"
                      className="form-submit"
                      id="contact-submit-btn"
                      disabled={loading}
                    >
                      {loading ? (
                        <>⏳ Sending...</>
                      ) : (
                        <>🚀 Send Message</>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
