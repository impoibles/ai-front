"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Application {
  id: string;
  clientName: string;
  objectType: string;
  address: string;
  status: string;
  totalDuration: string;
  expertStage?: string;
  expertReason?: string;
  stages: {
    name: string;
    status: "completed" | "in-progress" | "pending";
    duration?: string;
  }[];
}

const mockCompletedApplications: Application[] = [
  {
    id: "APP-101",
    clientName: "Алексеев Михаил Петрович",
    objectType: "Квартира",
    address: "г. Москва, ул. Тверская, д. 15, кв. 42",
    status: "Собрано Гигачатом",
    totalDuration: "2 часа 15 минут",
    stages: [
      { name: "Создание заявки", status: "completed", duration: "5 мин" },
      { name: "Формирование перечня", status: "completed", duration: "3 мин" },
      { name: "Запрос документов", status: "completed", duration: "8 мин" },
      { name: "Обработка документов", status: "completed", duration: "12 мин" },
      { name: "Запрос обременений", status: "completed", duration: "6 мин" },
      { name: "Анализ обременений", status: "completed", duration: "15 мин" },
      { name: "Выставление осмотра", status: "completed", duration: "8 мин" },
      { name: "Анализ осмотра", status: "completed", duration: "45 мин" },
      { name: "Онлайн Оценка", status: "completed", duration: "25 мин" },
      { name: "Подготовка заключения", status: "completed", duration: "8 мин" }
    ]
  },
  {
    id: "APP-102",
    clientName: "Беляева Елена Викторовна",
    objectType: "Дом",
    address: "г. Санкт-Петербург, ул. Садовая, д. 33",
    status: "Собрано с экспертом",
    totalDuration: "4 часа 30 минут",
    expertStage: "Анализ осмотра",
    expertReason: "Не удалось определить тип конструктива стен и перекрытий по фотографиям, требовался визуальный осмотр объекта",
    stages: [
      { name: "Создание заявки", status: "completed", duration: "5 мин" },
      { name: "Формирование перечня", status: "completed", duration: "4 мин" },
      { name: "Запрос документов", status: "completed", duration: "10 мин" },
      { name: "Обработка документов", status: "completed", duration: "15 мин" },
      { name: "Запрос обременений", status: "completed", duration: "7 мин" },
      { name: "Анализ обременений", status: "completed", duration: "12 мин" },
      { name: "Выставление осмотра", status: "completed", duration: "8 мин" },
      { name: "Анализ осмотра", status: "completed", duration: "2 часа 15 мин" },
      { name: "Онлайн Оценка", status: "completed", duration: "1 час 20 мин" },
      { name: "Подготовка заключения", status: "completed", duration: "14 мин" }
    ]
  },
  {
    id: "APP-103",
    clientName: "Воробьев Дмитрий Александрович",
    objectType: "Коммерческое помещение",
    address: "г. Новосибирск, пр. Ленина, д. 88",
    status: "Собрано Гигачатом",
    totalDuration: "1 час 45 минут",
    stages: [
      { name: "Создание заявки", status: "completed", duration: "6 мин" },
      { name: "Формирование перечня", status: "completed", duration: "5 мин" },
      { name: "Запрос документов", status: "completed", duration: "12 мин" },
      { name: "Обработка документов", status: "completed", duration: "18 мин" },
      { name: "Запрос обременений", status: "completed", duration: "9 мин" },
      { name: "Анализ обременений", status: "completed", duration: "15 мин" },
      { name: "Выставление осмотра", status: "completed", duration: "10 мин" },
      { name: "Анализ осмотра", status: "completed", duration: "20 мин" },
      { name: "Онлайн Оценка", status: "completed", duration: "15 мин" },
      { name: "Подготовка заключения", status: "completed", duration: "5 мин" }
    ]
  },
  {
    id: "APP-104",
    clientName: "Григорьева Анна Сергеевна",
    objectType: "Земельный участок",
    address: "г. Екатеринбург, ул. Малышева, д. 51",
    status: "Собрано с экспертом",
    totalDuration: "3 часа 20 минут",
    expertStage: "Онлайн Оценка",
    expertReason: "Нестандартная форма участка и наличие сложных рельефных особенностей требовали ручного расчета стоимости",
    stages: [
      { name: "Создание заявки", status: "completed", duration: "7 мин" },
      { name: "Формирование перечня", status: "completed", duration: "6 мин" },
      { name: "Запрос документов", status: "completed", duration: "12 мин" },
      { name: "Обработка документов", status: "completed", duration: "18 мин" },
      { name: "Запрос обременений", status: "completed", duration: "9 мин" },
      { name: "Анализ обременений", status: "completed", duration: "15 мин" },
      { name: "Выставление осмотра", status: "completed", duration: "10 мин" },
      { name: "Анализ осмотра", status: "completed", duration: "25 мин" },
      { name: "Онлайн Оценка", status: "completed", duration: "1 час 45 мин" },
      { name: "Подготовка заключения", status: "completed", duration: "13 мин" }
    ]
  },
  {
    id: "APP-105",
    clientName: "Денисов Игорь Владимирович",
    objectType: "Квартира",
    address: "г. Казань, ул. Баумана, д. 18, кв. 7",
    status: "Собрано Гигачатом",
    totalDuration: "1 час 55 минут",
    stages: [
      { name: "Создание заявки", status: "completed", duration: "4 мин" },
      { name: "Формирование перечня", status: "completed", duration: "3 мин" },
      { name: "Запрос документов", status: "completed", duration: "9 мин" },
      { name: "Обработка документов", status: "completed", duration: "14 мин" },
      { name: "Запрос обременений", status: "completed", duration: "8 мин" },
      { name: "Анализ обременений", status: "completed", duration: "13 мин" },
      { name: "Выставление осмотра", status: "completed", duration: "10 мин" },
      { name: "Анализ осмотра", status: "completed", duration: "35 мин" },
      { name: "Онлайн Оценка", status: "completed", duration: "20 мин" },
      { name: "Подготовка заключения", status: "completed", duration: "9 мин" }
    ]
  },
  {
    id: "APP-106",
    clientName: "Ефимова Ольга Николаевна",
    objectType: "Дом",
    address: "г. Нижний Новгород, ул. Большая Покровская, д. 42",
    status: "Собрано с экспертом",
    totalDuration: "5 часов 10 минут",
    expertStage: "Подготовка заключения",
    expertReason: "Объект имеет историческую ценность, требовалась специальная экспертиза и дополнительные справки",
    stages: [
      { name: "Создание заявки", status: "completed", duration: "5 мин" },
      { name: "Формирование перечня", status: "completed", duration: "4 мин" },
      { name: "Запрос документов", status: "completed", duration: "11 мин" },
      { name: "Обработка документов", status: "completed", duration: "14 мин" },
      { name: "Запрос обременений", status: "completed", duration: "8 мин" },
      { name: "Анализ обременений", status: "completed", duration: "13 мин" },
      { name: "Выставление осмотра", status: "completed", duration: "10 мин" },
      { name: "Анализ осмотра", status: "completed", duration: "30 мин" },
      { name: "Онлайн Оценка", status: "completed", duration: "25 мин" },
      { name: "Подготовка заключения", status: "completed", duration: "3 часа 40 мин" }
    ]
  }
];

