"use client";

import { useState } from "react";
import CollateralTrackingChart from "@/components/collateral-tracking-chart";
import ApplicationsList from "@/components/applications-list";
import SpeedGauges from "@/components/speed-gauges";
import ExternalServicesGauges from "@/components/external-services-gauges";
import StagesHistogram from "@/components/stages-histogram";
import CompletedApplicationsList from "@/components/completed-applications-list";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

export default function Home() {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date()
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Выбор временного интервала */}
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Период анализа</h2>
                <p className="text-sm text-muted-foreground">
                  {dateRange.from && dateRange.to
                    ? `${format(dateRange.from, "dd.MM.yyyy", { locale: ru })} - ${format(
                        dateRange.to,
                        "dd.MM.yyyy",
                        { locale: ru }
                      )}`
                    : "Выберите период"}
                </p>
              </div>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[300px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "dd.MM.yyyy", { locale: ru })} -{" "}
                          {format(dateRange.to, "dd.MM.yyyy", { locale: ru })}
                        </>
                      ) : (
                        format(dateRange.from, "dd.MM.yyyy", { locale: ru })
                      )
                    ) : (
                      <span>Выберите даты</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    locale={ru}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <SpeedGauges />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <CollateralTrackingChart 
              onSectorClick={setSelectedSector}
              selectedSector={selectedSector}
            />
            <ApplicationsList selectedSector={selectedSector} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Всего объектов</p>
                  <p className="text-2xl font-bold text-gray-900">1,247</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Обработано сегодня</p>
                  <p className="text-2xl font-bold text-gray-900">89</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Завершено</p>
                  <p className="text-2xl font-bold text-gray-900">1,002</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <StagesHistogram />

          <div className="mt-8">
            <CompletedApplicationsList />
          </div>

          <ExternalServicesGauges />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}