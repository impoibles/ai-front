"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface PieChartSectionProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
  onSectorClick: (sector: string) => void;
  selectedSector: string | null;
}

export default function PieChartSection({ data, onSectorClick, selectedSector }: PieChartSectionProps) {
  const handlePieClick = (data: any) => {
    if (data && data.name) {
      onSectorClick(data.name);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={false}
            outerRadius={90}
            innerRadius={50}
            fill="#8884d8"
            dataKey="value"
            onClick={handlePieClick}
            style={{ cursor: 'pointer' }}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                stroke={selectedSector === entry.name ? "#000" : "none"}
                strokeWidth={selectedSector === entry.name ? 2 : 0}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Легенда под диаграммой */}
      <div className="mt-2 flex flex-wrap justify-center gap-4 text-xs">
        {data.map((entry, index) => (
          <div 
            key={`legend-${index}`}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80"
            onClick={() => onSectorClick(entry.name)}
          >
            <div 
              className="w-3 h-3 rounded-sm"
              style={{ 
                backgroundColor: entry.color,
                border: selectedSector === entry.name ? "2px solid #000" : "none"
              }}
            />
            <span className="text-muted-foreground">
              {entry.name}: {entry.value}
            </span>
          </div>
        ))}
      </div>
      
      {selectedSector && (
        <div className="mt-2 text-center">
          <button
            onClick={() => onSectorClick('')}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Показать все заявки
          </button>
        </div>
      )}
    </div>
  );
}