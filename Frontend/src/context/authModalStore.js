import { createContext } from 'react';

// Yeh shared context object hai jise provider aur custom hook dono reuse karte hain.
const AuthModalContext = createContext(null);

export default AuthModalContext;
