import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Route change hote hi page ko smooth way me top par le aata hai.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}
