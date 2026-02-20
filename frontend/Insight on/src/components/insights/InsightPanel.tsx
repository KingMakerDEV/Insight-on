import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain } from 'lucide-react';
import type { InsightsResponse } from '@/types/api';

interface Props {
  insights: InsightsResponse;
}

export default function InsightPanel({ insights }: Props) {
  const { dataset_profile, executive_insight } = insights.ai_insight;

  return (
    <Card className="rounded-xl shadow-md">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Brain className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-xl">AI Executive Summary</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {dataset_profile && (
          <div>
            <h3 className="text-sm font-semibold text-foreground">Dataset Profile</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{dataset_profile}</p>
          </div>
        )}
        <div>
          <h3 className="text-sm font-semibold text-foreground">Executive Insight</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{executive_insight}</p>
        </div>
      </CardContent>
    </Card>
  );
}
