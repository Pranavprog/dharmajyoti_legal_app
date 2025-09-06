
'use client';

import Link from 'next/link';
import { Bot, Search, Scale, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { useTranslations } from '@/hooks/use-translations';
import { Guidebot } from '@/components/guidebot';

export default function Home() {
  const t = useTranslations();

  const features = [
    {
      title: t.home.features.upload.title,
      description: t.home.features.upload.description,
      href: '/upload',
      icon: <Scale className="h-10 w-10" />,
    },
    {
      title: t.home.features.lawyer.title,
      description: t.home.features.lawyer.description,
      href: '/lawyer',
      icon: <Bot className="h-10 w-10" />,
    },
    {
      title: t.home.features.future.title,
      description: t.home.features.future.description,
      href: '/future',
      icon: <Search className="h-10 w-10" />,
    },
    {
      title: t.home.features.trap.title,
      description: t.home.features.trap.description,
      href: '/spot-trap',
      icon: <ShieldCheck className="h-10 w-10" />,
    },
  ];

  return (
    <main className="flex-1">
      <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden">
        <div className="absolute top-0 left-0 -z-10 h-full w-full bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(var(--primary)/0.3),rgba(255,255,255,0))]"></div>
        <div className="container px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">
                    DharmaJyoti
                </h1>
                <p className="mt-4 text-lg text-foreground/80 md:text-xl">
                    {t.home.tagline}
                </p>
            </div>
        </div>
      </section>

      <section className="container px-4 md:px-6 pb-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>
      <Guidebot />
    </main>
  );
}

function FeatureCard({ title, description, href, icon }: {title: string, description: string, href: string, icon: React.ReactNode}) {
  return (
    <Link href={href} className="group">
      <Card className="h-full bg-card/80 backdrop-blur-sm shadow-lg transition-transform duration-300 group-hover:scale-105 neon-glow">
        <div className="card-content-inner flex flex-col items-center justify-center text-center p-6 h-full">
            <div className="mb-4 text-primary">{icon}</div>
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
            <CardContent className="p-0 mt-2 text-sm text-foreground/70">
              <p>{description}</p>
            </CardContent>
        </div>
      </Card>
    </Link>
  );
}
