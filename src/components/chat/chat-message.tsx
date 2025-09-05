import { Bot, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Card } from '../ui/card';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  isLoading?: boolean;
}

export function ChatMessage({ role, content, isLoading }: ChatMessageProps) {
  const isAssistant = role === 'assistant';

  return (
    <div
      className={cn(
        'flex items-start gap-4',
        !isAssistant && 'justify-end'
      )}
    >
      {isAssistant && (
        <Avatar className="h-9 w-9 border-2 border-primary/20">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
      <Card
        className={cn(
          'max-w-[85%] p-4 text-sm',
          isAssistant
            ? 'bg-card'
            : 'bg-primary text-primary-foreground'
        )}
      >
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px] bg-muted-foreground/30" />
            <Skeleton className="h-4 w-[200px] bg-muted-foreground/30" />
            <Skeleton className="h-4 w-[220px] bg-muted-foreground/30" />
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{content}</p>
        )}
      </Card>
      {!isAssistant && (
        <Avatar className="h-9 w-9 border-2 border-border">
          <AvatarFallback>
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
