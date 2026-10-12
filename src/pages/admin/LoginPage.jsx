import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo.jsx';
import { inputClass } from '../../components/form.jsx';
import { isFirebaseConfigured } from '../../lib/firebase.js';
import { useAuth } from './auth.jsx';

export default function LoginPage() {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to="/admin" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = Object.fromEntries(new FormData(e.currentTarget));
    setError('');
    setBusy(true);
    try {
      await signIn(email, password);
      navigate(location.state?.from ?? '/admin', { replace: true });
    } catch {
      setError('Incorrect email or password. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-green-tint p-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex justify-center">
          <Logo className="h-24 w-auto" />
        </div>
        <form onSubmit={onSubmit} className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
          <div>
            <h1 className="text-xl font-extrabold text-brand-blue">Admin sign in</h1>
            <p className="mt-1 text-sm">Staff access only.</p>
          </div>

          {!isFirebaseConfigured && (
            <p className="placeholder">
              Firebase is not connected yet. Follow SETUP-FIREBASE.md in the repo, then sign in here.
            </p>
          )}

          <div>
            <label htmlFor="email" className="block font-bold">
              Email
            </label>
            <input id="email" name="email" type="email" autoComplete="username" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="password" className="block font-bold">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className={inputClass}
            />
          </div>

          <div role="alert">{error && <p className="text-sm font-semibold text-red-700">{error}</p>}</div>

          <button type="submit" className="btn btn-primary w-full disabled:opacity-60" disabled={busy || !isFirebaseConfigured}>
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
