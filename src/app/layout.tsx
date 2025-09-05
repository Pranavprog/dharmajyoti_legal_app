'use client';

import Link from 'next/link';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { LanguageProvider } from '@/context/language-context';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useTranslations } from '@/hooks/use-translations';
import { usePathname } from 'next/navigation';

function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = useTranslations();
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    return pathname === path ? 'text-foreground' : 'text-foreground/60';
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="mr-8">
            <Logo />
          </Link>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            <Link href="/" className={`transition-colors hover:text-foreground/80 ${getLinkClass('/')}`}>{t.nav.home}</Link>
            <Link href="/about" className={`transition-colors hover:text-foreground/80 ${getLinkClass('/about')}`}>{t.nav.about}</Link>
            <Link href="/tips" className={`transition-colors hover:text-foreground/80 ${getLinkClass('/tips')}`}>{t.nav.tips}</Link>
          </nav>
          <div className="flex flex-1 items-center justify-end gap-4">
            <LanguageSwitcher />
            <Button asChild>
              <Link href="/upload">{t.nav.getStarted}</Link>
            </Button>
          </div>
        </div>
      </header>
      {children}
      <Toaster />
    </>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>DharmaJyoti - Your AI-powered legal assistant.</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Lora:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <LanguageProvider>
          <AppLayout>{children}</AppLayout>
        </LanguageProvider>
      </body>
    </html>
  );
}
