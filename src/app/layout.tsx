import type {Metadata} from 'next';
import Link from 'next/link';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'DharmaJyoti',
  description: 'Your AI-powered legal assistant.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Lora:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
                <Link href="/" className="mr-8">
                    <Logo />
                </Link>
                <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
                    <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground">Home</Link>
                    <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">About</Link>
                    <Link href="/tips" className="transition-colors hover:text-foreground/80 text-foreground/60">Tips</Link>
                </nav>
                <div className="flex flex-1 items-center justify-end">
                    <Button asChild>
                        <Link href="/upload">Get Started</Link>
                    </Button>
                </div>
            </div>
        </header>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
