import { useAuth } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthModal from '../../context/useAuthModal';

// Reusable link jo chat access se pehle auth check karta hai.
export default function ProtectedChatLink({
  children,
  onClick,
  ...props
}) {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const { openAuthModal } = useAuthModal();

  // Signed-in user ko direct chat bhejo, warna auth modal khol do.
  const handleClick = (event) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    event.preventDefault();

    if (isSignedIn) {
      navigate('/chat');
      return;
    }

    openAuthModal('signin', '/chat');
  };

  return (
    <Link
      to="/chat"
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
}
