import React, { useState } from 'react';
import { Lock, ShieldCheck, KeyRound, AlertCircle } from 'lucide-react';
import { CMSContentStore } from '../cmsContentStore';

interface AdminAuthModalProps {
  onSuccess: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError('Please enter the administrator password.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    setTimeout(() => {
      const isValid = CMSContentStore.authenticate(password, remember);
      if (isValid) {
        onSuccess();
      } else {
        setError('Incorrect password. Default is "catzt2026".');
        setIsSubmitting(false);
      }
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="w-full max-w-md bg-[#181818] border border-gray-800/80 rounded-2xl p-7 shadow-2xl shadow-black/80">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-3 shadow-lg shadow-amber-400/10">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            Catzt Kinetic CMS
          </h2>
          <p className="text-xs text-gray-400 mt-1 max-w-xs">
            Visual Content Management System for Ultra Catzt Landing. Enter admin PIN or Master Password to unlock.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 text-xs text-red-400 bg-red-950/50 border border-red-800/60 p-3 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center justify-between">
              <span>Admin Master Password / PIN</span>
              <span className="text-[10px] text-gray-500">Default: catzt2026</span>
            </label>
            <div className="relative">
              <input
                type="password"
                autoFocus
                placeholder="Enter password..."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                className="w-full bg-[#111111] border border-gray-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 pl-10 tracking-wide"
              />
              <KeyRound className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="rounded bg-[#111111] border-gray-700 text-amber-400 focus:ring-0 focus:ring-offset-0"
              />
              <span>Remember this session</span>
            </label>
            <span className="text-[11px] text-gray-500">Local Protected</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-black font-semibold py-3 px-4 rounded-xl transition duration-150 shadow-lg shadow-amber-400/20 active:scale-[0.99] disabled:opacity-50"
          >
            <ShieldCheck className="w-4 h-4" />
            {isSubmitting ? 'Verifying...' : 'Unlock CMS Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};
