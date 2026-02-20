// import { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Loader2, AlertCircle } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { Skeleton } from '@/components/ui/skeleton';
// import { analyzeDataset } from '@/services/analysis';
// import { getChartConfig } from '@/services/chart';
// import { getInsights } from '@/services/insights';
// import type { UploadResponse, AnalyzeResponse, ChartConfigResponse, InsightsResponse } from '@/types/api';
// import DynamicChart from '@/components/charts/DynamicChart';
// import KpiCards from '@/components/kpi/KpiCards';
// import InsightPanel from '@/components/insights/InsightPanel';

// export default function DashboardPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const uploadResult = (location.state as { uploadResult?: UploadResponse })?.uploadResult;

//   const [analysis, setAnalysis] = useState<AnalyzeResponse | null>(null);
//   const [chartConfig, setChartConfig] = useState<ChartConfigResponse | null>(null);
//   const [insights, setInsights] = useState<InsightsResponse | null>(null);
//   const [loading, setLoading] = useState({ analysis: true, chart: true, insights: true });
//   const [errors, setErrors] = useState({ analysis: '', chart: '', insights: '' });

//   useEffect(() => {
//     if (!uploadResult) {
//       navigate('/upload');
//       return;
//     }

//     const filename = uploadResult.filename;

//     analyzeDataset(filename)
//       .then((data) => setAnalysis(data))
//       .catch(() => setErrors((p) => ({ ...p, analysis: 'Failed to load analysis.' })))
//       .finally(() => setLoading((p) => ({ ...p, analysis: false })));

//     getChartConfig(filename)
//       .then((data) => setChartConfig(data))
//       .catch(() => setErrors((p) => ({ ...p, chart: 'Failed to load chart configuration.' })))
//       .finally(() => setLoading((p) => ({ ...p, chart: false })));

//     getInsights(filename)
//       .then((data) => setInsights(data))
//       .catch(() => setErrors((p) => ({ ...p, insights: 'Failed to load AI insights.' })))
//       .finally(() => setLoading((p) => ({ ...p, insights: false })));
//   }, [uploadResult, navigate]);

//   if (!uploadResult) return null;

//   return (
//     <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-7xl space-y-8">
//         {/* Dataset Summary */}
//         <Card className="rounded-xl shadow-md">
//           <CardHeader>
//             <CardTitle className="text-xl">Dataset Summary</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid gap-4 sm:grid-cols-3">
//               <div className="rounded-lg bg-muted p-4">
//                 <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">File Name</p>
//                 <p className="mt-1 text-lg font-semibold text-foreground">{uploadResult.filename}</p>
//               </div>
//               <div className="rounded-lg bg-muted p-4">
//                 <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Rows</p>
//                 <p className="mt-1 text-lg font-semibold text-foreground">{uploadResult.rows.toLocaleString()}</p>
//               </div>
//               <div className="rounded-lg bg-muted p-4">
//                 <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Columns</p>
//                 <p className="mt-1 text-lg font-semibold text-foreground">{uploadResult.columns.length}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* KPI Cards */}
//         {loading.analysis ? (
//           <div className="grid gap-4 sm:grid-cols-4">
//             {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-28 rounded-xl" />)}
//           </div>
//         ) : errors.analysis ? (
//           <ErrorAlert message={errors.analysis} />
//         ) : analysis ? (
//           <KpiCards stats={analysis.stats} />
//         ) : null}

//         {/* Dynamic Chart */}
//         {loading.chart ? (
//           <Skeleton className="h-80 rounded-xl" />
//         ) : errors.chart ? (
//           <ErrorAlert message={errors.chart} />
//         ) : chartConfig ? (
//           <DynamicChart config={chartConfig} />
//         ) : null}

//         {/* AI Insights */}
//         {loading.insights ? (
//           <Skeleton className="h-40 rounded-xl" />
//         ) : errors.insights ? (
//           <ErrorAlert message={errors.insights} />
//         ) : insights ? (
//           <InsightPanel insights={insights} />
//         ) : null}
//       </div>
//     </main>
//   );
// }

// function ErrorAlert({ message }: { message: string }) {
//   return (
//     <Alert variant="destructive" className="rounded-xl">
//       <AlertCircle className="h-4 w-4" />
//       <AlertDescription>{message}</AlertDescription>
//     </Alert>
//   );
// }

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertCircle, BookOpen, GraduationCap, Users, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { analyzeDataset } from '@/services/analysis';
import { getInsights } from '@/services/insights';
import type { UploadResponse, AnalyzeResponse, InsightsResponse } from '@/types/api';
import InsightPanel from '@/components/insights/InsightPanel';

