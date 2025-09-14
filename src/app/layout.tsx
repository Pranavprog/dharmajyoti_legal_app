'use client';

import type { Metadata } from 'next';
import { PT_Sans, Lora } from 'next/font/google';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';

import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { LanguageProvider } from '@/context/language-context';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useTranslations } from '@/hooks/use-translations';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';

const fontSans = PT_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '700'],
});

const fontLora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
});

// AppLayout is a Client Component because it uses client-side hooks
function AppLayout({ children }: { children: ReactNode }) {
  const t = useTranslations();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getLinkClass = (path: string) => {
    return pathname === path ? 'text-foreground font-semibold' : 'text-foreground/60';
  };

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/tips', label: t.nav.tips },
  ];

  return (
    <div className={cn("min-h-screen bg-background antialiased flex flex-col", fontSans.variable, fontLora.variable)}>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center">
              <Logo />
            </Link>
            <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
              {navLinks.map(link => (
                  <Link key={link.href} href={link.href} className={`transition-colors hover:text-foreground/80 ${getLinkClass(link.href)}`}>{link.label}</Link>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-4">
              <LanguageSwitcher />
              <Button asChild>
                <Link href="/upload">{t.nav.getStarted}</Link>
              </Button>
          </div>

          <div className="flex items-center md:hidden">
                 <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[80vw]">
                        <div className="flex flex-col h-full">
                            <div className="flex justify-between items-center mb-8">
                                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Logo />
                                </Link>
                                <SheetClose asChild>
                                    <Button variant="ghost" size="icon">
                                        <X className="h-6 w-6" />
                                        <span className="sr-only">Close menu</span>
                                    </Button>
                                </SheetClose>
                            </div>
                            <nav className="flex flex-col gap-6 text-lg font-medium">
                                {navLinks.map(link => (
                                     <Link key={link.href} href={link.href} className={`transition-colors hover:text-foreground/80 ${getLinkClass(link.href)}`} onClick={() => setIsMobileMenuOpen(false)}>
                                        {link.label}
                                     </Link>
                                ))}
                            </nav>
                            <div className="mt-auto space-y-6">
                                <LanguageSwitcher />
                                <Button asChild className="w-full" size="lg">
                                  <Link href="/upload" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.getStarted}</Link>
                                </Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <Toaster />
    </div>
  );
}


// RootLayout is a Server Component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>DharmaJyoti - Your AI-powered legal assistant.</title>
        <meta name="description" content="Decoding Hidden Agreements & Rewriting with Multilingual Accuracy for Justice, Your Own Trustworthy Insight" />
      </head>
      <body>
        <LanguageProvider>
          <AppLayout>{children}</AppLayout>
        </LanguageProvider>
      </body>
    </html>
  );
}
