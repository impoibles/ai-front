"use client";
import { useState, useEffect } from "react";
import { TrendingUp, Clock, CheckCircle, AlertCircle, FileText, Activity, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GaugeChart from "@/components/dashboard/GaugeChart";
import PieChartSection from "@/components/dashboard/PieChartSection";
import ClaimsList from "@/components/dashboard/ClaimsList";
import ServiceSpeedometer from "@/components/dashboard/ServiceSpeedometer";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function DashboardPage() {
  const [currentSpeed, setCurrentSpeed] = useState(127);
  const [maxSpeed] = useState(200);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  
  // Данные для круговой диаграммы
  const pieChartData = [
    { name: "Работает AILI", value: 45, color: "#3b82f6" },
    { name: "Собрано AILI", value: 120, color: "#22c55e" },
    { name: "Требует подключения", value: 35, color: "#f97316" }
  ];
  
  // Моковые данные для статистики
  const stats = [
    {
      title: "Скорость обработки заявок",
      value: "127",
      icon: TrendingUp,
      color: "text-blue-600",
      isGauge: true,
      clickable: false
    },
    {
      title: "Собрано AILI",
      value: "127",
      icon: CheckCircle,
      color: "text-green-600",
      clickable: true
    },
    {
      title: "Поступило заявок",
      value: "89",
      icon: FileText,
      color: "text-blue-600",
      clickable: false
    },
    {
      title: "Требует подключения",
      value: "8",
      icon: AlertCircle,
      color: "text-orange-600",
      clickable: true,
      extraHeight: true
    },
    {
      title: "Работает AILI",
      value: "45",
      icon: Activity,
      color: "text-green-600",
      clickable: true,
      extraHeight: true
    },
    {
      title: "Автономность",
      value: "94.2%",
      icon: Zap,
      color: "text-blue-600",
      clickable: false,
      extraHeight: true
    }
  ];

  // Данные для спидометров внешних сервисов
  const [serviceSpeeds, setServiceSpeeds] = useState([
    { name: "ЕГРН", current: 850, average: 1000 },
    { name: "ЕСИН", current: 1200, average: 1500 },
    { name: "ЕФР", current: 600, average: 800 },
    { name: "ГИБДД", current: 1800, average: 2000 },
    { name: "Онлайн Оценка", current: 450, average: 500 }
  ]);

  // Симуляция обновления данных в реальном времени
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSpeed(prev => {
        const change = Math.floor(Math.random() * 11) - 5;
        const newValue = prev + change;
        return Math.max(80, Math.min(180, newValue));
      });

      // Обновляем скорости внешних сервисов
      setServiceSpeeds(prev => prev.map(service => ({
        ...service,
        current: Math.max(
          service.average * 0.3,
          Math.min(service.average * 2.5, service.current + (Math.random() - 0.5) * 200)
        )
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSectorClick = (sector: string) => {
    setSelectedSector(sector === selectedSector ? null : sector);
  };

  const handleStatClick = (title: string) => {
    handleSectorClick(title);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="space-y-8">
          {/* Заголовок */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Панель мониторинга</h2>
            <p className="text-muted-foreground">
              Отслеживание работы AI-агента AILI в реальном времени
            </p>
          </div>

          {/* Основная секция: слева круговая диаграмма, справа статистика */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Левая часть - Распределение заявок */}
            <Card className="h-[400px]">
              <CardHeader>
                <CardTitle className="text-center">Распределение заявок</CardTitle>
              </CardHeader>
              <CardContent className="h-[calc(100%-5rem)]">
                <PieChartSection 
                  data={pieChartData} 
                  onSectorClick={handleSectorClick}
                  selectedSector={selectedSector}
                />
              </CardContent>
            </Card>

            {/* Правая часть - Статистические блоки в две линии */}
            <div className="space-y-4">
              <div className="grid gap-4 grid-cols-3">
                {stats.slice(0, 3).map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <Card 
                      key={index}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        stat.clickable && selectedSector === stat.title 
                          ? 'ring-2 ring-blue-500 ring-offset-2' 
                          : ''
                      } ${stat.extraHeight ? 'h-[calc(100%+60px)]' : ''}`}
                      onClick={() => stat.clickable && handleStatClick(stat.title)}
                    >
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-medium">
                          {stat.title}
                        </CardTitle>
                        <Icon className={`h-3 w-3 ${stat.color}`} />
                      </CardHeader>
                      <CardContent>
                        {stat.isGauge ? (
                          <div className="h-16">
                            <GaugeChart 
                              value={currentSpeed} 
                              max={maxSpeed} 
                              label="заявок/день" 
                            />
                          </div>
                        ) : (
                          <div className="text-lg font-bold">{stat.value}</div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              <div className="grid gap-4 grid-cols-3">
                {stats.slice(3).map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <Card 
                      key={index + 3}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        stat.clickable && selectedSector === stat.title 
                          ? 'ring-2 ring-blue-500 ring-offset-2' 
                          : ''
                      } ${stat.extraHeight ? 'h-[calc(100%+60px)]' : ''}`}
                      onClick={() => stat.clickable && handleStatClick(stat.title)}
                    >
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-medium">
                          {stat.title}
                        </CardTitle>
                        <Icon className={`h-3 w-3 ${stat.color}`} />
                      </CardHeader>
                      <CardContent>
                        <div className="text-lg font-bold">{stat.value}</div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Спидометры внешних сервисов */}
          <Card>
            <CardHeader>
              <CardTitle>Скорость ответов внешних сервисов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-5">
                {serviceSpeeds.map((service, index) => (
                  <ServiceSpeedometer
                    key={index}
                    serviceName={service.name}
                    currentSpeed={Math.round(service.current)}
                    averageSpeed={service.average}
                    unit="мс"
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Перечень заявок */}
          <ClaimsList filterStatus={selectedSector || undefined} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}