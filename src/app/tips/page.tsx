
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "@/hooks/use-translations";
import { Lightbulb } from "lucide-react";

export default function TipsPage() {
    const t = useTranslations();
    const legalTips = [
        {
            title: t.tips.tip1.title,
            content: t.tips.tip1.content,
        },
        {
            title: t.tips.tip2.title,
            content: t.tips.tip2.content,
        },
        {
            title: t.tips.tip3.title,
            content: t.tips.tip3.content,
        },
        {
            title: t.tips.tip4.title,
            content: t.tips.tip4.content,
        },
        {
            title: t.tips.tip5.title,
            content: t.tips.tip5.content,
        },
        {
            title: t.tips.tip6.title,
            content: t.tips.tip6.content,
        }
    ];

    return (
        <main className="container mx-auto px-4 py-12 md:py-20 lg:py-24">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-4">{t.tips.title}</h1>
                <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
                    {t.tips.subtitle}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {legalTips.map((tip, index) => (
                    <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                        <CardHeader className="flex flex-row items-start gap-4">
                            <div className="p-2 bg-primary/10 rounded-full mt-1">
                                <Lightbulb className="h-6 w-6 text-primary"/>
                            </div>
                            <CardTitle className="text-xl">{tip.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <p className="text-foreground/80">{tip.content}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </main>
    )
}
