import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { visitasHoy, estadoColors } from "@/lib/mockData";

const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

// Mock calendar events
const calendarEvents: Record<string, { title: string; tipo: string }[]> = {
  '2026-02-10': [{ title: 'Constructora Caribe', tipo: 'SST' }, { title: 'Logística del Norte', tipo: 'PESV' }],
  '2026-02-12': [{ title: 'Industrias Barlovento', tipo: 'Calidad' }],
  '2026-02-15': [{ title: 'Transportes del Litoral', tipo: 'ISO 28000' }],
  '2026-02-18': [{ title: 'Sol. Portuarias', tipo: 'SST' }],
  '2026-02-20': [{ title: 'Constructora Caribe', tipo: 'SST' }, { title: 'Logística del Norte', tipo: 'PESV' }],
  '2026-02-25': [{ title: 'Industrias Barlovento', tipo: 'Calidad' }],
};

const tipoColor: Record<string, string> = {
  'SST': 'bg-secondary text-secondary-foreground',
  'Calidad': 'bg-primary text-primary-foreground',
  'PESV': 'bg-warning text-warning-foreground',
  'ISO 28000': 'bg-info text-info-foreground',
};

export default function AgendaPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1)); // Feb 2026

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Agenda</h1>
          <p className="text-muted-foreground text-sm">Calendario de visitas y actividades</p>
        </div>
        <Button variant="brand">
          <Plus size={16} className="mr-1" /> Programar Visita
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Calendar */}
        <Card className="lg:col-span-3">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-display">{MONTHS[month]} {year}</CardTitle>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={prevMonth}>
                  <ChevronLeft size={16} />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={nextMonth}>
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-px">
              {DAYS.map(d => (
                <div key={d} className="text-center text-xs font-medium text-muted-foreground py-2">{d}</div>
              ))}
              {days.map((day, i) => {
                const dateStr = day ? `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : '';
                const events = day ? calendarEvents[dateStr] || [] : [];
                const isToday = day === 10 && month === 1 && year === 2026;
                return (
                  <div
                    key={i}
                    className={`min-h-[80px] border rounded-md p-1 ${
                      day ? 'bg-card hover:bg-muted/30 cursor-pointer transition-colors' : ''
                    } ${isToday ? 'ring-2 ring-primary' : ''}`}
                  >
                    {day && (
                      <>
                        <span className={`text-xs font-medium ${isToday ? 'bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center' : 'text-muted-foreground'}`}>
                          {day}
                        </span>
                        <div className="space-y-0.5 mt-1">
                          {events.map((ev, j) => (
                            <div key={j} className={`text-[10px] px-1 py-0.5 rounded truncate ${tipoColor[ev.tipo]}`}>
                              {ev.title}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Today's visits sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-display">Visitas de Hoy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {visitasHoy.map(v => (
                <div key={v.id} className="p-3 rounded-lg border bg-card space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{v.hora}</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${estadoColors[v.estado]}`}>
                      {v.estado}
                    </span>
                  </div>
                  <div className="text-sm font-medium">{v.empresa}</div>
                  <div className="text-xs text-muted-foreground">{v.direccion}</div>
                  <Badge variant="outline" className="text-[10px]">{v.tipo}</Badge>
                  {v.estado === 'Programada' && (
                    <Button variant="brand" size="sm" className="w-full mt-1 h-8 text-xs">
                      Iniciar Visita
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
