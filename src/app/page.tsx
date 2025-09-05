'use client';

import Link from 'next/link';
import { ArrowRight, Bot, Search, Scale, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    href: '/tbd',
    icon: <ShieldCheck className="h-10 w-10" />,
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      <section className="relative w-full py-20 md:py-32 lg:py-40">
        <div className="container px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">
                    DharmaJyoti
                </h1>
                <p className="mt-4 text-lg text-foreground/80 md:text-xl">
                    Your AI-powered legal assistant to help you navigate complex documents with confidence.
                </p>
            </div>
        </div>
      </section>

      <section className="container px-4 md:px-6 pb-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ title, description, href, icon }: (typeof features)[0]) {
    return (
        <div className="group perspective">
          <Link href={href}>
            <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 preserve-3d group-hover:rotate-y-180">
              {/* Front of the card */}
              <div className="absolute inset-0 backface-hidden rounded-xl border bg-card text-card-foreground">
                <Card className="h-full w-full flex flex-col items-center justify-center text-center p-6 bg-transparent border-none">
                  <div className="mb-4 text-primary">{icon}</div>
                  <CardTitle className="text-xl font-bold">{title}</CardTitle>
                  <CardContent className="p-0 mt-2 text-sm text-foreground/70">
                    <p>{description}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Back of the card */}
              <div className="absolute inset-0 backface-hidden rounded-xl border bg-primary text-primary-foreground rotate-y-180">
                <Card className="h-full w-full flex flex-col items-center justify-center text-center p-6 bg-transparent border-none">
                    <div className="mb-4 text-primary-foreground">{icon}</div>
                    <CardTitle className="text-xl font-bold">{title}</CardTitle>
                    <p className="mt-4 text-center">Click to explore this feature</p>
                    <div className="mt-4 flex items-center justify-center text-lg font-semibold">
                        <span>Learn More</span>
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </div>
                </Card>
              </div>
            </div>
          </Link>
        </div>
    );
}