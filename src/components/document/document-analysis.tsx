import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { Analysis } from '@/app/page';

interface DocumentAnalysisProps {
  analysis: Analysis | null;
  isLoading: boolean;
}

export function DocumentAnalysis({ analysis, isLoading }: DocumentAnalysisProps) {
  if (isLoading) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analysis) {
    return (
      <Card className="shadow-lg flex items-center justify-center h-full">
        <CardContent className="text-center p-6">
          <p className="text-muted-foreground">No analysis available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">{analysis.documentType}</CardTitle>
        <CardDescription>{analysis.purpose}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">Summary</h3>
            <p className="whitespace-pre-wrap text-sm text-muted-foreground leading-relaxed">
              {analysis.summary}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {analysis.keywords.map((keyword, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
