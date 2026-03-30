import { useMemo, useState } from 'react';
import AuthModalContext from './authModalStore';

export function AuthModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('signin');
  const [redirectTo, setRedirectTo] = useState('/chat');

  // Modal open karte waqt mode (signin/signup) aur post-auth redirect set karte hain.
  const openAuthModal = (nextMode = 'signin', nextRedirect = '/chat') => {
    setMode(nextMode);
    setRedirectTo(nextRedirect);
    setIsOpen(true);
  };

  const closeAuthModal = () => {
    setIsOpen(false);
  };

  const value = useMemo(
    () => ({
      isOpen,
      mode,
      redirectTo,
      setMode,
      openAuthModal,
      closeAuthModal,
    }),
    [isOpen, mode, redirectTo],
  );

  return (
    <AuthModalContext.Provider value={value}>
      {children}
    </AuthModalContext.Provider>
  );
}
