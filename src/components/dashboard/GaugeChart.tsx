"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface GaugeChartProps {
  value: number;
  max: number;
  label: string;
  unit?: string;
}

export default function GaugeChart({ value, max, label, unit = "" }: GaugeChartProps) {
  const percentage = (value / max) * 100;
  const angle = (percentage * 180) / 100;
  
  const data = [
    { name: "progress", value: percentage },
    { name: "remaining", value: 100 - percentage }
  ];

  const getColor = (percentage: number) => {
    if (percentage < 30) return "#ef4444";
    if (percentage < 60) return "#f59e0b";
    return "#22c55e";
  };

  const startAngle = 180;
  const endAngle = 0;

  return (
    <div className="relative w-full h-20">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="60%"
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={30}
            outerRadius={45}
            paddingAngle={0}
            dataKey="value"
          >
            <Cell fill={getColor(percentage)} />
            <Cell fill="transparent" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-lg font-bold">
          {value}{unit}
        </div>
        <div className="text-xs text-muted-foreground">
          {label}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-xs text-muted-foreground">
        <span>0</span>
        <span>{max / 2}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}