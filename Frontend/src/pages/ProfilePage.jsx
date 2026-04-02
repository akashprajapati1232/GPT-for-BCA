import { UserProfile } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfilePage.css';

export default function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="profile-page">
      {/* Back bar */}
      <header className="profile-page-header">
        <button
          type="button"
          className="profile-back-btn"
          onClick={() => navigate('/chat')}
          aria-label="Back to chat"
        >
          <span className="profile-back-icon">←</span>
          Back to Chat
        </button>
        <h1 className="profile-page-title">My Profile</h1>
      </header>

      {/* Clerk UserProfile embedded */}
      <div className="profile-clerk-wrapper">
        <UserProfile
          appearance={{
            variables: {
              colorPrimary: '#6366f1',
              colorBackground: '#0f0f2e',
              colorInputBackground: '#1a1a3e',
              colorInputText: '#f1f5f9',
              colorText: '#f1f5f9',
              colorTextSecondary: '#94a3b8',
              colorNeutral: '#64748b',
              borderRadius: '12px',
              fontFamily: 'Inter, sans-serif',
            },
            elements: {
              rootBox: 'clerk-root-box',
              card: 'clerk-card',
              navbar: 'clerk-navbar',
              navbarButton: 'clerk-navbar-btn',
              navbarButtonIcon: 'clerk-navbar-btn-icon',
              pageScrollBox: 'clerk-page-scroll',
              headerTitle: 'clerk-header-title',
              headerSubtitle: 'clerk-header-subtitle',
              formButtonPrimary: 'clerk-btn-primary',
              formFieldInput: 'clerk-field-input',
              formFieldLabel: 'clerk-field-label',
              identityPreviewText: 'clerk-identity-text',
              identityPreviewEditButton: 'clerk-identity-edit-btn',
              profileSectionTitle: 'clerk-section-title',
              profileSectionContent: 'clerk-section-content',
              accordionTriggerButton: 'clerk-accordion-trigger',
              badge: 'clerk-badge',
              avatarBox: 'clerk-avatar-box',
              avatarImageActionsUpload: 'clerk-avatar-upload',
              dividerLine: 'clerk-divider',
            },
          }}
        />
      </div>
    </div>
  );
}
