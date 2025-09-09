
'use client';

import { useState, useRef, useEffect } from 'react';
import { FileUploader } from '@/components/file-uploader';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, FileText, Lightbulb, ShieldCheck, Siren, Volume2, Loader } from 'lucide-react';
import { extractDocumentText } from '@/ai/flows/extract-document-text';
import { spotTraps, SpotTrapsOutput } from '@/ai/flows/spot-trap';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';
import { useTranslations } from '@/hooks/use-translations';
import { Progress } from '@/components/ui/progress';

export default function SpotTrapPage() {
  const [document, setDocument] = useState<{ name: string; content: string } | null>(null);
  const [analysis, setAnalysis] = useState<SpotTrapsOutput | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = useTranslations();

  const handleFileLoad = async (file: File) => {
    setIsAnalyzing(true);
    setProgress(0);
    setDocument({ name: file.name, content: t.spotTrap.processing });
    setAnalysis(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const dataUri = `data:${file.type};base64,${Buffer.from(arrayBuffer).toString('base64')}`;
      
      setProgress(25);
      setDocument({ name: file.name, content: t.spotTrap.extracting });
      const { text } = await extractDocumentText({ documentDataUri: dataUri });
      
      setProgress(50);
      setDocument({ name: file.name, content: text });

      setProgress(75);
      setDocument(prev => ({...prev, content: t.spotTrap.loadingDescription}));
      const trapResult = await spotTraps({ documentText: text, language });
      setAnalysis(trapResult);
      setProgress(100);

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
    <main className="w-full max-w-2xl flex justify-center items-center p-4">
        <Card className="shadow-xl">
            <CardHeader className="text-center p-8">
                <div className="mx-auto mb-4 bg-primary/10 p-4 rounded-full w-fit border border-primary/20">
                    <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl">{t.spotTrap.title}</CardTitle>
                <CardDescription>{t.spotTrap.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
                <FileUploader onFileLoad={handleFileLoad} disabled={isAnalyzing} />
            </CardContent>
        </Card>
    </main>
  );
  
  const renderLoadingView = () => (
    <main className="w-full max-w-2xl flex justify-center items-center p-4">
      <Card className="shadow-xl text-center w-full">
        <CardHeader className="p-8">
          <CardTitle className="text-2xl">{t.spotTrap.loadingTitle}</CardTitle>
          <CardDescription>{t.spotTrap.loadingDescription}</CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-0">
            <Progress value={progress} className="w-full" />
            <p className="mt-4 text-sm text-muted-foreground">{document?.content} - {progress}%</p>
        </CardContent>
      </Card>
    </main>
  );

  const renderAnalysisView = () => (
     <main className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl p-4 sm:p-6 md:p-8">
        <div className="md:col-span-1">
            <Card className="shadow-lg sticky top-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><FileText /> {t.common.document}</CardTitle>
                    <CardDescription>{document?.name}</CardDescription>
                </CardHeader>
                <CardContent className="max-h-[60vh] overflow-y-auto">
                    <p className="whitespace-pre-wrap text-sm text-foreground/80">{document?.content}</p>
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-1 space-y-8">
            {isAnalyzing && !analysis ? (
                <AnalysisSkeleton />
            ) : analysis ? (
                <>
                    <ResultSection title={t.spotTrap.loopholes} items={analysis.loopholes} icon={<Siren className="text-yellow-500" />} />
                    <ResultSection title={t.spotTrap.problems} items={analysis.problems} icon={<AlertTriangle className="text-orange-500" />} />
                    <ResultSection title={t.spotTrap.cautions} items={analysis.cautions} icon={<Lightbulb className="text-blue-500" />} />
                </>
            ) : null}
        </div>
     </main>
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
    <div className="container mx-auto px-4 py-12 md:py-20 lg:py-24 flex justify-center">
        {renderContent()}
    </div>
  );
}


function ResultSection({ title, items, icon }: { title: string; items: string[]; icon: React.ReactNode }) {
    if (!items || items.length === 0) {
        return null;
    }
    
    const { toast } = useToast();
    const t = useTranslations();
    const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
    const audioDataRef = useRef<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handlePlayAudio = async () => {
        if (audioRef.current?.src) {
            audioRef.current.play();
            return;
        }

        if (audioDataRef.current) {
            const audio = new Audio(audioDataRef.current);
            audioRef.current = audio;
            audio.play();
            return;
        }

        if (!items || items.length === 0 || isGeneratingAudio) return;

        setIsGeneratingAudio(true);
        try {
            const textToRead = `${title}. ${items.join('. ')}`;
            const response = await textToSpeech(textToRead);
            const dataUri = response.media;
            audioDataRef.current = dataUri;
            const audio = new Audio(dataUri);
            audioRef.current = audio;
            audio.play();
        } catch (error) {
            console.error('Error generating audio:', error);
            let description = t.toast.audioError;
            if (error instanceof Error && (error.message.includes('503') || error.message.includes('overloaded'))) {
                description = t.toast.serviceUnavailable;
            }
            toast({
                variant: 'destructive',
                title: t.toast.audioFailed,
                description,
            });
        } finally {
            setIsGeneratingAudio(false);
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
                <ul className="space-y-4">
                    {items.map((item, index) => (
                        <li key={index} className="border-l-4 border-primary/30 pl-4 py-2">
                            <p className="font-semibold text-foreground/90">{item.split(':')[0]}:</p>
                            <p className="text-foreground/80 mt-1">{item.substring(item.split(':')[0].length + 1)}</p>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}

function AnalysisSkeleton() {
    return (
        <div className="space-y-8">
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
