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
            target="_blank"
            rel="noopener noreferrer"
            className="sem-download-btn"
            onClick={e => e.stopPropagation()}
            title={`View ${sem.title} PDF`}
            id={`view-sem-${sem.semester}`}
          >
            👁️ <span>View Syllabus</span>
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
            <a
              href="/pdfs/all-semesters.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="download-all-btn view-all-btn"
              id="view-all-pdf"
            >
              👁️ View Full Syllabus
            </a>
          </div>

          {/* Warning Note */}
          <div className="syllabus-warning">
            ⚠️ <strong>Note:</strong> The syllabus may change over time. Always verify with your institution for the latest updates.
          </div>
        </div>
      </section>

      {/* ===== SYLLABUS LIST ===== */}
      <section className="syllabus-section">
        <div className="container">
          {syllabusData.length > 0 ? (
            <div className="syllabus-list">
              {syllabusData.map(sem => (
                <SemCard key={sem.semester} sem={sem} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--color-text-muted)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📚</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>No syllabus data found</h3>
              <p>Please check back later.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
