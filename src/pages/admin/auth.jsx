import { createContext, useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getAuthInstance, isFirebaseConfigured } from '../../lib/firebase.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);

  useEffect(() => {
    if (!isFirebaseConfigured) return undefined;
    let unsubscribe = () => {};
    Promise.all([getAuthInstance(), import('firebase/auth')]).then(([auth, { onAuthStateChanged }]) => {
      unsubscribe = onAuthStateChanged(auth, (u) => {
        setUser(u);
        setLoading(false);
      });
    });
    return () => unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    const [auth, { signInWithEmailAndPassword }] = await Promise.all([getAuthInstance(), import('firebase/auth')]);
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signOut = async () => {
    const [auth, { signOut: fbSignOut }] = await Promise.all([getAuthInstance(), import('firebase/auth')]);
    await fbSignOut(auth);
  };

  return <AuthContext.Provider value={{ user, loading, signIn, signOut }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

/** Sends signed-out visitors to the admin login page. */
export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <p role="status" className="p-8 text-center">
        Checking access…
      </p>
    );
  }
  if (!user) return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  return children;
}
