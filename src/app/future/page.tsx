'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, CheckCircle, ThumbsDown, ThumbsUp, Volume2, Loader } from 'lucide-react';
import { listProsConsConsequencesOfAction, ListProsConsConsequencesOfActionOutput } from '@/ai/flows/list-pros-cons-consequences-of-action';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  action: z.string().min(10, {
    message: "Please describe the action in at least 10 characters.",
  }),
  context: z.string().optional(),
});

type FutureForm = z.infer<typeof formSchema>;

export default function FuturePage() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<ListProsConsConsequencesOfActionOutput | null>(null);

    const form = useForm<FutureForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            action: "",
            context: "",
        },
    });

    async function onSubmit(values: FutureForm) {
        setIsLoading(true);
        setResult(null);
        try {
            const res = await listProsConsConsequencesOfAction(values);
            setResult(res);
        } catch (error) {
            console.error("Error analyzing action:", error);
            // You can add a toast notification here to inform the user
        }
        setIsLoading(false);
    }

    return (
        <main className="container mx-auto px-4 py-12 md:py-20">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-4">See the Future</h1>
                    <p className="text-lg md:text-xl text-foreground/80">
                        Analyze the potential outcomes of your legal actions.
                    </p>
                </div>

                <Card className="shadow-xl">
                    <CardHeader>
                        <CardTitle>Describe the Action</CardTitle>
                        <CardDescription>
                            Explain the action you're considering, like "signing a new lease agreement" or "starting a new business partnership". Provide any extra context for a better analysis.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="action"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Action</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="e.g., Signing a 12-month commercial lease for an office space..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="context"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Additional Context (Optional)</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="e.g., The lease is for a small retail business. I have concerns about the break clause." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? "Analyzing..." : "See Future"}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>

                {isLoading && <ResultSkeleton />}
                {result && <AnalysisResult result={result} />}

            </div>
        </main>
    );
}

function AnalysisResult({ result }: { result: ListProsConsConsequencesOfActionOutput }) {
    return (
        <div className="mt-12 space-y-8">
            <ResultSection title="Pros" items={result.pros} icon={<ThumbsUp className="text-green-500"/>} color="green" />
            <ResultSection title="Cons" items={result.cons} icon={<ThumbsDown className="text-red-500"/>} color="red" />
            <ResultSection title="Potential Consequences" items={result.consequences} icon={<CheckCircle className="text-blue-500"/>} color="blue" />
        </div>
    );
}

function ResultSection({ title, items, icon, color }: { title: string; items: string[]; icon: React.ReactNode, color: string }) {
    const { toast } = useToast();
    const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
    const [audioData, setAudioData] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handlePlayAudio = async (text: string) => {
        if (audioData) {
            if (audioRef.current) {
                audioRef.current.play();
            }
            return;
        }

        setIsGeneratingAudio(true);
        try {
            const response = await textToSpeech(text);
            const newAudioData = response.media;
            setAudioData(newAudioData);

            const audio = new Audio(newAudioData);
            audioRef.current = audio;
            audio.play();

        } catch (error) {
            console.error('Error generating audio:', error);
            toast({
                variant: 'destructive',
                title: 'Audio Generation Failed',
                description: 'Could not generate audio for this section.',
            });
        } finally {
            setIsGeneratingAudio(false);
        }
    };

    const textToRead = `${title}. ${items.join('. ')}`;

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center justify-between gap-3 text-2xl">
                    <div className="flex items-center gap-3">
                        {icon}
                        <span>{title}</span>
                    </div>
                     <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handlePlayAudio(textToRead)}
                        disabled={isGeneratingAudio}
                        aria-label="Listen to this section"
                    >
                        {isGeneratingAudio ? <Loader className="h-5 w-5 animate-spin" /> : <Volume2 className="h-5 w-5" />}
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3">
                    {items.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <div className="mt-1">{icon}</div>
                            <span className="text-foreground/90">{item}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}

function ResultSkeleton() {
    return (
        <div className="mt-12 space-y-8">
            {[1,2,3].map(i => (
                <Card key={i} className="shadow-lg">
                    <CardHeader>
                        <Skeleton className="h-8 w-1/3" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-5/6" />
                        <Skeleton className="h-6 w-3/4" />
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
