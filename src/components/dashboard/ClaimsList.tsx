"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, AlertCircle, CheckCircle, User, Timer, UserCheck } from "lucide-react";

interface Claim {
  id: string;
  clientName: string;
  status: "Работает AILI" | "Собрано AILI" | "Требует подключения";
  totalTerm: string;
  completionPercentage: number;
  remainingTime: string;
  expertAction?: string;
  reason?: string;
  createdAt: string;
  deadlineDate: string;
}

const mockClaims: Claim[] = [
  {
    id: "CLM-003",
    clientName: "АО 'ТехноПром'",
    status: "Работает AILI",
    totalTerm: "10 дней",
    completionPercentage: 45,
    remainingTime: "5 дней",
    createdAt: "2024-01-16",
    deadlineDate: "2024-01-26"
  },
  {
    id: "CLM-006",
    clientName: "ЗАО 'ИнвестПроект'",
    status: "Работает AILI",
    totalTerm: "12 дней",
    completionPercentage: 30,
    remainingTime: "8 дней",
    createdAt: "2024-01-16",
    deadlineDate: "2024-01-28"
  },
  {
    id: "CLM-007",
    clientName: "ООО 'РосАгро'",
    status: "Требует подключения",
    totalTerm: "15 дней",
    completionPercentage: 55,
    remainingTime: "7 дней",
    expertAction: "Верификация юридических данных",
    reason: "AILI не смог автоматически проверить регистрационные данные компании из-за расхождений в базах данных ЕГРЮЛ",
    createdAt: "2024-01-15",
    deadlineDate: "2024-01-30"
  },
  {
    id: "CLM-010",
    clientName: "ООО 'АвтоСтрой'",
    status: "Собрано AILI",
    totalTerm: "8 дней",
    completionPercentage: 100,
    remainingTime: "Завершено",
    createdAt: "2024-01-18",
    deadlineDate: "2024-01-26"
  },
  {
    id: "CLM-011",
    clientName: "ИП Кузнецов В.П.",
    status: "Работает AILI",
    totalTerm: "14 дней",
    completionPercentage: 65,
    remainingTime: "5 дней",
    createdAt: "2024-01-17",
    deadlineDate: "2024-01-31"
  },
  {
    id: "CLM-012",
    clientName: "АО 'МедТех'",
    status: "Собрано AILI",
    totalTerm: "11 дней",
    completionPercentage: 100,
    remainingTime: "Завершено",
    createdAt: "2024-01-19",
    deadlineDate: "2024-01-30"
  }
];

interface ClaimsListProps {
  filterStatus?: string;
}

const getStatusBadge = (status: Claim["status"]) => {
  switch (status) {
    case "Работает AILI":
      return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Работает AILI</Badge>;
    case "Собрано AILI":
      return <Badge variant="secondary" className="bg-green-100 text-green-800">Собрано AILI</Badge>;
    case "Требует подключения":
      return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Требует подключения</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getStatusIcon = (status: Claim["status"]) => {
  switch (status) {
    case "Работает AILI":
      return <Clock className="h-4 w-4 text-blue-600" />;
    case "Собрано AILI":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case "Требует подключения":
      return <User className="h-4 w-4 text-orange-600" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-600" />;
  }
};

const getProgressColor = (percentage: number) => {
  if (percentage >= 90) return "bg-green-500";
  if (percentage >= 70) return "bg-blue-500";
  if (percentage >= 50) return "bg-yellow-500";
  return "bg-red-500";
};

export default function ClaimsList({ filterStatus }: ClaimsListProps) {
  const filteredClaims = filterStatus 
    ? mockClaims.filter(claim => claim.status === filterStatus)
    : mockClaims;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Перечень заявок {filterStatus && `- ${filterStatus}`}
          <span className="text-sm font-normal text-muted-foreground ml-2">
            ({filteredClaims.length} заявок)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredClaims.map((claim) => (
            <div key={claim.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(claim.status)}
                  <div>
                    <div className="font-medium">{claim.id}</div>
                    <div className="text-sm text-muted-foreground">{claim.clientName}</div>
                  </div>
                </div>
                <div className="text-right">
                  {getStatusBadge(claim.status)}
                  <div className="text-sm text-muted-foreground mt-1">
                    Общий срок: {claim.totalTerm}
                  </div>
                </div>
              </div>
              
              {/* Прогресс выполнения */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Выполнение экспертизы</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{claim.completionPercentage}%</span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Timer className="h-3 w-3" />
                      <span>{claim.remainingTime}</span>
                    </div>
                  </div>
                </div>
                <Progress 
                  value={claim.completionPercentage} 
                  className="h-2"
                />
              </div>
              
              {/* Причины для заявок требующих подключения */}
              {claim.reason && claim.status === "Требует подключения" && (
                <div className="border rounded-md p-3 mt-3 bg-orange-50 border-orange-200">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-orange-600" />
                    <div className="space-y-2">
                      {claim.expertAction && (
                        <div className="text-sm font-medium text-orange-800">
                          Действие эксперта: {claim.expertAction}
                        </div>
                      )}
                      <div className="text-sm text-orange-700">
                        <strong>Почему AILI не смог выполнить:</strong> {claim.reason}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Создана: {claim.createdAt}</span>
                <span>Срок до: {claim.deadlineDate}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}