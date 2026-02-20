import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart, Line, BarChart, Bar, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import type { ChartConfigResponse } from '@/types/api';

interface Props {
  config: ChartConfigResponse;
}

export default function DynamicChart({ config }: Props) {
  const data = config.data || [];

  return (
    <Card className="rounded-xl shadow-md">
      <CardHeader>
        <CardTitle className="text-xl capitalize">
          {config.chart_type.replace('_', ' ')}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {config.x_axis} vs {config.y_axis} ({config.aggregation})
        </p>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex h-64 items-center justify-center text-muted-foreground">
            No chart data available
          </div>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {renderChart(config, data)}
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function renderChart(config: ChartConfigResponse, data: Record<string, unknown>[]) {
  const { chart_type, x_axis, y_axis } = config;

  switch (chart_type) {
    case 'bar_chart':
      return (
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis dataKey={x_axis} className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip />
          <Bar dataKey={y_axis} fill="hsl(224, 76%, 33%)" radius={[4, 4, 0, 0]} />
        </BarChart>
      );
    case 'scatter_plot':
      return (
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis dataKey={x_axis} name={x_axis} className="text-xs" />
          <YAxis dataKey={y_axis} name={y_axis} className="text-xs" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter data={data} fill="hsl(224, 76%, 33%)" />
        </ScatterChart>
      );
    case 'heatmap':
      // Render as bar chart fallback for recharts
      return (
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis dataKey={x_axis} className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip />
          <Bar dataKey={y_axis} fill="hsl(215, 16%, 47%)" radius={[4, 4, 0, 0]} />
        </BarChart>
      );
    case 'line_chart':
    default:
      return (
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis dataKey={x_axis} className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip />
          <Line type="monotone" dataKey={y_axis} stroke="hsl(224, 76%, 33%)" strokeWidth={2} dot={false} />
        </LineChart>
      );
  }
}