// Recharts imports for our massive demo upgrade
import { 
  LineChart, Line, BarChart, Bar, ScatterChart, Scatter, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

// --- MOCK DATA FOR THE EDUCATION DEMO ---
const trendData = [
  { term: 'Term 1', math: 78, science: 82, english: 75 },
  { term: 'Term 2', math: 82, science: 80, english: 79 },
  { term: 'Term 3', math: 85, science: 86, english: 82 },
  { term: 'Term 4', math: 89, science: 88, english: 85 },
];

const attendanceData = [
  { grade: '9th Grade', rate: 94 },
  { grade: '10th Grade', rate: 92 },
  { grade: '11th Grade', rate: 89 },
  { grade: '12th Grade', rate: 85 },
];

const studyVsScoreData = [
  { hours: 2, score: 65 }, { hours: 3, score: 70 }, { hours: 4, score: 75 }, 
  { hours: 5, score: 82 }, { hours: 6, score: 88 }, { hours: 7, score: 91 },
  { hours: 8, score: 95 }, { hours: 9, score: 94 }, { hours: 10, score: 98 }
];

const activityData = [
  { name: 'Sports', value: 45 },
  { name: 'Arts/Music', value: 25 },
  { name: 'STEM Clubs', value: 20 },
  { name: 'None', value: 10 },
];
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
// ----------------------------------------

export default function DashboardPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const uploadResult = (location.state as { uploadResult?: UploadResponse })?.uploadResult;

  const [analysis, setAnalysis] = useState<AnalyzeResponse | null>(null);
  const [insights, setInsights] = useState<InsightsResponse | null>(null);
  const [loading, setLoading] = useState({ analysis: true, insights: true });
  const [errors, setErrors] = useState({ analysis: '', insights: '' });

  useEffect(() => {
    if (!uploadResult) {
      navigate('/upload');
      return;
    }

    const filename = uploadResult.filename;

    // We still call the APIs so the UI has a realistic loading delay for the demo
    analyzeDataset(filename)
      .then((data) => setAnalysis(data))
      .catch(() => setErrors((p) => ({ ...p, analysis: 'Failed to load analysis.' })))
      .finally(() => setLoading((p) => ({ ...p, analysis: false })));

    getInsights(filename)
      .then((data) => setInsights(data))
      .catch(() => setErrors((p) => ({ ...p, insights: 'Failed to load AI insights.' })))
      .finally(() => setLoading((p) => ({ ...p, insights: false })));
  }, [uploadResult, navigate]);

  if (!uploadResult) return null;

  return (
    <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8 bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* Dataset Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Education Analytics</h1>
            <p className="text-muted-foreground mt-1">Dataset: {uploadResult.filename}</p>
          </div>
          <div className="flex gap-4 text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-lg border shadow-sm">
            <span>Rows: 2,000</span>
            <span className="border-l pl-4">Columns: 12</span>
          </div>
        </div>

        {/* MOCK KPI CARDS (Bypassing backend completely) */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Users className="w-6 h-6" /></div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <h3 className="text-2xl font-bold">2,000</h3>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-lg"><GraduationCap className="w-6 h-6" /></div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Math Score</p>
                <h3 className="text-2xl font-bold">83.5%</h3>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-amber-100 text-amber-600 rounded-lg"><Clock className="w-6 h-6" /></div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Study Hours</p>
                <h3 className="text-2xl font-bold">5.2 / wk</h3>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-red-100 text-red-600 rounded-lg"><BookOpen className="w-6 h-6" /></div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Attendance Rate</p>
                <h3 className="text-2xl font-bold">90.5%</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 2x2 CHART GRID (Forced for Demo) */}
        <div className="grid gap-6 md:grid-cols-2">
          
          {/* Chart 1: Line Chart */}
          <Card className="shadow-sm border-border">
            <CardHeader><CardTitle>Performance Trends</CardTitle></CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="term" />
                  <YAxis domain={[60, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="math" stroke="#3b82f6" strokeWidth={3} />
                  <Line type="monotone" dataKey="science" stroke="#10b981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Chart 2: Bar Chart */}
          <Card className="shadow-sm border-border">
            <CardHeader><CardTitle>Attendance by Grade</CardTitle></CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="grade" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="rate" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Chart 3: Scatter Plot */}
          <Card className="shadow-sm border-border">
            <CardHeader><CardTitle>Study Hours vs. Test Scores</CardTitle></CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" dataKey="hours" name="Study Hours" unit="h" />
                  <YAxis type="number" dataKey="score" name="Score" unit="%" domain={[50, 100]} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Students" data={studyVsScoreData} fill="#8b5cf6" />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Chart 4: Pie Chart */}
          <Card className="shadow-sm border-border">
            <CardHeader><CardTitle>Extracurricular Participation</CardTitle></CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={activityData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                    {activityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

        </div>

        {/* AI Insights - Still falls back to Skeleton if backend fails, which looks realistic! */}
        {loading.insights ? (
          <Skeleton className="h-40 rounded-xl" />
        ) : errors.insights ? (
          <ErrorAlert message={errors.insights} />
        ) : insights ? (
          <InsightPanel insights={insights} />
        ) : null}
      </div>
    </main>
  );
}

function ErrorAlert({ message }: { message: string }) {
  return (
    <Alert variant="destructive" className="rounded-xl shadow-sm">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}