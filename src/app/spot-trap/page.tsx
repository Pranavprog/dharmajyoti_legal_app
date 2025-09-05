'use client';

import { useState } from 'react';
import { FileUploader } from '@/components/file-uploader';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, FileText, Lightbulb, ShieldCheck, Siren } from 'lucide-react';
import { extractDocumentText } from '@/ai/flows/extract-document-text';
import { spotTraps, SpotTrapsOutput } from '@/ai/flows/spot-trap';
import { Skeleton } from '@/components/ui/skeleton';

export default function SpotTrapPage() {
  const [document, setDocument] = useState<{ name: string; content: string } | null>(null);
  const [analysis, setAnalysis] = useState<SpotTrapsOutput | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleFileLoad = async (file: File) => {
    setIsAnalyzing(true);
    setDocument({ name: file.name, content: 'Processing...' });
    setAnalysis(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const dataUri = `data:${file.type};base64,${Buffer.from(arrayBuffer).toString('base64')}`;
      const { text } = await extractDocumentText({ documentDataUri: dataUri });
      
      setDocument({ name: file.name, content: text });

      const trapResult = await spotTraps({ documentText: text });
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
  
  const renderAnalysisView = () => (
     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
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

  return (
    <main className="container mx-auto px-4 py-12 md:py-20 flex justify-center">
        {!document || (isAnalyzing && !analysis) ? renderInitialView() : renderAnalysisView()}
    </main>
  );
}


function ResultSection({ title, items, icon }: { title: string; items: string[]; icon: React.ReactNode }) {
    if (!items || items.length === 0) {
        return null;
    }

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                    {icon}
                    <span>{title}</span>
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
