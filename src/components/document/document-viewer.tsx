import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DocumentViewerProps {
  content: string;
}

export function DocumentViewer({ content }: DocumentViewerProps) {
  return (
    <Card className="h-full flex flex-col shadow-lg">
      <CardContent className="p-6 flex-1">
        <ScrollArea className="h-full">
            <p className="whitespace-pre-wrap text-sm leading-relaxed">{content}</p>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
