"use client";
import { Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">Мониторинг AILI</h1>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Select defaultValue="7d">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Выберите период" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Сегодня</SelectItem>
              <SelectItem value="7d">Последние 7 дней</SelectItem>
              <SelectItem value="30d">Последние 30 дней</SelectItem>
              <SelectItem value="90d">Последние 90 дней</SelectItem>
              <SelectItem value="1y">Последний год</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
}