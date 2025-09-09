
import { useState, useRef, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { Volume2, Loader } from 'lucide-react';
import type { Analysis } from '@/app/upload/page';
import { useTranslations } from '@/hooks/use-translations';

interface DocumentAnalysisProps {
  analysis: Analysis | null;
  isLoading: boolean;
}

export function DocumentAnalysis({ analysis, isLoading }: DocumentAnalysisProps) {
  const { toast } = useToast();
  const t = useTranslations();
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const audioDataRef = useRef<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (isLoading) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analysis) {
    return (
      <Card className="shadow-lg flex items-center justify-center h-full">
        <CardContent className="text-center p-6">
          <p className="text-muted-foreground">{t.analysis.noAnalysis}</p>
        </CardContent>
      </Card>
    );
  }
  
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

    if (!analysis || isGeneratingAudio) return;

    setIsGeneratingAudio(true);
    try {
        const textToRead = `
          ${t.analysis.docType}: ${analysis.documentType}.
          ${t.analysis.purpose}: ${analysis.purpose}.
          ${t.analysis.summary}: ${analysis.summary}.
          ${t.analysis.keywords}: ${analysis.keywords.join(', ')}.
        `;
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
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl">{analysis.documentType}</CardTitle>
            <CardDescription>{analysis.purpose}</CardDescription>
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
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">{t.analysis.summary}</h3>
            <p className="whitespace-pre-wrap text-sm text-muted-foreground leading-relaxed">
              {analysis.summary}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">{t.analysis.keywords}</h3>
            <div className="flex flex-wrap gap-2">
              {analysis.keywords.map((keyword, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
