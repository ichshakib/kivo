import { Button } from '@repo/ui/components/ui/button';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-zinc-50 p-6 text-zinc-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-50 sm:p-12 md:p-20">
      {/* Background Decorative Gradients */}
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center overflow-hidden opacity-30 blur-3xl dark:opacity-20">
        <div className="h-96 w-96 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-600" />
        <div className="h-80 w-80 -translate-x-20 translate-y-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600" />
      </div>

      {/* Main Container */}
      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3.5 py-1.5 text-xs font-medium text-sky-600 backdrop-blur-md dark:border-sky-400/30 dark:bg-sky-400/10 dark:text-sky-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500" />
          </span>
          Tailwind CSS v4 is Working
        </div>

        {/* Hero Title & Subtitle */}
        <h1 className="mt-8 text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
          Welcome to <span className="bg-gradient-to-r from-sky-500 via-indigo-500 to-teal-400 bg-clip-text text-transparent">Kivo</span>
        </h1>
        <p className="mt-4 max-w-2xl text-base text-zinc-600 dark:text-zinc-400 sm:text-lg md:text-xl">
          Distraction-free document editing and synchronized writing workspace powered by Next.js and Tailwind CSS.
        </p>

        {/* Feature Demonstration Grid */}
        <div className="mt-12 grid w-full grid-cols-1 gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
          <div className="group rounded-2xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-sky-500/40 hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-900/70">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-xl text-sky-600 dark:bg-sky-400/10 dark:text-sky-400">
              ✍️
            </div>
            <h2 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Rich Text Editor
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Tiptap and ProseMirror powered editing with Markdown, syntax code blocks, and formatting.
            </p>
          </div>

          <div className="group rounded-2xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-900/70">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-xl text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400">
              ⚡
            </div>
            <h2 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Turborepo Monorepo
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Synchronized cross-platform packages sharing design tokens, UI components, and configs.
            </p>
          </div>

          <div className="group rounded-2xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-md sm:col-span-2 lg:col-span-1 dark:border-zinc-800/80 dark:bg-zinc-900/70">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-xl text-teal-600 dark:bg-teal-400/10 dark:text-teal-400">
              🎨
            </div>
            <h2 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Tailwind CSS v4
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Instant CSS builds via PostCSS plugin, modern cascade layers, and fluid responsive design.
            </p>
          </div>
        </div>

        {/* Action Buttons using shadcn Button from @repo/ui */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" className="rounded-xl font-medium shadow-sm active:scale-95">
            Explore Editor
          </Button>
          <Button variant="outline" size="lg" className="rounded-xl font-medium shadow-sm backdrop-blur-md active:scale-95">
            shadcn Component Ready
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-12 text-xs text-zinc-500 dark:text-zinc-500">
        Kivo Document Workspace · Built with Next.js & Tailwind CSS
      </footer>
    </div>
  );
}
