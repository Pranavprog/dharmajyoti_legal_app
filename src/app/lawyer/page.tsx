'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChatPanel } from '@/components/chat/chat-panel';
import { interactiveLegalGuidance } from '@/ai/flows/interactive-legal-guidance';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BotMessageSquare } from 'lucide-react';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const chatSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
});

type ChatForm = z.infer<typeof chatSchema>;

export default function LawyerPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hello! I'm DharmaJyoti, your AI legal assistant. How can I help you today? You can ask me general legal questions.",
    },
  ]);
  const [isChatting, setIsChatting] = useState(false);

  const form = useForm<ChatForm>({
    resolver: zodResolver(chatSchema),
    defaultValues: {
      message: '',
    },
  });

  const handleSendMessage = async (data: ChatForm) => {
    setIsChatting(true);
    const userInput = data.message;
    const newMessages: Message[] = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    form.reset();

    try {
      const response = await interactiveLegalGuidance(userInput);
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
    <div className="flex justify-center items-start p-4 sm:p-6 md:p-8 h-[calc(100vh-4rem)] bg-background">
      <Card className="w-full max-w-3xl h-full flex flex-col shadow-2xl">
        <CardHeader className="text-center">
            <div className="mx-auto mb-4 bg-primary/10 p-4 rounded-full w-fit border border-primary/20">
                <BotMessageSquare className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-3xl">Mini Lawyer Support</CardTitle>
            <CardDescription>Your AI-powered legal assistant.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0">
            <ChatPanel
                messages={messages}
                isLoading={isChatting}
                onSendMessage={handleSendMessage}
                form={form}
                placeholder="Ask a legal question..."
            />
        </CardContent>
      </Card>
    </div>
  );
}
