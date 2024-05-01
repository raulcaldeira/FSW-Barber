import { setHours, setMinutes, format, addMinutes } from "date-fns";
import { ptBR } from "date-fns/locale";

export function generateDayTimeList(date: Date): string[] {
  const startTime = setMinutes(setHours(date, 9), 0); // Set start time to 09:00
  const endTime = setMinutes(setHours(date, 21), 0); // Set end time to 21:00
  const interval = 45; // interval in minutes
  const timeList: string[] = [];

  let currentTime = startTime;

  while (currentTime <= endTime) {
    timeList.push(format(currentTime, "HH:mm"));
    currentTime = addMinutes(currentTime, interval);
  }

  return timeList;
}

export function convertMinuteToHour(minutes: number) {
  // Extrair as horas e minutos dos minutos fornecidos
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  // Criar uma nova data com as horas e minutos extraídos
  const date = setHours(setMinutes(new Date(), remainingMinutes), hours);

  // Formatando a hora
  const formattedTime = format(date, "HH:mm");

  return formattedTime;
}
