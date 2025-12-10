"use client";

import { useState } from "react";
import ApplicationDetails from "./application-details";

interface Application {
  id: string;
  clientName: string;
  objectType: string;
  address: string;
  status: string;
  stages: {
    name: string;
    status: "completed" | "in-progress" | "pending";
    duration?: string;
    reason?: string;
  }[];
}

const mockApplications: Application[] = [
  {
    id: "APP-001",
    clientName: "Иванов Иван Иванович",
    objectType: "Квартира",
    address: "г. Москва, ул. Ленина, д. 10, кв. 5",
    status: "Работает Гигачат",
    stages: [
      { name: "Валидация", status: "completed", duration: "15 мин" },
      { name: "Контроль обременений", status: "completed", duration: "8 мин" },
      { name: "Осмотр", status: "in-progress" },
      { name: "Оценка", status: "pending" },
      { name: "Верификация", status: "pending" }
    ]
  },
  {
    id: "APP-002",
    clientName: "Петров Петр Петрович",
    objectType: "Дом",
    address: "г. Санкт-Петербург, ул. Невская, д. 25",
    status: "Работает Гигачат",
    stages: [
      { name: "Валидация", status: "completed", duration: "12 мин" },
      { name: "Контроль обременений", status: "in-progress" },
      { name: "Осмотр", status: "pending" },
      { name: "Оценка", status: "pending" },
      { name: "Верификация", status: "pending" }
    ]
  },
  {
    id: "APP-003",
    clientName: "Сидоров Сидор Сидорович",
    objectType: "Коммерческое помещение",
    address: "г. Новосибирск, пр. Красный, д. 100",
    status: "В работе эксперта",
    stages: [
      { name: "Валидация", status: "completed", duration: "18 мин" },
      { name: "Контроль обременений", status: "completed", duration: "10 мин" },
      { name: "Осмотр", status: "completed", duration: "45 мин", reason: "Не удалось распознать тип отделки стен на фотографиях" },
      { name: "Оценка", status: "in-progress" },
      { name: "Верификация", status: "pending" }
    ]
  },
  {
    id: "APP-004",
    clientName: "Козлова Анна Сергеевна",
    objectType: "Земельный участок",
    address: "г. Екатеринбург, ул. Садовая, д. 15",
    status: "Собрано с экспертом",
    stages: [
      { name: "Валидация", status: "completed", duration: "20 мин" },
      { name: "Контроль обременений", status: "completed", duration: "12 мин" },
      { name: "Осмотр", status: "completed", duration: "60 мин", reason: "Требуется проверка наличия инженерных коммуникаций" },
      { name: "Оценка", status: "completed", duration: "30 мин", reason: "Сложная конфигурация участка требует ручного расчета" },
      { name: "Верификация", status: "completed", duration: "15 мин" }
    ]
  }
];

interface ApplicationsListProps {
  selectedSector: string | null;
}

export default function ApplicationsList({ selectedSector }: ApplicationsListProps) {
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  if (!selectedSector) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Список заявок</h3>
        <p className="text-gray-500">Выберите сектор на диаграмме для просмотра заявок</p>
      </div>
    );
  }

  const filteredApplications = mockApplications.filter(app => app.status === selectedSector);

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h3 className="text-lg font-semibold mb-4">
        Заявки со статусом: {selectedSector} ({filteredApplications.length})
      </h3>
      
      <div className="space-y-3">
        {filteredApplications.map((app) => (
          <div
            key={app.id}
            className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => setSelectedApplication(app)}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="font-medium text-blue-600">{app.id}</span>
                <h4 className="font-semibold">{app.clientName}</h4>
                <p className="text-sm text-gray-600">{app.objectType}</p>
                <p className="text-sm text-gray-500">{app.address}</p>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  app.status === "Работает Гигачат" ? "bg-blue-100 text-blue-800" :
                  app.status === "Собрано Гигачатом" ? "bg-green-100 text-green-800" :
                  app.status === "В работе эксперта" ? "bg-amber-100 text-amber-800" :
                  "bg-purple-100 text-purple-800"
                }`}>
                  {app.status}
                </span>
              </div>
            </div>
            
            <div className="flex gap-2 mt-3">
              {app.stages.map((stage, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${
                    stage.status === "completed" ? "bg-green-500" :
                    stage.status === "in-progress" ? "bg-blue-500" :
                    "bg-gray-300"
                  }`} />
                  {index < app.stages.length - 1 && (
                    <div className={`w-8 h-0.5 ${
                      index < app.stages.findIndex(s => s.status === "pending") ? "bg-green-500" : "bg-gray-300"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedApplication && (
        <ApplicationDetails
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
        />
      )}
    </div>
  );
}