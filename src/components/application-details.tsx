"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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

interface ApplicationDetailsProps {
  application: Application;
  onClose: () => void;
}

export default function ApplicationDetails({ application, onClose }: ApplicationDetailsProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return "✓";
      case "in-progress":
        return "⟳";
      default:
        return "○";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50";
      case "in-progress":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-400 bg-gray-50";
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Детали заявки {application.id}</DialogTitle>
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
            <div className="col-span-2">
              <p className="text-sm text-gray-500">Статус</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                application.status === "Работает Гигачат" ? "bg-blue-100 text-blue-800" :
                application.status === "Собрано Гигачатом" ? "bg-green-100 text-green-800" :
                application.status === "В работе эксперта" ? "bg-amber-100 text-amber-800" :
                "bg-purple-100 text-purple-800"
              }`}>
                {application.status}
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Этапы экспертизы</h4>
            <div className="space-y-3">
              {application.stages.map((stage, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${getStatusColor(stage.status)}`}>
                    {getStatusIcon(stage.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{stage.name}</p>
                      {stage.duration && (
                        <span className="text-sm text-gray-500">({stage.duration})</span>
                      )}
                    </div>
                    {stage.reason && (
                      <div className="mt-1 p-2 bg-amber-50 border border-amber-200 rounded text-sm text-amber-800">
                        <span className="font-medium">Причина передачи эксперту:</span> {stage.reason}
                      </div>
                    )}
                  </div>
                  {index < application.stages.length - 1 && (
                    <div className="absolute left-4 mt-8 w-0.5 h-6 bg-gray-300" />
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