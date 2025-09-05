'use client';

import { useState } from 'react';
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
import { BotMessageSquare } from 'lucide-react';
import { processPdf } from '@/services/pdf-service';


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
        "Hello! I'm DharmaJyoti, your personal legal assistant. Please upload a document to begin the analysis.",
    },
  ]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ChatForm>({
    resolver: zodResolver(chatSchema),
    defaultValues: {
      message: '',
    },
  });

  const handleFileLoad = async (file: File) => {
    setIsAnalyzing(true);
    setDocument({ name: file.name, content: 'Processing PDF...' });
    setAnalysis(null);
    setMessages([]);

    try {
      let textContent = '';
      if (file.type === 'application/pdf') {
        const arrayBuffer = await file.arrayBuffer();
        const pdfData = Buffer.from(arrayBuffer).toString('base64');
        const result = await processPdf({ dataUri: `data:application/pdf;base64,${pdfData}` });
        textContent = result.text;
      } else {
        textContent = await file.text();
      }

      setDocument({ name: file.name, content: textContent });

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
            content: `I've analyzed your document, "${file.name}". You can see a summary and analysis under the "Analysis" tab. What would you like to know about it?`,
          },
        ]);
      } else {
        throw new Error('Failed to analyze document.');
      }
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

  const handleSendMessage = async (data: ChatForm) => {
    setIsChatting(true);
    const userInput = data.message;
    const newMessages: Message[] = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    form.reset();

    try {
      let guidanceInput = userInput;
      if (document) {
        guidanceInput = `The user has uploaded a document named "${document.name}".
        
Document content:
---
${document.content}
---

User's question: "${userInput}"
        `;
      }
      const response = await interactiveLegalGuidance(guidanceInput);
      setMessages([...newMessages, { role: 'assistant', content: response }]);
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

  return (
      <div className="flex h-[calc(100vh-4rem)] w-full">
        <div className="flex flex-col flex-1">
          <main className="flex flex-1 flex-col gap-4 overflow-auto bg-background p-4 sm:p-6">
            {!document ? (
              <div className="flex h-full items-center justify-center">
                <Card className="w-full max-w-2xl shadow-lg">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 bg-primary/10 p-4 rounded-full w-fit border border-primary/20">
                            <BotMessageSquare className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="text-3xl">Upload &amp; Scan</CardTitle>
                        <CardDescription>Upload a document to get started.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="mt-6">
                            <FileUploader onFileLoad={handleFileLoad} disabled={isAnalyzing} />
                        </div>
                    </CardContent>
                </Card>
              </div>
            ) : (
              <div className="grid h-full gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-4 h-full min-h-[400px]">
                    <h2 className="text-2xl font-semibold">Document Viewer</h2>
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
            )}
          </main>
        </div>
      </div>
  );
}
