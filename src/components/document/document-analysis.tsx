import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { Analysis } from '@/app/page';

interface DocumentAnalysisProps {
  analysis: Analysis | null;
  isLoading: boolean;
}

export function DocumentAnalysis({ analysis, isLoading }: DocumentAnalysisProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="pt-4 space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analysis) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-sm">Document Type</h3>
              <p className="text-sm text-muted-foreground capitalize">
                {analysis.documentType}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-sm">Purpose</h3>
              <p className="text-sm text-muted-foreground">{analysis.purpose}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm">Summary</h3>
              <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                {analysis.summary}
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {analysis.keywords.map((keyword, index) => (
                <Badge key={index} variant="secondary">
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
