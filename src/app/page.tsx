'use client';

import Link from 'next/link';
import { Bot, Search, Scale, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const features = [
  {
    title: 'Upload and Scan',
    description: 'Upload your legal documents for a comprehensive AI-powered analysis.',
    href: '/upload',
    icon: <Scale className="h-10 w-10" />,
  },
  {
    title: 'Mini Lawyer Support',
    description: 'Get instant answers to your legal questions from our AI assistant.',
    href: '/lawyer',
    icon: <Bot className="h-10 w-10" />,
  },
  {
    title: 'See Future',
    description: 'Understand the potential pros, cons, and consequences of your legal actions.',
    href: '/future',
    icon: <Search className="h-10 w-10" />,
  },
  {
    title: 'Spot Trap',
    description: 'Identify risky clauses and unfair terms in your documents.',
    href: '/spot-trap',
    icon: <ShieldCheck className="h-10 w-10" />,
  },
];

export default function Home() {
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
                    Decoding Hidden Agreements & Rewriting with Multilingual Accuracy for Justice, Your Own Trustworthy Insight
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
    </main>
  );
}

function FeatureCard({ title, description, href, icon }: (typeof features)[0]) {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current || isFocused) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setIsFocused(true);
        setOpacity(1);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
      <Link href={href}>
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative h-full w-full overflow-hidden rounded-xl border border-border bg-gradient-to-r from-card to-secondary p-px shadow-lg transition-all duration-300 hover:border-primary/50"
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, hsl(var(--primary)/0.2), transparent 40%)`,
                }}
            />
            <Card className="h-full w-full flex flex-col items-center justify-center text-center p-6 bg-card/80 backdrop-blur-sm">
              <div className="mb-4 text-primary">{icon}</div>
              <CardTitle className="text-xl font-bold">{title}</CardTitle>
              <CardContent className="p-0 mt-2 text-sm text-foreground/70">
                <p>{description}</p>
              </CardContent>
            </Card>
        </div>
      </Link>
    );
}