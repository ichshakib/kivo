import { useState } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@repo/ui/components/ui/card';
import { Badge } from '@repo/ui/components/ui/badge';
import { Laptop, Sparkles, Layers, Zap, CheckCircle2, Moon, Sun, Monitor } from 'lucide-react';

export function App() {
  const [count, setCount] = useState(0);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div
      className={`min-h-screen bg-background text-foreground transition-colors duration-200 ${isDark ? 'dark' : ''}`}
    >
      {/* Title Bar / Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b bg-background/80 px-6 py-3 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Laptop className="size-5" />
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-tight">Kivo Desktop</h1>
            <p className="text-xs text-muted-foreground">Electron + Vite + Tailwind CSS v4</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1.5 px-2.5 py-0.5 text-xs font-medium">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active App
          </Badge>
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-5xl px-6 py-10">
        {/* Hero Section */}
        <section className="mb-10 text-center">
          <Badge variant="outline" className="mb-4 inline-flex gap-1.5 py-1 px-3 text-xs">
            <Sparkles className="size-3.5 text-amber-500" />
            Desktop Client Ready
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Welcome to Kivo Desktop</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            A native Electron desktop application configured with Vite, React 19, Tailwind CSS v4,
            and shared{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">@repo/ui</code>{' '}
            shadcn components.
          </p>
        </section>

        {/* Interactive Showcase Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Card 1: Interactive Counter */}
          <Card className="shadow-sm transition-all hover:shadow-md">
            <CardHeader>
              <div className="mb-2 flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Zap className="size-4" />
              </div>
              <CardTitle>Interactive State</CardTitle>
              <CardDescription>
                HMR and reactive state management in Electron renderer.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-3">
                <span className="text-sm text-muted-foreground">Current clicks:</span>
                <span className="text-xl font-bold font-mono">{count}</span>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button
                variant="default"
                size="sm"
                className="w-full"
                onClick={() => setCount((c) => c + 1)}
              >
                Increment
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCount(0)}>
                Reset
              </Button>
            </CardFooter>
          </Card>

          {/* Card 2: Shared UI Components */}
          <Card className="shadow-sm transition-all hover:shadow-md">
            <CardHeader>
              <div className="mb-2 flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Layers className="size-4" />
              </div>
              <CardTitle>Shared @repo/ui</CardTitle>
              <CardDescription>
                60+ customizable shadcn design tokens across web and desktop.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="size-4 text-emerald-500" />
                <span>Zero configuration monorepo link</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="size-4 text-emerald-500" />
                <span>Tailwind v4 @source scanning</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="size-4 text-emerald-500" />
                <span>Custom OKLCH theme palette</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" size="sm" className="w-full">
                Explore Components
              </Button>
            </CardFooter>
          </Card>

          {/* Card 3: Electron Capabilities */}
          <Card className="shadow-sm transition-all hover:shadow-md">
            <CardHeader>
              <div className="mb-2 flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Monitor className="size-4" />
              </div>
              <CardTitle>Native Runtime</CardTitle>
              <CardDescription>
                Secure IPC communication with preload & main process.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="rounded-lg border bg-muted/30 p-2.5 text-xs">
                <div className="flex justify-between py-0.5">
                  <span className="text-muted-foreground">Platform:</span>
                  <span className="font-mono font-medium">Electron 30</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-muted-foreground">Renderer:</span>
                  <span className="font-mono font-medium">React 19 + Vite</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-muted-foreground">Styles:</span>
                  <span className="font-mono font-medium">Tailwind CSS 4</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                System Info
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default App;
