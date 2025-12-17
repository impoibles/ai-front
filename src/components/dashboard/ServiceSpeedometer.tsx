"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface ServiceSpeedometerProps {
  serviceName: string;
  currentSpeed: number;
  averageSpeed: number;
  unit?: string;
}

export default function ServiceSpeedometer({ 
  serviceName, 
  currentSpeed, 
  averageSpeed, 
  unit = "мс" 
}: ServiceSpeedometerProps) {
  // Рассчитываем процент относительно среднего значения
  const percentage = Math.min((currentSpeed / averageSpeed) * 100, 200);
  const angle = (percentage * 180) / 200;
  
  const data = [
    { name: "progress", value: Math.min(percentage, 100) },
    { name: "remaining", value: Math.max(100 - percentage, 0) }
  ];

  const getColor = (percentage: number) => {
    // Чем ниже процент (быстрее ответ), тем лучше - зеленый
    // Чем выше процент (медленнее ответ), тем хуже - красный
    if (percentage <= 50) return "#22c55e"; // Зеленый - быстро
    if (percentage <= 100) return "#f59e0b"; // Оранжевый - средне
    return "#ef4444"; // Красный - медленно
  };

  const startAngle = 180;
  const endAngle = 0;

  return (
    <div className="bg-card rounded-lg border p-4">
      <div className="relative w-full h-32">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="70%"
              startAngle={startAngle}
              endAngle={endAngle}
              innerRadius={40}
              outerRadius={55}
              paddingAngle={0}
              dataKey="value"
            >
              <Cell fill={getColor(percentage)} />
              <Cell fill="transparent" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-xl font-bold">
            {currentSpeed}
          </div>
          <div className="text-xs text-muted-foreground">
            {unit}
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-xs text-muted-foreground">
          <span>0</span>
          <span>{averageSpeed}</span>
          <span>{averageSpeed * 2}+</span>
        </div>
      </div>
      
      <div className="text-center mt-2">
        <div className="text-sm font-medium">{serviceName}</div>
        <div className="text-xs text-muted-foreground">
          Среднее: {averageSpeed} {unit}
        </div>
      </div>
    </div>
  );
}