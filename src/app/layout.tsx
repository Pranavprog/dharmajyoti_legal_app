
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
import { Lora, PT_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const fontSans = PT_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '700'],
});

const fontLora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
});


function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = useTranslations();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getLinkClass = (path: string) => {
    return pathname === path ? 'text-foreground font-semibold' : 'text-foreground/60';
  };

  const isFullHeightPage = ['/upload', '/lawyer'].includes(pathname);

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/tips', label: t.nav.tips },
  ];

  return (
    <div className={cn(
        "min-h-screen bg-background font-sans antialiased flex flex-col",
        fontSans.variable,
        fontLora.variable
      )}>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4 md:px-6">
          <Link href="/" className="mr-6 flex items-center">
            <Logo />
          </Link>
          
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex flex-1 justify-center">
            {navLinks.map(link => (
                <Link key={link.href} href={link.href} className={`transition-colors hover:text-foreground/80 ${getLinkClass(link.href)}`}>{link.label}</Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4 ml-auto">
              <LanguageSwitcher />
              <Button asChild>
                <Link href="/upload">{t.nav.getStarted}</Link>
              </Button>
          </div>

          <div className="ml-auto flex items-center md:hidden">
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
      <div className={cn("flex-1", isFullHeightPage && "h-[calc(100vh-4rem)]")}>
        {children}
      </div>
      <Toaster />
    </div>
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <LanguageProvider>
          <AppLayout>{children}</AppLayout>
        </LanguageProvider>
      </body>
    </html>
  );
}
