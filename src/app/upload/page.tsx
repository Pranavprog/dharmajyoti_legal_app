'use client';

import { useState, useRef, useEffect } from 'react';
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
import { BotMessageSquare, Camera, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { extractDocumentText } from '@/ai/flows/extract-document-text';

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
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hello! I'm DharmaJyoti, your personal legal assistant. Please upload a document or use your camera to begin the analysis.",
    },
  ]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  const [view, setView] = useState<'options' | 'camera' | 'upload'>('options');

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { toast } = useToast();

  const form = useForm<ChatForm>({
    resolver: zodResolver(chatSchema),
    defaultValues: {
      message: '',
    },
  });

  useEffect(() => {
    if (view !== 'camera') {
        if (videoRef.current?.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        return;
    }

    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this app.',
        });
      }
    };
    getCameraPermission();
  }, [view, toast]);

  const analyzeTextContent = async (textContent: string, fileName: string) => {
    setDocument({ name: fileName, content: textContent });
    setView('upload');

    const [summaryRes, typeRes] = await Promise.all([
      summarizeUploadedDocument({ documentText: textContent }),
      identifyDocumentTypeAndPurpose({ documentText: textContent }),
    ]);

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
          content: `I've analyzed your document, "${fileName}". You can see a summary and analysis under the "Analysis" tab. What would you like to know about it?`,
        },
      ]);
    } else {
      throw new Error('Failed to analyze document.');
    }
  }

  const handleFileLoad = async (file: File) => {
    setIsAnalyzing(true);
    setDocument({ name: file.name, content: 'Processing...' });
    setAnalysis(null);
    setMessages([]);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const dataUri = `data:${file.type};base64,${Buffer.from(arrayBuffer).toString('base64')}`;
      const { text } = await extractDocumentText({ documentDataUri: dataUri });
      await analyzeTextContent(text, file.name);
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

  const handleCapture = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    setIsAnalyzing(true);
    setDocument({ name: 'camera_capture.png', content: 'Processing...' });
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
      const { text } = await extractDocumentText({ documentDataUri: dataUri });
      await analyzeTextContent(text, 'camera_capture.png');
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'There was an error analyzing the captured image. Please try again.',
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
      let guidanceInput = userInput;
      if (document?.content) {
        guidanceInput = `The user has uploaded a document with the following content:\n\n---\n${document.content}\n---\n\nThe user's question is: "${userInput}"`;
      }
      
      const response = await interactiveLegalGuidance(guidanceInput);
      
      if (response) {
        setMessages([...newMessages, { role: 'assistant', content: response }]);
      } else {
         setMessages([...newMessages, { role: 'assistant', content: "I'm sorry, I couldn't process that. Could you try rephrasing?" }]);
      }

    } catch (error) {
      console.error(error);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ]);
    } finally {
      setIsChatting(false);
    }
  };

  const renderInitialView = () => (
    <div className="flex h-full items-center justify-center">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 bg-primary/10 p-4 rounded-full w-fit border border-primary/20">
            <BotMessageSquare className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl">Upload & Scan</CardTitle>
          <CardDescription>How would you like to provide your document?</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4 justify-center p-6">
          <Button onClick={() => setView('camera')} size="lg" variant="outline">
            <Camera className="mr-2 h-5 w-5" />
            Use Camera
          </Button>
          <Button onClick={() => setView('upload')} size="lg">
            <Upload className="mr-2 h-5 w-5" />
            Upload File
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderCameraView = () => (
     <div className="flex h-full items-center justify-center">
        <Card className="w-full max-w-2xl shadow-lg">
            <CardHeader>
                <CardTitle>Camera Capture</CardTitle>
                <CardDescription>Position your document in the frame and click capture.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative">
                    <video ref={videoRef} className="w-full aspect-video rounded-md" autoPlay muted playsInline />
                    <canvas ref={canvasRef} className="hidden" />
                    {hasCameraPermission === false && (
                         <Alert variant="destructive" className="mt-4">
                            <AlertTitle>Camera Access Required</AlertTitle>
                            <AlertDescription>
                                Please allow camera access to use this feature. You may need to change permissions in your browser settings.
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
                 <div className="mt-4 flex justify-between">
                    <Button variant="outline" onClick={() => setView('options')}>Back</Button>
                    <Button onClick={handleCapture} disabled={isAnalyzing || hasCameraPermission !== true}>
                        {isAnalyzing ? "Analyzing..." : "Capture"}
                    </Button>
                </div>
            </CardContent>
        </Card>
     </div>
  );

  const renderUploadView = () => (
    <div className="flex h-full items-center justify-center">
        <Card className="w-full max-w-2xl shadow-lg">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl">Upload Document</CardTitle>
                <CardDescription>Select a PDF or TXT file to analyze.</CardDescription>
            </CardHeader>
            <CardContent>
                <FileUploader onFileLoad={handleFileLoad} disabled={isAnalyzing} />
                 <div className="mt-4 flex justify-start">
                    <Button variant="outline" onClick={() => setView('options')}>Back</Button>
                </div>
            </CardContent>
        </Card>
    </div>
  );
  
  const renderMainView = () => {
    if (isAnalyzing && !document?.content.startsWith("Processing")) {
        return (
            <div className="flex h-full items-center justify-center">
                <Card className="w-full max-w-2xl shadow-lg text-center">
                    <CardHeader>
                        <CardTitle>Analyzing Document</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Please wait while we analyze your document...</p>
                        <div className="mt-4 h-2 bg-primary/20 rounded-full overflow-hidden">
                            <div className="h-full bg-primary animate-pulse" style={{ width: '100%' }}></div>
                        </div>
                    </CardContent>
                </Card>
            </div>
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
      <div className="grid h-full gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-4 h-full min-h-[400px]">
          <div className='flex justify-between items-center'>
            <h2 className="text-2xl font-semibold">Document Viewer</h2>
            <Button variant="outline" onClick={() => setDocument(null)}>Upload New</Button>
          </div>
          <DocumentViewer content={document.content} />
        </div>
        <div className="flex flex-col gap-4 h-full min-h-[400px]">
          <Tabs defaultValue="analysis" className="flex flex-col h-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
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
                  placeholder="Ask about your document..."
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full">
      <main className="flex flex-1 flex-col gap-4 overflow-auto bg-background p-4 sm:p-6">
          {renderMainView()}
      </main>
    </div>
  );
}