interface ApplicationDetailsDialogProps {
  application: Application | null;
  onClose: () => void;
}

function ApplicationDetailsDialog({ application, onClose }: ApplicationDetailsDialogProps) {
  if (!application) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Собрано Гигачатом": return "bg-green-100 text-green-800";
      case "Собрано с экспертом": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={!!application} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Детали заявки {application.id}
            <span className="ml-2">
              <Badge className={getStatusColor(application.status)}>
                {application.status}
              </Badge>
            </span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Клиент</p>
              <p className="font-medium">{application.clientName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Тип объекта</p>
              <p className="font-medium">{application.objectType}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-500">Адрес</p>
              <p className="font-medium">{application.address}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Общий срок</p>
              <p className="font-medium">{application.totalDuration}</p>
            </div>
            {application.expertStage && (
              <div>
                <p className="text-sm text-gray-500">Этап эксперта</p>
                <p className="font-medium">{application.expertStage}</p>
              </div>
            )}
          </div>

          {application.expertReason && (
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-sm font-medium text-purple-800 mb-2">Причина подключения эксперта:</p>
              <p className="text-sm text-purple-700">{application.expertReason}</p>
            </div>
          )}

          <div>
            <h4 className="font-semibold mb-4">Этапы экспертизы</h4>
            <div className="space-y-3">
              {application.stages.map((stage, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-sm font-medium">✓</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{stage.name}</p>
                      {stage.duration && (
                        <span className="text-sm text-gray-500">({stage.duration})</span>
                      )}
                    </div>
                  </div>
                  {index < application.stages.length - 1 && (
                    <div className="w-12 h-0.5 bg-green-300" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function CompletedApplicationsList() {
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Собрано Гигачатом": return "bg-green-100 text-green-800";
      case "Собрано с экспертом": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900">Завершенные заявки</h2>
          <p className="text-sm text-muted-foreground">Заявки со статусами "Собрано Гигачатом" и "Собрано с экспертом"</p>
        </div>
        
        <div className="space-y-3">
          {mockCompletedApplications.map((app) => (
            <div
              key={app.id}
              className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => setSelectedApplication(app)}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-blue-600">{app.id}</span>
                    <Badge className={getStatusColor(app.status)}>
                      {app.status}
                    </Badge>
                  </div>
                  <h4 className="font-semibold mb-1">{app.clientName}</h4>
                  <p className="text-sm text-gray-600 mb-1">{app.objectType}</p>
                  <p className="text-sm text-gray-500">{app.address}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Общий срок</p>
                  <p className="font-medium text-gray-900">{app.totalDuration}</p>
                  {app.expertStage && (
                    <p className="text-xs text-purple-600 mt-1">Эксперт: {app.expertStage}</p>
                  )}
                </div>
              </div>
              
              {app.expertReason && (
                <div className="mt-2 p-2 bg-purple-50 border border-purple-200 rounded text-sm text-purple-700">
                  <span className="font-medium">Причина:</span> {app.expertReason}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <ApplicationDetailsDialog 
        application={selectedApplication}
        onClose={() => setSelectedApplication(null)}
      />
    </>
  );
}