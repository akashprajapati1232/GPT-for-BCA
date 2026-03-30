import { useAuth } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthModal } from '../../context/AuthModalContext';

export default function ProtectedChatLink({
  children,
  onClick,
  ...props
}) {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const { openAuthModal } = useAuthModal();

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
