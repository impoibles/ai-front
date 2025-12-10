"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { useState } from "react";
import StageApplicationsDialog from "./stage-applications-dialog";

interface StageData {
  stage: string;
  worksGigaChat: number;
  expertWork: number;
  requiresConnection: number;
}

const stagesData: StageData[] = [
  { stage: "Создание заявки", worksGigaChat: 45, expertWork: 5, requiresConnection: 2 },
  { stage: "Формирование перечня", worksGigaChat: 38, expertWork: 8, requiresConnection: 6 },
  { stage: "Запрос документов", worksGigaChat: 42, expertWork: 12, requiresConnection: 8 },
  { stage: "Обработка документов", worksGigaChat: 35, expertWork: 15, requiresConnection: 12 },
  { stage: "Запрос обременений", worksGigaChat: 40, expertWork: 10, requiresConnection: 10 },
  { stage: "Анализ обременений", worksGigaChat: 28, expertWork: 18, requiresConnection: 14 },
  { stage: "Выставление осмотра", worksGigaChat: 32, expertWork: 20, requiresConnection: 8 },
  { stage: "Анализ осмотра", worksGigaChat: 25, expertWork: 25, requiresConnection: 10 },
  { stage: "Онлайн Оценка", worksGigaChat: 30, expertWork: 22, requiresConnection: 8 },
  { stage: "Подготовка заключения", worksGigaChat: 35, expertWork: 15, requiresConnection: 5 }
];

interface Application {
  id: string;
  clientName: string;
  objectType: string;
  address: string;
  status: string;
  currentStage: string;
  stages: {
    name: string;
    status: "completed" | "in-progress" | "pending";
    duration?: string;
    reason?: string;
  }[];
  expertReason?: string;
  systemReason?: string;
}

