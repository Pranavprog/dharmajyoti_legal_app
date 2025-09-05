'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileUploader } from '@/components/file-uploader';
import { Logo } from '@/components/logo';
import { ChatPanel } from '@/components/chat/chat-panel';
import { DocumentViewer } from '@/components/document/document-viewer';
import { DocumentAnalysis } from '@/components/document/document-analysis';

import { summarizeUploadedDocument } from '@/ai/flows/summarize-uploaded-document';
import { identifyDocumentTypeAndPurpose } from '@/ai/flows/identify-document-type-and-purpose';
import { interactiveLegalGuidance } from '@/ai/flows/interactive-legal-guidance';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BotMessageSquare, UploadCloud } from 'lucide-react';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface Analysis {
  summary: string;
  documentType: string;
  purpose: string;
}

const chatSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
});

type ChatForm = z.infer<typeof chatSchema>;

export default function Home() {
  const [document, setDocument] = useState<{ name: string; content: string } | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hello! I'm LegaliAI, your personal legal assistant. You can upload a document for analysis or start by asking me a legal question.",
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

  const handleFileLoad = async (content: string, name: string) => {
    setIsAnalyzing(true);
    setDocument({ name, content });
    setAnalysis(null);
    setMessages([]);

    try {
      const [summaryRes, typeRes] = await Promise.all([
        summarizeUploadedDocument({ documentText: content }),
        identifyDocumentTypeAndPurpose({ documentText: content }),
      ]);

      if (summaryRes && typeRes) {
        setAnalysis({
          summary: summaryRes.summary,
          documentType: typeRes.documentType,
          purpose: typeRes.purpose,
        });
        setMessages([
          {
            role: 'assistant',
            content: `I've analyzed your document, "${name}". You can see a summary and analysis under the "Analysis" tab. What would you like to know about it?`,
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
    <SidebarProvider>
      <div className="grid h-screen w-full lg:grid-cols-[300px_1fr]">
        <Sidebar className="hidden lg:flex lg:flex-col">
          <SidebarHeader className="border-b">
            <Logo />
          </SidebarHeader>
          <SidebarContent>
            <div className="p-4">
              <FileUploader onFileLoad={handleFileLoad} disabled={isAnalyzing} />
            </div>
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-card px-4 sm:h-[60px] sm:px-6">
            <SidebarTrigger className="lg:hidden" />
            <h1 className="flex-1 text-lg font-semibold md:text-xl truncate">
              {document ? document.name : 'Interactive Chat'}
            </h1>
          </header>
          <main className="flex flex-1 flex-col gap-4 overflow-auto bg-background p-4 sm:p-6">
            {!document ? (
              <div className="flex h-full items-center justify-center">
                <Card className="w-full max-w-2xl">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 bg-primary/10 p-3 rounded-full w-fit">
                            <BotMessageSquare className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle>Welcome to LegaliAI</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChatPanel
                            messages={messages}
                            isLoading={isChatting}
                            onSendMessage={handleSendMessage}
                            form={form}
                            placeholder="Ask a legal question to get started..."
                        />
                         <div className="lg:hidden mt-6">
                            <FileUploader onFileLoad={handleFileLoad} disabled={isAnalyzing} />
                        </div>
                    </CardContent>
                </Card>
              </div>
            ) : (
              <div className="grid h-full gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-4 h-full min-h-[400px]">
                    <h2 className="text-lg font-semibold">Document</h2>
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
    </SidebarProvider>
  );
}
