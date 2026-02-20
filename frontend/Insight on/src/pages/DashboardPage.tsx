import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { analyzeDataset } from '@/services/analysis';
import { getChartConfig } from '@/services/chart';
import { getInsights } from '@/services/insights';
import type { UploadResponse, AnalyzeResponse, ChartConfigResponse, InsightsResponse } from '@/types/api';
import DynamicChart from '@/components/charts/DynamicChart';
import KpiCards from '@/components/kpi/KpiCards';
import InsightPanel from '@/components/insights/InsightPanel';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function DashboardPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const uploadResult = (location.state as { uploadResult?: UploadResponse })?.uploadResult;

  const [analysis, setAnalysis] = useState<AnalyzeResponse | null>(null);
  const [chartConfig, setChartConfig] = useState<ChartConfigResponse | null>(null);
  const [insights, setInsights] = useState<InsightsResponse | null>(null);
  const [loading, setLoading] = useState({ analysis: true, chart: true, insights: true });
  const [errors, setErrors] = useState({ analysis: '', chart: '', insights: '' });

  useEffect(() => {
    if (!uploadResult) {
      navigate('/upload');
      return;
    }

    const filename = uploadResult.filename;

    analyzeDataset(filename)
      .then((data) => setAnalysis(data))
      .catch(() => setErrors((p) => ({ ...p, analysis: 'Failed to load analysis.' })))
      .finally(() => setLoading((p) => ({ ...p, analysis: false })));

    getChartConfig(filename)
      .then((data) => setChartConfig(data))
      .catch(() => setErrors((p) => ({ ...p, chart: 'Failed to load chart configuration.' })))
      .finally(() => setLoading((p) => ({ ...p, chart: false })));

    getInsights(filename)
      .then((data) => setInsights(data))
      .catch(() => setErrors((p) => ({ ...p, insights: 'Failed to load AI insights.' })))
      .finally(() => setLoading((p) => ({ ...p, insights: false })));
  }, [uploadResult, navigate]);

  if (!uploadResult) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Dataset Summary */}
          <Card className="rounded-xl shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">Dataset Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">File Name</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">{uploadResult.filename}</p>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Rows</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">{uploadResult.rows.toLocaleString()}</p>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Columns</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">{uploadResult.columns.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* KPI Cards */}
          {loading.analysis ? (
            <div className="grid gap-4 sm:grid-cols-4">
              {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-28 rounded-xl" />)}
            </div>
          ) : errors.analysis ? (
            <ErrorAlert message={errors.analysis} />
          ) : analysis ? (
            <KpiCards stats={analysis.stats} />
          ) : null}

          {/* Dynamic Chart */}
          {loading.chart ? (
            <Skeleton className="h-80 rounded-xl" />
          ) : errors.chart ? (
            <ErrorAlert message={errors.chart} />
          ) : chartConfig ? (
            <DynamicChart config={chartConfig} />
          ) : null}

          {/* AI Insights */}
          {loading.insights ? (
            <Skeleton className="h-40 rounded-xl" />
          ) : errors.insights ? (
            <ErrorAlert message={errors.insights} />
          ) : insights ? (
            <InsightPanel insights={insights} />
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ErrorAlert({ message }: { message: string }) {
  return (
    <Alert variant="destructive" className="rounded-xl">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
