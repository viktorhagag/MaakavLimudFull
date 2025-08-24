
'use client';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

type Point = { date: string; value: number };

export default function ProgressAreaChart({ data }: { data: Point[] }) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#000000" fillOpacity={0.15} fill="#000000" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
