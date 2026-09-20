import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export function App() {
  const [email, setEmail] = useState('');
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('Continue with email:', email);
    }
  };

  return (
    <div
      className={`min-h-screen bg-[#111111] text-[#ededed] flex flex-col justify-between selection:bg-blue-500/30 selection:text-white transition-colors duration-200 ${isDark ? 'dark' : ''}`}
    >
      {/* Top Header Bar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] bg-[#141414]/80 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-lg bg-white/10 text-white border border-white/10 shadow-sm">
            <span className="font-bold text-sm">K</span>
          </div>
          <span className="text-xs font-medium text-white/70 tracking-wide">Kivo Desktop</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg text-white/50 hover:text-white/90 hover:bg-white/[0.06] transition-colors"
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-[420px] flex flex-col items-center">
          {/* Logo Badge */}
          <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-[#202020] border border-white/10 shadow-lg shadow-black/40">
            <span className="text-xl font-bold font-mono text-white tracking-tighter">K</span>
          </div>

          {/* Heading & Subtitle */}
          <h1 className="text-2xl font-bold tracking-tight text-white text-center mb-1.5">
            Your AI workspace.
          </h1>
          <p className="text-sm text-[#9b9b9b] text-center mb-8 font-normal">
            Log in to your Kivo account
          </p>

          {/* Form */}
          <form onSubmit={handleContinue} className="w-full">
            <div className="mb-4">
              <label
                htmlFor="email-input"
                className="block text-xs font-semibold text-[#8b8b8b] mb-2 uppercase tracking-wider"
              >
                Email
              </label>
              <input
                id="email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                required
                className="w-full h-11 px-3.5 rounded-lg bg-[#222222]/80 border border-white/[0.12] text-sm text-white placeholder:text-[#666666] focus:outline-none focus:ring-2 focus:ring-[#0085FF]/50 focus:border-[#0085FF] transition-all"
              />
              <p className="text-xs text-[#707070] mt-2 leading-relaxed">
                Use an organization email to easily collaborate with teammates
              </p>
            </div>

            <button
              type="submit"
              className="w-full h-11 rounded-lg bg-[#0085FF] hover:bg-[#0073e6] active:bg-[#0062c4] text-white font-medium text-sm transition-all shadow-md shadow-blue-500/10 cursor-pointer flex items-center justify-center"
            >
              Continue
            </button>
          </form>

          {/* Divider */}
          <div className="relative w-full my-7 flex items-center justify-center">
            <div className="border-t border-white/[0.08] w-full" />
            <span className="bg-[#111111] px-3.5 text-xs text-[#6e6e6e] absolute">
              or continue with
            </span>
          </div>

          {/* OAuth & Auth Buttons Grid */}
          <div className="w-full space-y-2.5">
            {/* Row 1: Google, Apple, Microsoft */}
            <div className="grid grid-cols-3 gap-2.5">
              {/* Google */}
              <button
                type="button"
                className="flex flex-col items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#1c1c1c] border border-white/[0.08] hover:bg-[#252525] hover:border-white/[0.16] active:scale-[0.98] transition-all cursor-pointer group shadow-sm"
              >
                <svg className="size-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span className="text-xs font-medium text-[#d4d4d4] group-hover:text-white">
                  Google
                </span>
              </button>

              {/* Apple */}
              <button
                type="button"
                className="flex flex-col items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#1c1c1c] border border-white/[0.08] hover:bg-[#252525] hover:border-white/[0.16] active:scale-[0.98] transition-all cursor-pointer group shadow-sm"
              >
                <svg className="size-5 fill-current text-white" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.59-7.79-11.72-14.25-6.25-9.8-11.08-20.73-14.48-32.8-3.4-12.07-5.1-23.36-5.1-33.87 0-14.25 3.69-26.04 11.08-35.37 7.39-9.33 16.59-14.12 27.6-14.38 4.8 0 10.33 1.25 16.59 3.75 6.26 2.5 10.35 3.8 12.27 3.89 1.57 0 5.86-1.39 12.87-4.17 7.01-2.78 12.82-3.95 17.43-3.5 13.04.88 23.34 5.92 30.89 15.12-11.45 6.94-17.06 16.51-16.83 28.71.22 9.58 3.96 17.65 11.22 24.21 7.26 6.56 15.93 10.23 26.02 11.01-2.01 6.18-4.63 12.56-7.87 19.14zM119.22 33.15c0-7.17 2.62-13.88 7.87-20.12 5.25-6.24 11.75-10.25 19.5-12.03.35 1.5.53 2.92.53 4.25 0 7.17-2.7 13.88-8.1 20.12-5.4 6.25-11.99 10.13-19.79 11.64-.02-1.32-.01-2.6-.01-3.86z" />
                </svg>
                <span className="text-xs font-medium text-[#d4d4d4] group-hover:text-white">
                  Apple
                </span>
              </button>

              {/* Microsoft */}
              <button
                type="button"
                className="flex flex-col items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#1c1c1c] border border-white/[0.08] hover:bg-[#252525] hover:border-white/[0.16] active:scale-[0.98] transition-all cursor-pointer group shadow-sm"
              >
                <svg className="size-5" viewBox="0 0 23 23">
                  <path fill="#f25022" d="M1 1h10v10H1z" />
                  <path fill="#00a4ef" d="M1 12h10v10H1z" />
                  <path fill="#7fba00" d="M12 1h10v10H12z" />
                  <path fill="#ffb900" d="M12 12h10v10H12z" />
                </svg>
                <span className="text-xs font-medium text-[#d4d4d4] group-hover:text-white">
                  Microsoft
                </span>
              </button>
            </div>

            {/* Row 2: Passkey & SSO */}
            <div className="grid grid-cols-2 gap-2.5 max-w-[280px] mx-auto">
              {/* Passkey */}
              <button
                type="button"
                className="flex flex-col items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#1c1c1c] border border-white/[0.08] hover:bg-[#252525] hover:border-white/[0.16] active:scale-[0.98] transition-all cursor-pointer group shadow-sm"
              >
                <svg
                  className="size-5 text-white stroke-current fill-none stroke-[1.75]"
                  viewBox="0 0 24 24"
                >
                  <circle cx="9" cy="8" r="4" />
                  <path d="M17 11v6m0-3h3m-3 3h2" strokeLinecap="round" strokeLinejoin="round" />
                  <path
                    d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-xs font-medium text-[#d4d4d4] group-hover:text-white">
                  Passkey
                </span>
              </button>

              {/* SSO */}
              <button
                type="button"
                className="flex flex-col items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#1c1c1c] border border-white/[0.08] hover:bg-[#252525] hover:border-white/[0.16] active:scale-[0.98] transition-all cursor-pointer group shadow-sm"
              >
                <svg
                  className="size-5 text-white stroke-current fill-none stroke-[1.75]"
                  viewBox="0 0 24 24"
                >
                  <rect x="4" y="2" width="16" height="20" rx="2" strokeLinecap="round" />
                  <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" strokeLinecap="round" />
                </svg>
                <span className="text-xs font-medium text-[#d4d4d4] group-hover:text-white">
                  SSO
                </span>
              </button>
            </div>
          </div>

          {/* Footer Disclaimer */}
          <p className="text-center text-xs text-[#666666] mt-8 leading-relaxed max-w-xs">
            By continuing, you acknowledge that you understand and agree to the{' '}
            <a href="#" className="underline text-[#888888] hover:text-white transition-colors">
              Terms &amp; Conditions
            </a>{' '}
            and{' '}
            <a href="#" className="underline text-[#888888] hover:text-white transition-colors">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;

