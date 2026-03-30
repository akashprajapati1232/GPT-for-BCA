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
import { AuthModalProvider } from './context/AuthModalContext';
import useAuthModal from './context/useAuthModal';
import './styles/global.css';

// Agar unauthenticated user direct /chat khole to modal open karke home par fallback karte hain.
function ChatAuthRedirect() {
  const { openAuthModal } = useAuthModal();

  useEffect(() => {
    openAuthModal('signin', '/chat');
  }, [openAuthModal]);

  return <Navigate to="/" replace />;
}

// Route level layout control: chat page par navbar/footer hide, baaki pages par show.
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
        {/* Unknown route aaye to user ko home par bhej do. */}
        <Route path="*" element={<Home />} />
      </Routes>
      {!isChatPage && <Footer />}
    </>
  );
}

// Top-level app wrapper jahan router + auth modal context attach hota hai.
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
