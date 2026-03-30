import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Syllabus from './pages/Syllabus';
import ChatPage from './pages/ChatPage';
import AuthModal from './components/auth/AuthModal';
import { AuthModalProvider, useAuthModal } from './context/AuthModalContext';
import './styles/global.css';

function ChatAuthRedirect() {
  const { openAuthModal } = useAuthModal();

  useEffect(() => {
    openAuthModal('signin', '/chat');
  }, [openAuthModal]);

  return <Navigate to="/" replace />;
}

function AppRoutes() {
  const location = useLocation();
  const isChatPage = location.pathname.startsWith('/chat');

  return (
    <>
      <ScrollToTop />
      {!isChatPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/syllabus" element={<Syllabus />} />
        <Route
          path="/chat"
          element={(
            <>
              <SignedIn>
                <ChatPage />
              </SignedIn>
              <SignedOut>
                <ChatAuthRedirect />
              </SignedOut>
            </>
          )}
        />
        {/* Catch-all → Home */}
        <Route path="*" element={<Home />} />
      </Routes>
      {!isChatPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthModalProvider>
        <AppRoutes />
        <AuthModal />
      </AuthModalProvider>
    </Router>
  );
}

export default App;
