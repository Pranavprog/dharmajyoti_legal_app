'use client';

import { useState, useRef } from 'react';
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

export default function SpotTrapPage() {
  const [document, setDocument] = useState<{ name: string; content: string } | null>(null);
  const [analysis, setAnalysis] = useState<SpotTrapsOutput | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();

  const handleFileLoad = async (file: File) => {
    setIsAnalyzing(true);
    setDocument({ name: file.name, content: 'Processing...' });
    setAnalysis(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const dataUri = `data:${file.type};base64,${Buffer.from(arrayBuffer).toString('base64')}`;
      
      setDocument({ name: file.name, content: 'Extracting text from document...' });
      const { text } = await extractDocumentText({ documentDataUri: dataUri });
      
      setDocument({ name: file.name, content: text });

      const trapResult = await spotTraps({ documentText: text, language });
      setAnalysis(trapResult);

    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'There was an error analyzing your document. Please try again.',
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
                    <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl">Spot Trap</CardTitle>
                <CardDescription>Upload your document to identify potential loopholes, problems, and cautionary clauses.</CardDescription>
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
          <CardTitle className="text-2xl">Analyzing Document</CardTitle>
          <CardDescription>Please wait while we scan your document for potential traps. This may take a moment.</CardDescription>
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
                    <CardTitle className="flex items-center gap-3"><FileText /> Document</CardTitle>
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
                    <ResultSection title="Loopholes" items={analysis.loopholes} icon={<Siren className="text-yellow-500" />} />
                    <ResultSection title="Potential Problems" items={analysis.problems} icon={<AlertTriangle className="text-orange-500" />} />
                    <ResultSection title="Cautions" items={analysis.cautions} icon={<Lightbulb className="text-blue-500" />} />
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


function ResultSection({ title, items, icon }: { title: string; items: string[]; icon: React.ReactNode }) {
    if (!items || items.length === 0) {
        return null;
    }
    
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
                <ul className="space-y-4">
                    {items.map((item, index) => (
                        <li key={index} className="border-l-4 border-primary/30 pl-4">
                            <p className="font-semibold text-foreground/90">{item.split(':')[0]}:</p>
                            <p className="text-foreground/80">{item.substring(item.split(':')[0].length + 1)}</p>
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