const mockApplications: Application[] = [
  {
    id: "APP-001",
    clientName: "Иванов Иван Иванович",
    objectType: "Квартира",
    address: "г. Москва, ул. Ленина, д. 10, кв. 5",
    status: "Работает Гигачат",
    currentStage: "Анализ обременений",
    stages: [
      { name: "Создание заявки", status: "completed", duration: "5 мин" },
      { name: "Формирование перечня", status: "completed", duration: "3 мин" },
      { name: "Запрос документов", status: "completed", duration: "8 мин" },
      { name: "Обработка документов", status: "completed", duration: "12 мин" },
      { name: "Запрос обременений", status: "completed", duration: "6 мин" },
      { name: "Анализ обременений", status: "in-progress" },
      { name: "Выставление осмотра", status: "pending" },
      { name: "Анализ осмотра", status: "pending" },
      { name: "Онлайн Оценка", status: "pending" },
      { name: "Подготовка заключения", status: "pending" }
    ]
  },
  {
    id: "APP-002",
    clientName: "Петров Петр Петрович",
    objectType: "Дом",
    address: "г. Санкт-Петербург, ул. Невская, д. 25",
    status: "В работе эксперта",
    currentStage: "Анализ осмотра",
    expertReason: "Не удалось распознать тип отделки стен на фотографиях объекта",
    stages: [
      { name: "Создание заявки", status: "completed", duration: "5 мин" },
      { name: "Формирование перечня", status: "completed", duration: "4 мин" },
      { name: "Запрос документов", status: "completed", duration: "10 мин" },
      { name: "Обработка документов", status: "completed", duration: "15 мин" },
      { name: "Запрос обременений", status: "completed", duration: "7 мин" },
      { name: "Анализ обременений", status: "completed", duration: "12 мин" },
      { name: "Выставление осмотра", status: "completed", duration: "8 мин" },
      { name: "Анализ осмотра", status: "in-progress" },
      { name: "Онлайн Оценка", status: "pending" },
      { name: "Подготовка заключения", status: "pending" }
    ]
  },
  {
    id: "APP-003",
    clientName: "Сидоров Сидор Сидорович",
    objectType: "Коммерческое помещение",
    address: "г. Новосибирск, пр. Красный, д. 100",
    status: "Требуется подключение",
    currentStage: "Запрос документов",
    systemReason: "Превышен таймаут ожидания ответа от внешнего сервиса ЕГРН",
    stages: [
      { name: "Создание заявки", status: "completed", duration: "6 мин" },
      { name: "Формирование перечня", status: "completed", duration: "5 мин" },
      { name: "Запрос документов", status: "pending" },
      { name: "Обработка документов", status: "pending" },
      { name: "Запрос обременений", status: "pending" },
      { name: "Анализ обременений", status: "pending" },
      { name: "Выставление осмотра", status: "pending" },
      { name: "Анализ осмотра", status: "pending" },
      { name: "Онлайн Оценка", status: "pending" },
      { name: "Подготовка заключения", status: "pending" }
    ]
  },
  {
    id: "APP-004",
    clientName: "Козлова Анна Сергеевна",
    objectType: "Земельный участок",
    address: "г. Екатеринбург, ул. Садовая, д. 15",
    status: "В работе эксперта",
    currentStage: "Онлайн Оценка",
    expertReason: "Сложная конфигурация участка требует ручного расчета стоимости",
    stages: [
      { name: "Создание заявки", status: "completed", duration: "7 мин" },
      { name: "Формирование перечня", status: "completed", duration: "6 мин" },
      { name: "Запрос документов", status: "completed", duration: "12 мин" },
      { name: "Обработка документов", status: "completed", duration: "18 мин" },
      { name: "Запрос обременений", status: "completed", duration: "9 мин" },
      { name: "Анализ обременений", status: "completed", duration: "15 мин" },
      { name: "Выставление осмотра", status: "completed", duration: "10 мин" },
      { name: "Анализ осмотра", status: "completed", duration: "25 мин" },
      { name: "Онлайн Оценка", status: "in-progress" },
      { name: "Подготовка заключения", status: "pending" }
    ]
  },
  {
    id: "APP-005",
    clientName: "Смирнов Алексей Викторович",
    objectType: "Квартира",
    address: "г. Казань, ул. Баумана, д. 5, кв. 12",
    status: "Требуется подключение",
    currentStage: "Обработка документов",
    systemReason: "Системная ошибка при обработке загруженных документов",
    stages: [
      { name: "Создание заявки", status: "completed", duration: "4 мин" },
      { name: "Формирование перечня", status: "completed", duration: "3 мин" },
      { name: "Запрос документов", status: "completed", duration: "9 мин" },
      { name: "Обработка документов", status: "pending" },
      { name: "Запрос обременений", status: "pending" },
      { name: "Анализ обременений", status: "pending" },
      { name: "Выставление осмотра", status: "pending" },
      { name: "Анализ осмотра", status: "pending" },
      { name: "Онлайн Оценка", status: "pending" },
      { name: "Подготовка заключения", status: "pending" }
    ]
  },
  {
    id: "APP-006",
    clientName: "Новикова Мария Ивановна",
    objectType: "Дом",
    address: "г. Нижний Новгород, ул. Большая Покровская, д. 30",
    status: "Работает Гигачат",
    currentStage: "Выставление осмотра",
    stages: [
      { name: "Создание заявки", status: "completed", duration: "5 мин" },
      { name: "Формирование перечня", status: "completed", duration: "4 мин" },
      { name: "Запрос документов", status: "completed", duration: "11 мин" },
      { name: "Обработка документов", status: "completed", duration: "14 мин" },
      { name: "Запрос обременений", status: "completed", duration: "8 мин" },
      { name: "Анализ обременений", status: "completed", duration: "13 мин" },
      { name: "Выставление осмотра", status: "in-progress" },
      { name: "Анализ осмотра", status: "pending" },
      { name: "Онлайн Оценка", status: "pending" },
      { name: "Подготовка заключения", status: "pending" }
    ]
  }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-lg shadow-lg">
        <p className="font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function StagesHistogram() {
  const [selectedStage, setSelectedStage] = useState<{ stage: string; status: string } | null>(null);

  const handleBarClick = (data: any) => {
    if (data && data.activePayload && data.activePayload.length > 0) {
      const payload = data.activePayload[0];
      const stage = stagesData.find(s => s.stage === payload.payload.stage);
      if (stage) {
        let status = "";
        if (payload.dataKey === "worksGigaChat") status = "Работает Гигачат";
        else if (payload.dataKey === "expertWork") status = "В работе эксперта";
        else if (payload.dataKey === "requiresConnection") status = "Требуется подключение";
        
        setSelectedStage({ stage: payload.payload.stage, status });
      }
    }
  };

  return (
    <>
      <div className="w-full bg-white rounded-xl shadow-sm border p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Этапы обработки</h2>
          <p className="text-sm text-muted-foreground">Распределение заявок по этапам и статусам</p>
        </div>
        
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={stagesData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 60
            }}
            onClick={handleBarClick}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="stage" 
              angle={-45}
              textAnchor="end"
              height={100}
              interval={0}
              tick={{ fontSize: 12 }}
            />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{
                paddingTop: '20px'
              }}
              formatter={(value) => {
                switch(value) {
                  case 'worksGigaChat': return 'Работает Гигачат';
                  case 'expertWork': return 'В работе эксперта';
                  case 'requiresConnection': return 'Требуется подключение';
                  default: return value;
                }
              }}
            />
            <Bar 
              dataKey="worksGigaChat" 
              fill="#3b82f6" 
              name="worksGigaChat"
              radius={[2, 2, 0, 0]}
              cursor="pointer"
            >
              {stagesData.map((entry, index) => (
                <Cell key={`cell-giga-${index}`} />
              ))}
            </Bar>
            <Bar 
              dataKey="expertWork" 
              fill="#f59e0b" 
              name="expertWork"
              radius={[2, 2, 0, 0]}
              cursor="pointer"
            >
              {stagesData.map((entry, index) => (
                <Cell key={`cell-expert-${index}`} />
              ))}
            </Bar>
            <Bar 
              dataKey="requiresConnection" 
              fill="#ef4444" 
              name="requiresConnection"
              radius={[2, 2, 0, 0]}
              cursor="pointer"
            >
              {stagesData.map((entry, index) => (
                <Cell key={`cell-connection-${index}`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <StageApplicationsDialog 
        isOpen={!!selectedStage}
        onClose={() => setSelectedStage(null)}
        stage={selectedStage?.stage || ""}
        status={selectedStage?.status || ""}
        applications={mockApplications}
      />
    </>
  );
}