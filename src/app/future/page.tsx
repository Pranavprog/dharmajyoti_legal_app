
'use client';

import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileUploader } from '@/components/file-uploader';
import { extractDocumentText } from '@/ai/flows/extract-document-text';
import { generateFutureScenarios, GenerateFutureScenariosOutput } from '@/ai/flows/generate-future-scenarios';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { Skeleton } from '@/components/ui/skeleton';
import { ThumbsUp, ThumbsDown, Lightbulb, Search, FileText, Volume2, Loader } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { useTranslations } from '@/hooks/use-translations';

export default function FuturePage() {
    const [document, setDocument] = useState<{ name: string; content: string } | null>(null);
    const [analysis, setAnalysis] = useState<GenerateFutureScenariosOutput | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const { toast } = useToast();
    const { language } = useLanguage();
    const t = useTranslations();

    const handleFileLoad = async (file: File) => {
        setIsAnalyzing(true);
        setDocument({ name: file.name, content: t.future.processing });
        setAnalysis(null);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const dataUri = `data:${file.type};base64,${Buffer.from(arrayBuffer).toString('base64')}`;

            setDocument({ name: file.name, content: t.future.extracting });
            const { text } = await extractDocumentText({ documentDataUri: dataUri });
            setDocument({ name: file.name, content: text });
            
            setDocument(prev => ({ ...prev, name: prev.name, content: t.future.generating }));
            const scenarios = await generateFutureScenarios({ documentText: text, language });
            setAnalysis(scenarios);

        } catch (error) {
            console.error(error);
            toast({
                variant: 'destructive',
                title: t.toast.analysisFailed,
                description: t.toast.analysisError,
            });
            setDocument(null);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const renderInitialView = () => (
        <div className="w-full max-w-2xl">
            <Card className="shadow-xl">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 bg-primary/10 p-4 rounded-full w-fit border border-primary/20">
                        <Search className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-3xl">{t.future.title}</CardTitle>
                    <CardDescription>{t.future.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <FileUploader onFileLoad={handleFileLoad} disabled={isAnalyzing} />
                </CardContent>
            </Card>
        </div>
    );
    
    const renderLoadingView = () => (
        <div className="w-full max-w-2xl">
            <Card className="shadow-xl text-center">
                <CardHeader>
                    <CardTitle className="text-2xl">{t.future.loadingTitle}</CardTitle>
                    <CardDescription>{t.future.loadingDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
                        <div className="h-full bg-primary animate-pulse" style={{ width: '100%' }}></div>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">{document?.content}</p>
                </CardContent>
            </Card>
        </div>
    );

    const renderAnalysisView = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl">
            <div className="md:col-span-1">
                <Card className="shadow-lg sticky top-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3"><FileText /> {t.common.document}</CardTitle>
                        <CardDescription>{document?.name}</CardDescription>
                    </CardHeader>
                    <CardContent className="max-h-[60vh] overflow-y-auto">
                        <p className="whitespace-pre-wrap text-sm text-foreground/80">{document?.content.startsWith(t.future.generating) ? t.common.analysisInProgress : document?.content}</p>
                    </CardContent>
                </Card>
            </div>
            <div className="md:col-span-1 space-y-8">
                {isAnalyzing && !analysis ? (
                    <AnalysisSkeleton />
                ) : analysis ? (
                    <>
                        <ScenarioCard
                            title={t.future.bestCase}
                            content={analysis.bestCase}
                            icon={<ThumbsUp className="text-green-500" />}
                        />
                        <ScenarioCard
                            title={t.future.worstCase}
                            content={analysis.worstCase}
                            icon={<ThumbsDown className="text-red-500" />}
                        />
                         <ScenarioCard
                            title={t.future.advice}
                            content={analysis.advice}
                            icon={<Lightbulb className="text-yellow-500" />}
                        />
                    </>
                ) : null}
            </div>
        </div>
    );

    const renderContent = () => {
        if (isAnalyzing) {
          return renderLoadingView();
        }
        if (!document) {
          return renderInitialView();
        }
        return renderAnalysisView();
    }

    return (
        <main className="container mx-auto px-4 py-12 md:py-20 flex justify-center">
            {renderContent()}
        </main>
    );
}

function ScenarioCard({ title, content, icon }: { title: string, content: string, icon: React.ReactNode }) {
    const { toast } = useToast();
    const t = useTranslations();
    const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
    const audioDataRef = useRef<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const generateAudio = async () => {
            if (!content) return;
            setIsGeneratingAudio(true);
            try {
                const textToRead = `${title}. ${content}`;
                const response = await textToSpeech(textToRead);
                audioDataRef.current = response.media;
            } catch (error) {
                console.error('Error pre-generating audio:', error);
            } finally {
                setIsGeneratingAudio(false);
            }
        };
        generateAudio();
    }, [content, title]);

    const handlePlayAudio = () => {
        if (audioRef.current && audioDataRef.current && audioRef.current.src === audioDataRef.current) {
            audioRef.current.play();
            return;
        }

        if (audioDataRef.current) {
            const audio = new Audio(audioDataRef.current);
            audioRef.current = audio;
            audio.play();
        } else if (!isGeneratingAudio) {
             toast({
                variant: 'destructive',
                title: t.toast.audioFailed,
                description: t.toast.audioError,
            });
        }
    };

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
                        onClick={handlePlayAudio}
                        disabled={isGeneratingAudio}
                        aria-label={t.common.listen}
                    >
                        {isGeneratingAudio ? <Loader className="h-5 w-5 animate-spin" /> : <Volume2 className="h-5 w-5" />}
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-foreground/90 leading-relaxed">{content}</p>
            </CardContent>
        </Card>
    );
}

function AnalysisSkeleton() {
    return (
        <div className="space-y-8">
            {[1, 2, 3].map(i => (
                <Card key={i} className="shadow-lg">
                    <CardHeader>
                        <Skeleton className="h-8 w-1/3" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-5/6" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
