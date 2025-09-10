
'use client';

import Link from 'next/link';
import { Bot, Search, ShieldCheck, Star, Upload } from 'lucide-react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { useTranslations } from '@/hooks/use-translations';
import { Guidebot } from '@/components/guidebot';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import SplitText from '@/components/split-text';

export default function Home() {
  const t = useTranslations();

  const features = [
    {
      title: t.home.features.upload.title,
      description: t.home.features.upload.description,
      href: '/upload',
      icon: <Upload className="h-8 w-8 md:h-10 md:w-10" />,
    },
    {
      title: t.home.features.lawyer.title,
      description: t.home.features.lawyer.description,
      href: '/lawyer',
      icon: <Bot className="h-8 w-8 md:h-10 md:w-10" />,
    },
    {
      title: t.home.features.future.title,
      description: t.home.features.future.description,
      href: '/future',
      icon: <Search className="h-8 w-8 md:h-10 md:w-10" />,
    },
    {
      title: t.home.features.trap.title,
      description: t.home.features.trap.description,
      href: '/spot-trap',
      icon: <ShieldCheck className="h-8 w-8 md:h-10 md:w-10" />,
    },
  ];

  return (
    <>
      <main className="flex flex-col items-center">
        <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden">
          <div className="absolute top-0 left-0 -z-10 h-full w-full bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(var(--primary)/0.3),rgba(255,255,255,0))]"></div>
          <div className="container px-4 md:px-6 text-center">
              <div className="max-w-4xl mx-auto">
                  <SplitText
                    text="DHARMAJYOTI"
                    className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-primary"
                    delay={100}
                    duration={0.6}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                    textAlign="center"
                  />
                  <p className="mt-6 text-base md:text-xl text-foreground/80">
                      {t.home.tagline}
                  </p>
              </div>
          </div>
        </section>

        <section className="w-full container px-4 md:px-6 pb-20 md:pb-32">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </section>
        
         <section className="w-full container px-4 md:px-6 pb-20 md:pb-32 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{t.home.review.title}</h2>
          <p className="mx-auto max-w-[700px] text-foreground/80 text-base md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
            {t.home.review.description}
          </p>
          <StarRating />
        </section>
      </main>
      <Guidebot />
    </>
  );
}

function FeatureCard({ title, description, href, icon }: {title: string, description: string, href: string, icon: React.ReactNode}) {
  return (
    <Link href={href} className="group">
      <Card className="h-full bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="flex flex-col items-center justify-center text-center p-6 md:p-8 h-full">
            <div className="mb-4 text-primary">{icon}</div>
            <CardTitle className="text-lg md:text-xl font-bold">
              {title}
            </CardTitle>
            <p className="p-0 mt-2 text-sm text-foreground/70">
              {description}
            </p>
        </CardContent>
      </Card>
    </Link>
  );
}

function StarRating() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const { toast } = useToast();
  const t = useTranslations();

  const handleSubmit = () => {
    toast({
      title: t.home.review.thankYouTitle,
      description: t.home.review.thankYouDescription,
    });
    setRating(0);
    setComment("");
  };

  return (
    <div className="max-w-md mx-auto mt-8 px-4 sm:px-0">
      <div className="flex justify-center gap-2">
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;
          return (
            <button
              type="button"
              key={ratingValue}
              className="transition-transform duration-200 hover:scale-125"
              onClick={() => setRating(ratingValue)}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            >
              <Star
                className={cn(
                  "h-8 w-8 sm:h-10 sm:w-10",
                  ratingValue <= (hover || rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                )}
              />
            </button>
          );
        })}
      </div>
      <div className="mt-6 space-y-4">
        <Textarea
          placeholder={t.home.review.commentPlaceholder}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="bg-card min-h-[120px]"
        />
        <Button onClick={handleSubmit} disabled={rating === 0 && comment.trim() === ''} size="lg">
          {t.home.review.submit}
        </Button>
      </div>
    </div>
  );
}
