"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface ServiceGaugeData {
  name: string;
  current: number;
  average: number;
  unit: string;
}

const servicesData: ServiceGaugeData[] = [
  { name: "ЕГРН", current: 120, average: 100, unit: "мс" },
  { name: "ЕСИН", current: 85, average: 100, unit: "мс" },
  { name: "ЕФР", current: 95, average: 100, unit: "мс" },
  { name: "ГИБДД", current: 150, average: 100, unit: "мс" },
  { name: "Онлайн Оценка", current: 75, average: 100, unit: "мс" }
];

const ServiceGauge = ({ data }: { data: ServiceGaugeData }) => {
  const percentage = Math.min((data.current / 200) * 100, 100);
  const speedRatio = data.average / data.current; // Inverted - lower is better
  
  const gaugeData = [
    { value: percentage },
    { value: 100 - percentage }
  ];

  const getColor = () => {
    if (speedRatio >= 1.2) return "#10b981"; // green - faster than average
    if (speedRatio >= 0.8) return "#3b82f6"; // blue - normal
    return "#f59e0b"; // amber - slower than average
  };

  return (
    <div className="bg-white rounded-lg p-4 border">
      <div className="text-center mb-2">
        <h3 className="text-sm font-medium text-gray-700">{data.name}</h3>
      </div>
      
      <div className="relative h-32">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={gaugeData}
              cx="50%"
              cy="70%"
              startAngle={180}
              endAngle={0}
              innerRadius={35}
              outerRadius={50}
              paddingAngle={0}
              dataKey="value"
            >
              <Cell fill={getColor()} />
              <Cell fill="#e5e7eb" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center mt-8">
          <span className="text-lg font-bold text-gray-900">{data.current}</span>
          <span className="text-xs text-gray-500">{data.unit}</span>
        </div>
      </div>
      
      <div className="mt-2 text-center">
        <div className="flex items-center justify-center gap-1 text-xs">
          <span className="text-gray-500">Средняя: {data.average}</span>
          <span className={`font-medium ${speedRatio >= 1 ? 'text-green-600' : 'text-amber-600'}`}>
            ({speedRatio >= 1 ? '+' : ''}{((speedRatio - 1) * 100).toFixed(0)}%)
          </span>
        </div>
      </div>
    </div>
  );
};

export default function ExternalServicesGauges() {
  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {servicesData.map((service, index) => (
          <ServiceGauge key={index} data={service} />
        ))}
      </div>
    </div>
  );
}