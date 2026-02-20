// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import {
//   LineChart, Line, BarChart, Bar, ScatterChart, Scatter,
//   XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
// } from 'recharts';
// import type { ChartConfigResponse } from '@/types/api';

// interface Props {
//   config: ChartConfigResponse;
// }

// export default function DynamicChart({ config }: Props) {
//   const data = config.data || [];

//   return (
//     <Card className="rounded-xl shadow-md">
//       <CardHeader>
//         <CardTitle className="text-xl capitalize">
//           {config.chart_type.replace('_', ' ')}
//         </CardTitle>
//         <p className="text-sm text-muted-foreground">
//           {config.x_axis} vs {config.y_axis} ({config.aggregation})
//         </p>
//       </CardHeader>
//       <CardContent>
//         {data.length === 0 ? (
//           <div className="flex h-64 items-center justify-center text-muted-foreground">
//             No chart data available
//           </div>
//         ) : (
//           <div className="h-80">
//             <ResponsiveContainer width="100%" height="100%">
//               {renderChart(config, data)}
//             </ResponsiveContainer>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

// function renderChart(config: ChartConfigResponse, data: Record<string, unknown>[]) {
//   const { chart_type, x_axis, y_axis } = config;

//   switch (chart_type) {
//     case 'bar_chart':
//       return (
//         <BarChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
//           <XAxis dataKey={x_axis} className="text-xs" />
//           <YAxis className="text-xs" />
//           <Tooltip />
//           <Bar dataKey={y_axis} fill="hsl(224, 76%, 33%)" radius={[4, 4, 0, 0]} />
//         </BarChart>
//       );
//     case 'scatter_plot':
//       return (
//         <ScatterChart>
//           <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
//           <XAxis dataKey={x_axis} name={x_axis} className="text-xs" />
//           <YAxis dataKey={y_axis} name={y_axis} className="text-xs" />
//           <Tooltip cursor={{ strokeDasharray: '3 3' }} />
//           <Scatter data={data} fill="hsl(224, 76%, 33%)" />
//         </ScatterChart>
//       );
//     case 'heatmap':
//       // Render as bar chart fallback for recharts
//       return (
//         <BarChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
//           <XAxis dataKey={x_axis} className="text-xs" />
//           <YAxis className="text-xs" />
//           <Tooltip />
//           <Bar dataKey={y_axis} fill="hsl(215, 16%, 47%)" radius={[4, 4, 0, 0]} />
//         </BarChart>
//       );
//     case 'line_chart':
//     default:
//       return (
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
//           <XAxis dataKey={x_axis} className="text-xs" />
//           <YAxis className="text-xs" />
//           <Tooltip />
//           <Line type="monotone" dataKey={y_axis} stroke="hsl(224, 76%, 33%)" strokeWidth={2} dot={false} />
//         </LineChart>
//       );
//   }
// }


// frontend/src/components/charts/DynamicChart.tsx
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Hardcoded data matching your mock CSV
const mockData = [
  { month: 'Jan', reported: 150, resolved: 120 },
  { month: 'Feb', reported: 200, resolved: 180 },
  { month: 'Mar', reported: 170, resolved: 160 },
  { month: 'Apr', reported: 220, resolved: 190 },
  { month: 'May', reported: 180, resolved: 175 },
  { month: 'Jun', reported: 250, resolved: 230 },
];

export default function DynamicChart({ config }: any) {
  // We accept the config prop so TypeScript doesn't yell, 
  // but we completely ignore it for the demo.

  return (
    <Card className="rounded-xl shadow-md border-border">
      <CardHeader>
        <CardTitle>Civic Issue Resolution Trends</CardTitle>
        <CardDescription>Reported vs. Resolved cases over the last 6 months (Mock Demo)</CardDescription>
      </CardHeader>
      <CardContent className="h-[400px] w-full pb-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorReported" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Area type="monotone" dataKey="reported" name="Reported Issues" stroke="#94a3b8" fillOpacity={1} fill="url(#colorReported)" />
            <Area type="monotone" dataKey="resolved" name="Resolved Issues" stroke="#3b82f6" fillOpacity={1} fill="url(#colorResolved)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}