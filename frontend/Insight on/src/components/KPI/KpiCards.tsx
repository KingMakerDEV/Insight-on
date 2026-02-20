import { Card, CardContent } from '@/components/ui/card';
import type { AnalyzeResponse } from '@/types/api';

interface Props {
  stats: AnalyzeResponse['stats'];
}

export default function KpiCards({ stats }: Props) {
  const entries = Object.entries(stats).slice(0, 4);

  if (entries.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {entries.map(([key, value]) => (
        <Card key={key} className="rounded-xl shadow-md">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{key}</p>
            {value.mean !== undefined && (
              <p className="mt-2 text-2xl font-bold text-foreground">
                {Number(value.mean).toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </p>
            )}
            <div className="mt-2 flex gap-3 text-xs text-muted-foreground">
              {value.min !== undefined && <span>Min: {value.min.toLocaleString()}</span>}
              {value.max !== undefined && <span>Max: {value.max.toLocaleString()}</span>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
