
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "@/hooks/use-translations";
import { Target } from "lucide-react";
import Image from 'next/image';

export default function AboutPage() {
    const t = useTranslations();

    return (
        <main className="container mx-auto px-4 py-12 md:py-20 lg:py-24">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-4">{t.about.title}</h1>
                    <p className="text-lg md:text-xl text-foreground/80">
                        {t.about.subtitle}
                    </p>
                </div>

                <Card className="shadow-xl">
                    <CardHeader>
                        <div className="flex justify-center mb-4">
                            <div className="bg-primary/10 p-4 rounded-full border border-primary/20 w-16 h-16 flex items-center justify-center">
                                <Target className="h-8 w-8 text-primary" />
                            </div>
                        </div>
                        <CardTitle className="text-center text-3xl">{t.about.missionTitle}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-lg text-foreground/90 space-y-6 text-center leading-relaxed max-w-3xl mx-auto">
                        <p>
                            {t.about.missionP1}
                        </p>
                        <p>
                            {t.about.missionP2}
                        </p>
                        <p>
                           {t.about.missionP3}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}
