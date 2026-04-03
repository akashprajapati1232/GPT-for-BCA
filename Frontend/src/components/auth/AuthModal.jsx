import { useEffect } from 'react';
import { SignIn, SignUp, useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import useAuthModal from '../../context/useAuthModal';
import '../../styles/AuthModal.css';

// Clerk widget appearance map taaki modal theme project ke UI se match kare.
const clerkAppearance = {
  variables: {
    colorPrimary: '#6366f1',
    colorText: '#f1f5f9',
    colorTextSecondary: '#94a3b8',
    colorBackground: '#0f0f2e',
    colorInputBackground: 'rgba(255, 255, 255, 0.08)',
    colorInputText: '#f1f5f9',
    borderRadius: '12px',
    fontFamily: 'Inter, sans-serif',
  },
  elements: {
    // Root wrapper — must be 100% wide so card doesn't overflow
    rootBox: {
      className: 'auth-modal-clerk-root',
      style: { width: '100%', display: 'block' },
    },
    card: {
      className: 'auth-modal-clerk-card',
      style: { width: '100%', maxWidth: '100%', minWidth: 0 },
    },
    headerTitle: 'auth-modal-clerk-title',
    headerSubtitle: 'auth-modal-clerk-subtitle',
    formButtonPrimary: 'auth-modal-clerk-primary-btn',
    formFieldInput: 'auth-modal-clerk-input',
    formFieldLabel: 'auth-modal-clerk-label',
    formFieldErrorText: 'auth-modal-clerk-error',
    formFieldHintText: 'auth-modal-clerk-hint',
    // OTP: only apply the specific OTP class, not the regular input class
    otpCodeFieldInput: 'auth-modal-clerk-otp-input',
    socialButtonsBlockButton: 'auth-modal-clerk-social-btn',
    socialButtonsBlockButtonText: 'auth-modal-clerk-social-btn-text',
    dividerText: 'auth-modal-clerk-divider-text',
    dividerLine: 'auth-modal-clerk-divider-line',
    identityPreviewText: 'auth-modal-clerk-identity-text',
    footerAction: 'auth-modal-clerk-footer',
    footerActionLink: 'auth-modal-clerk-footer-link',
  },
};

export default function AuthModal() {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const {
    isOpen,
    mode,
    redirectTo,
    setMode,
    closeAuthModal,
  } = useAuthModal();

  // Modal open hote hi body scroll lock + ESC close shortcut enable karte hain.
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeAuthModal();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, closeAuthModal]);

  // User login hote hi modal band karke target page par redirect karte hain.
  useEffect(() => {
    if (!isOpen || !isSignedIn) {
      return;
    }

    closeAuthModal();
    navigate(redirectTo, { replace: true });
  }, [isOpen, isSignedIn, redirectTo, navigate, closeAuthModal]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="auth-modal-layer" role="dialog" aria-modal="true" aria-label="Authentication">
      <button
        type="button"
        className="auth-modal-backdrop"
        onClick={closeAuthModal}
        aria-label="Close login modal"
      />

      <div className="auth-modal-panel">
        {/* ── Sticky header — always visible, never scrolls away ── */}
        <div className="auth-modal-head">
          <button
            type="button"
            className="auth-modal-close"
            onClick={closeAuthModal}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* ── Scrollable body — only this region overflows ── */}
        <div className="auth-modal-body">
          <div className="auth-modal-content">
            <div className="auth-modal-form-wrap">
              <div className="auth-modal-switch">
                <button
                  type="button"
                  className={mode === 'signin' ? 'active' : ''}
                  onClick={() => setMode('signin')}
                >
                  Login
                </button>
                <button
                  type="button"
                  className={mode === 'signup' ? 'active' : ''}
                  onClick={() => setMode('signup')}
                >
                  Sign Up
                </button>
              </div>

              <div className="auth-modal-form">
                {mode === 'signin' ? (
                  <SignIn
                    routing="virtual"
                    forceRedirectUrl={redirectTo}
                    fallbackRedirectUrl={redirectTo}
                    appearance={clerkAppearance}
                  />
                ) : (
                  <SignUp
                    routing="virtual"
                    forceRedirectUrl={redirectTo}
                    fallbackRedirectUrl={redirectTo}
                    appearance={clerkAppearance}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
