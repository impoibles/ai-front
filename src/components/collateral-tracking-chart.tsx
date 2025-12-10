"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const collateralData = [
  { name: "Работает Гигачат", value: 35, color: "#3b82f6" },
  { name: "Собрано Гигачатом", value: 25, color: "#10b981" },
  { name: "В работе эксперта", value: 20, color: "#f59e0b" },
  { name: "Собрано с экспертом", value: 20, color: "#8b5cf6" }
];

interface CollateralTrackingChartProps {
  onSectorClick: (sector: string) => void;
  selectedSector: string | null;
}

export default function CollateralTrackingChart({ onSectorClick, selectedSector }: CollateralTrackingChartProps) {
  const total = collateralData.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm text-muted-foreground">
            {payload[0].value} ({((payload[0].value / total) * 100).toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = (entry: any) => {
    const percent = ((entry.value / total) * 100).toFixed(0);
    return `${percent}%`;
  };

  const handlePieClick = (data: any) => {
    if (data && data.name) {
      onSectorClick(data.name);
    }
  };

  return (
    <div className="w-full h-96 bg-white rounded-xl shadow-sm border p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900">AILI</h2>
        <p className="text-sm text-muted-foreground">Отслеживание залоговой экспертизы</p>
        {selectedSector && (
          <div className="mt-2">
            <span className="text-sm text-blue-600">
              Выбрано: {selectedSector}
            </span>
          </div>
        )}
      </div>
      
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={collateralData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            onClick={handlePieClick}
            style={{ cursor: 'pointer' }}
          >
            {collateralData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                stroke={selectedSector === entry.name ? "#1f2937" : "none"}
                strokeWidth={selectedSector === entry.name ? 2 : 0}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value, entry: any) => (
              <span 
                style={{ color: entry.color, cursor: 'pointer' }}
                onClick={() => onSectorClick(value)}
              >
                {value} ({entry.payload.value})
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}