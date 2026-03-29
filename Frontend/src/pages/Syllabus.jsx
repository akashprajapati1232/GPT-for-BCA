import { useState } from 'react';
import syllabusData from '../data/syllabusData';
import '../styles/Syllabus.css';

const subjectIcons = ['📘', '📗', '📙', '📕', '📓', '📔'];

function SubjectCard({ subject, index }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`subject-card ${open ? 'open' : ''}`}>
      <div
        className="subject-header"
        onClick={() => setOpen(!open)}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setOpen(!open)}
        aria-expanded={open}
      >
        <div className="subject-icon">{subjectIcons[index % subjectIcons.length]}</div>
        <span className="subject-name">{subject.name}</span>
        <span className="subject-toggle">▼</span>
      </div>

      <div className="subject-units">
        <div className="subject-units-inner">
          {subject.units.map((unit, ui) => (
            <div className="unit-item" key={ui}>
              <div className="unit-dot"></div>
              <span>{unit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SemCard({ sem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`sem-card ${open ? 'open' : ''}`}>
      <div
        className="sem-header"
        onClick={() => setOpen(!open)}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setOpen(!open)}
        aria-expanded={open}
        id={`sem-${sem.semester}-header`}
      >
        <div className="sem-badge">{sem.semester}</div>
        <div className="sem-header-info">
          <h2>{sem.title}</h2>
          <span className="sem-subject-count">{sem.subjects.length} Subjects</span>
        </div>
        <div className="sem-header-right">
          <a
            href={sem.pdf}
            download
            className="sem-download-btn"
            onClick={e => e.stopPropagation()}
            title={`Download ${sem.title} PDF`}
            id={`download-sem-${sem.semester}`}
          >
            📥 <span>Download PDF</span>
          </a>
          <div className="sem-chevron">▼</div>
        </div>
      </div>

      <div className="sem-body" aria-labelledby={`sem-${sem.semester}-header`}>
        <div className="sem-body-inner">
          {sem.subjects.map((subject, si) => (
            <SubjectCard key={si} subject={subject} index={si} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Syllabus() {
  const [search, setSearch] = useState('');

  const filtered = syllabusData.filter(sem =>
    sem.title.toLowerCase().includes(search.toLowerCase()) ||
    sem.subjects.some(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.units.some(u => u.toLowerCase().includes(search.toLowerCase()))
    )
  );

  return (
    <main className="page-wrapper">
      {/* ===== HERO ===== */}
      <section className="syllabus-hero">
        <div className="syllabus-hero-bg"></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-tag">BCA Curriculum</div>
          <h1>
            Complete BCA <span className="gradient-text">Syllabus</span>
          </h1>
          <p>
            Semester-wise structured syllabus for all 6 semesters of the Bachelor of Computer
            Applications program. Expand any semester to see subjects and unit details.
          </p>

          <div className="syllabus-hero-actions">
            <a
              href="/pdfs/all-semesters.pdf"
              download
              className="download-all-btn"
              id="download-all-pdf"
            >
              📥 Download Full Syllabus PDF
            </a>
          </div>

          {/* Search */}
          <div style={{ marginTop: '24px' }}>
            <div className="syllabus-filter">
              <span className="syllabus-filter-icon">🔍</span>
              <input
                type="text"
                placeholder="Search subjects, topics..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                id="syllabus-search"
                aria-label="Search syllabus"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== SYLLABUS LIST ===== */}
      <section className="syllabus-section">
        <div className="container">
          {filtered.length > 0 ? (
            <div className="syllabus-list">
              {filtered.map(sem => (
                <SemCard key={sem.semester} sem={sem} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--color-text-muted)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>No results found</h3>
              <p>Try searching for a subject name or topic.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
