'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChatPanel } from '@/components/chat/chat-panel';
import { interactiveLegalGuidance, InteractiveLegalGuidanceInput } from '@/ai/flows/interactive-legal-guidance';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BotMessageSquare } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { useTranslations } from '@/hooks/use-translations';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const chatSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
});

type ChatForm = z.infer<typeof chatSchema>;

export default function LawyerPage() {
  const { language } = useLanguage();
  const t = useTranslations();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: t.lawyer.initialMessage,
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
      const input: InteractiveLegalGuidanceInput = { message: userInput, language };
      const response = await interactiveLegalGuidance(input);
      setMessages([...newMessages, { role: 'assistant', content: response ?? t.common.error }]);
    } catch (error) {
      console.error(error);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: t.common.error,
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
            <CardTitle className="text-3xl">{t.lawyer.title}</CardTitle>
            <CardDescription>{t.lawyer.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0">
            <ChatPanel
                messages={messages}
                isLoading={isChatting}
                onSendMessage={handleSendMessage}
                form={form}
                placeholder={t.lawyer.placeholder}
            />
        </CardContent>
      </Card>
    </div>
  );
}
