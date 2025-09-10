
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileUploader } from '@/components/file-uploader';
import { ChatPanel } from '@/components/chat/chat-panel';
import { DocumentViewer } from '@/components/document/document-viewer';
import { DocumentAnalysis } from '@/components/document/document-analysis';
import { summarizeUploadedDocument } from '@/ai/flows/summarize-uploaded-document';
import { identifyDocumentTypeAndPurpose } from '@/ai/flows/identify-document-type-and-purpose';
import { interactiveLegalGuidance } from '@/ai/flows/interactive-legal-guidance';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BotMessageSquare, Camera, Upload, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { extractDocumentText } from '@/ai/flows/extract-document-text';
import { useLanguage } from '@/context/language-context';
import { useTranslations } from '@/hooks/use-translations';
import { Progress } from '@/components/ui/progress';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface Analysis {
  summary: string;
  documentType: string;
  purpose: string;
  keywords: string[];
}

const chatSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
});

type ChatForm = z.infer<typeof chatSchema>;

export default function UploadPage() {
  const [document, setDocument] = useState<{ name: string; content: string } | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isChatting, setIsChatting] = useState(false);
  const [view, setView] = useState<'options' | 'camera' | 'upload'>('options');

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { toast } = useToast();
  const { language } = useLanguage();
  const t = useTranslations();
  
  const form = useForm<ChatForm>({
    resolver: zodResolver(chatSchema),
    defaultValues: {
      message: '',
    },
  });

  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        content: t.upload.initialMessage,
      },
    ]);
  }, [t]);
  
  const getCameraPermission = useCallback(async (mode: 'user' | 'environment') => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
      
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: mode } });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: t.toast.cameraDenied,
          description: t.toast.cameraError,
        });
      }
    }, [toast, t]);

  useEffect(() => {
    if (view !== 'camera') {
        if (videoRef.current?.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        return;
    }

    getCameraPermission(facingMode);
    
    return () => {
         if (videoRef.current?.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [view, facingMode, getCameraPermission]);

  const analyzeTextContent = async (textContent: string, fileName: string) => {
    setDocument({ name: fileName, content: textContent });
    setView('upload');
    
    setProgress(50);

    try {
        const [summaryRes, typeRes] = await Promise.all([
            summarizeUploadedDocument({ documentText: textContent, language }),
            identifyDocumentTypeAndPurpose({ documentText: textContent, language }),
        ]);

        setProgress(100);

        if (summaryRes && typeRes) {
            setAnalysis({
                summary: summaryRes.summary,
                documentType: typeRes.documentType,
                purpose: typeRes.purpose,
                keywords: summaryRes.keywords,
            });
            setMessages([
                {
                role: 'assistant',
                content: t.upload.analysisComplete(fileName),
                },
            ]);
        } else {
            throw new Error('Failed to analyze document.');
        }
    } catch(error) {
        console.error(error);
        let description = t.toast.analysisError;
        if (error instanceof Error) {
            if (error.message.includes('429')) {
                description = t.toast.quotaExceeded;
            } else if (error.message.includes('503') || error.message.includes('overloaded')) {
                description = t.toast.serviceUnavailable;
            }
        }
        toast({
            variant: 'destructive',
            title: t.toast.analysisFailed,
            description,
        });
        setDocument(null);
        setAnalysis(null);
    }
  }

  const handleFileLoad = async (file: File) => {
    setIsAnalyzing(true);
    setProgress(0);
    setDocument({ name: file.name, content: t.upload.processing });
    setAnalysis(null);
    setMessages([]);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const dataUri = `data:${file.type};base64,${Buffer.from(arrayBuffer).toString('base64')}`;
      setProgress(25);
      const { text } = await extractDocumentText({ documentDataUri: dataUri });
      await analyzeTextContent(text, file.name);
    } catch (error) {
      console.error(error);
      let description = t.toast.analysisError;
      if (error instanceof Error) {
        if (error.message.includes('429')) {
          description = t.toast.quotaExceeded;
        } else if (error.message.includes('503') || error.message.includes('overloaded')) {
          description = t.toast.serviceUnavailable;
        }
      }
      toast({
        variant: 'destructive',
        title: t.toast.analysisFailed,
        description: description,
      });
      setDocument(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCapture = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    setIsAnalyzing(true);
    setProgress(0);
    const fileName = 'camera_capture.png';
    setDocument({ name: fileName, content: t.upload.processing });
    setAnalysis(null);
    setMessages([]);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    const dataUri = canvas.toDataURL('image/png');

    try {
      setProgress(25);
      const { text } = await extractDocumentText({ documentDataUri: dataUri });
      await analyzeTextContent(text, fileName);
    } catch (error) {
      console.error(error);
      let description = t.toast.cameraAnalysisError;
      if (error instanceof Error) {
        if (error.message.includes('429')) {
          description = t.toast.quotaExceeded;
        } else if (error.message.includes('503') || error.message.includes('overloaded')) {
          description = t.toast.serviceUnavailable;
        }
      }
      toast({
        variant: 'destructive',
        title: t.toast.analysisFailed,
        description: description,
      });
      setDocument(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSendMessage = async (data: ChatForm) => {
    setIsChatting(true);
    const userInput = data.message;
    const newMessages: Message[] = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    form.reset();

    try {
      let guidanceInputText = `The user's question is: "${userInput}"`;
      if (document?.content) {
        guidanceInputText = `The user has uploaded a document with the following content:\n\n---\n${document.content}\n---\n\n${guidanceInputText}`;
      }
      
      const response = await interactiveLegalGuidance({ message: guidanceInputText, language });
      
      if (response) {
        setMessages([...newMessages, { role: 'assistant', content: response }]);
      } else {
         setMessages([...newMessages, { role: 'assistant', content: t.common.error }]);
      }

    } catch (error) {
      console.error(error);
      let errorMessage = t.common.error;
       if (error instanceof Error && (error.message.includes('503') || error.message.includes('overloaded'))) {
        errorMessage = t.toast.serviceUnavailable;
      }
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: errorMessage,
        },
      ]);
    } finally {
      setIsChatting(false);
    }
  };
  
  const handleFlipCamera = () => {
    setFacingMode(prev => (prev === 'user' ? 'environment' : 'user'));
  };

  const renderInitialView = () => (
    <main className="flex h-full items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center p-8">
          <div className="mx-auto mb-4 bg-primary/10 p-4 rounded-full w-fit border border-primary/20">
            <BotMessageSquare className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl">{t.upload.title}</CardTitle>
          <CardDescription>{t.upload.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4 justify-center p-8 pt-0">
          <Button onClick={() => setView('camera')} size="lg" variant="outline">
            <Camera className="mr-2 h-5 w-5" />
            {t.upload.useCamera}
          </Button>
          <Button onClick={() => setView('upload')} size="lg">
            <Upload className="mr-2 h-5 w-5" />
            {t.upload.uploadFile}
          </Button>
        </CardContent>
      </Card>
    </main>
  );

  const renderCameraView = () => (
     <main className="flex h-full items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-lg">
            <CardHeader className="p-8">
                <CardTitle>{t.upload.cameraTitle}</CardTitle>
                <CardDescription>{t.upload.cameraDescription}</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
                <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                    <canvas ref={canvasRef} className="hidden" />
                    {hasCameraPermission === false && (
                         <Alert variant="destructive" className="mt-4">
                            <AlertTitle>{t.toast.cameraDenied}</AlertTitle>
                            <AlertDescription>{t.toast.cameraError}</AlertDescription>
                        </Alert>
                    )}
                </div>
                 <div className="mt-6 flex justify-between">
                    <Button variant="outline" onClick={() => setView('options')}>{t.common.back}</Button>
                    <div className="flex gap-2">
                        <Button onClick={handleFlipCamera} size="icon" variant="outline" className="md:hidden">
                            <RefreshCw className="h-5 w-5" />
                        </Button>
                        <Button onClick={handleCapture} disabled={isAnalyzing || hasCameraPermission !== true}>
                            {isAnalyzing ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {t.common.analyzing}
                            </>
                            ) : t.upload.capture}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
     </main>
  );

  const renderUploadView = () => (
    <main className="flex h-full items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-lg">
            <CardHeader className="text-center p-8">
                <CardTitle className="text-3xl">{t.upload.uploadTitle}</CardTitle>
                <CardDescription>{t.upload.uploadDescription}</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
                <FileUploader onFileLoad={handleFileLoad} disabled={isAnalyzing} />
                 <div className="mt-6 flex justify-start">
                    <Button variant="outline" onClick={() => setView('options')}>{t.common.back}</Button>
                </div>
            </CardContent>
        </Card>
    </main>
  );
  
  const renderMainView = () => {
    if (isAnalyzing) {
        return (
            <main className="flex h-full items-center justify-center p-4">
                <Card className="w-full max-w-2xl shadow-lg text-center">
                    <CardHeader className="p-8">
                        <CardTitle className="text-2xl">{t.common.analyzingDocument}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 pt-0">
                        <p>{t.common.pleaseWait}</p>
                        <Progress value={progress} className="w-full mt-4" />
                        <p className="mt-2 text-sm text-muted-foreground">{progress}%</p>
                    </CardContent>
                </Card>
            </main>
        )
    }

    if (!document) {
      switch(view) {
        case 'camera': return renderCameraView();
        case 'upload': return renderUploadView();
        case 'options':
        default:
          return renderInitialView();
      }
    }
    
    return (
      <main className="grid h-full gap-6 md:grid-cols-2 lg:grid-cols-5 p-4 sm:p-6 md:p-8">
        <div className="flex flex-col gap-4 h-full min-h-[400px] lg:col-span-3">
          <div className='flex justify-between items-center'>
            <h2 className="text-2xl font-semibold">{t.common.documentViewer}</h2>
            <Button variant="outline" onClick={() => {
              setDocument(null);
              setAnalysis(null);
              setView('options');
            }}>{t.upload.uploadNew}</Button>
          </div>
          <DocumentViewer content={document.content} />
        </div>
        <div className="flex flex-col gap-4 h-full min-h-[400px] lg:col-span-2">
          <Tabs defaultValue="analysis" className="flex flex-col h-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="analysis">{t.common.analysis}</TabsTrigger>
              <TabsTrigger value="chat">{t.common.chat}</TabsTrigger>
            </TabsList>
            <TabsContent value="analysis" className="flex-1 overflow-auto">
              <DocumentAnalysis analysis={analysis} isLoading={isAnalyzing} />
            </TabsContent>
            <TabsContent value="chat" className="flex-1 overflow-auto">
              <div className="h-full rounded-lg border bg-card text-card-foreground shadow-sm">
                <ChatPanel
                  messages={messages}
                  isLoading={isChatting}
                  onSendMessage={handleSendMessage}
                  form={form}
                  placeholder={t.upload.chatPlaceholder}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    );
  }

  return (
    <>
      {renderMainView()}
    </>
  );
}
