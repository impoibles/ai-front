"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

interface StageApplicationsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  stage: string;
  status: string;
  applications: Application[];
}

export default function StageApplicationsDialog({ 
  isOpen, 
  onClose, 
  stage, 
  status, 
  applications 
}: StageApplicationsDialogProps) {
  const filteredApplications = applications.filter(app => app.status === status);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Работает Гигачат": return "bg-blue-100 text-blue-800";
      case "В работе эксперта": return "bg-amber-100 text-amber-800";
      case "Требуется подключение": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStageStatusIcon = (stageStatus: string) => {
    switch (stageStatus) {
      case "completed":
        return "✓";
      case "in-progress":
        return "⟳";
      default:
        return "○";
    }
  };

  const getStageStatusColor = (stageStatus: string) => {
    switch (stageStatus) {
      case "completed":
        return "text-green-600 bg-green-50";
      case "in-progress":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-400 bg-gray-50";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Заявки на этапе: {stage}
            <span className="ml-2">
              <Badge className={getStatusColor(status)}>
                {status}
              </Badge>
            </span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            Найдено заявок: {filteredApplications.length}
          </div>
          
          <div className="space-y-4">
            {filteredApplications.map((application) => (
              <div
                key={application.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-blue-600">{application.id}</span>
                      <Badge className={getStatusColor(application.status)}>
                        {application.status}
                      </Badge>
                    </div>
                    <h4 className="font-semibold mb-1">{application.clientName}</h4>
                    <p className="text-sm text-gray-600 mb-1">{application.objectType}</p>
                    <p className="text-sm text-gray-500">{application.address}</p>
                  </div>
                  
                  {application.status === "Требуется подключение" && (
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => console.log("Вернуть на автосборку:", application.id)}
                      >
                        Вернуть на автосборку
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => console.log("Назначить эксперта:", application.id)}
                      >
                        Назначить эксперта
                      </Button>
                    </div>
                  )}
                </div>

                {/* Причина для статусов */}
                {application.expertReason && (
                  <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm font-medium text-amber-800 mb-1">Причина передачи эксперту:</p>
                    <p className="text-sm text-amber-700">{application.expertReason}</p>
                  </div>
                )}

                {application.systemReason && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm font-medium text-red-800 mb-1">Системная причина:</p>
                    <p className="text-sm text-red-700">{application.systemReason}</p>
                  </div>
                )}

                {/* Этапы экспертизы */}
                <div>
                  <h5 className="font-medium text-sm text-gray-700 mb-3">Этапы экспертизы</h5>
                  <div className="space-y-2">
                    {application.stages.map((stage, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${getStageStatusColor(stage.status)}`}>
                          {getStageStatusIcon(stage.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium">{stage.name}</p>
                            {stage.duration && (
                              <span className="text-xs text-gray-500">({stage.duration})</span>
                            )}
                          </div>
                        </div>
                        {index < application.stages.length - 1 && (
                          <div className="w-8 h-0.5 bg-gray-300" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredApplications.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Заявки на данном этапе не найдены
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}