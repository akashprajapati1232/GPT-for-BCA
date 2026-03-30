import { createContext, useContext, useMemo, useState } from 'react';

const AuthModalContext = createContext(null);

export function AuthModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('signin');
  const [redirectTo, setRedirectTo] = useState('/chat');

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

export function useAuthModal() {
  const context = useContext(AuthModalContext);

  if (!context) {
    throw new Error('useAuthModal must be used within AuthModalProvider');
  }

  return context;
}
