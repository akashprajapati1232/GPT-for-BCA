import { useContext } from 'react';
import AuthModalContext from './authModalStore';

// Custom hook jo auth modal context data safely consume karta hai.
export default function useAuthModal() {
  const context = useContext(AuthModalContext);

  if (!context) {
    throw new Error('useAuthModal must be used within AuthModalProvider');
  }

  return context;
}
