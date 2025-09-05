'use client';

import type { UseFormReturn } from 'react-hook-form';
import { Send } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { ChatMessage } from './chat-message';
import type { Message } from '@/app/page';

interface ChatPanelProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (data: { message: string }) => void;
  form: UseFormReturn<{ message: string }>;
  placeholder?: string;
}

export function ChatPanel({
  messages,
  isLoading,
  onSendMessage,
  form,
  placeholder = "Type your message here...",
}: ChatPanelProps) {

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (!isLoading) {
        form.handleSubmit(onSendMessage)();
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {messages.map((message, index) => (
            <ChatMessage key={index} role={message.role} content={message.content} />
          ))}
          {isLoading && <ChatMessage role="assistant" content="" isLoading />}
        </div>
      </ScrollArea>
      <div className="border-t bg-card p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSendMessage)}
            className="relative"
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder={placeholder}
                      className="resize-none pr-14 min-h-[48px] rounded-full"
                      onKeyDown={handleKeyDown}
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full h-9 w-9"
              disabled={isLoading || !form.formState.isValid}
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
