import { Prisma, Service } from "@prisma/client";
import {
  setHours,
  setMinutes,
  format,
  addMinutes,
  getDay,
  isBefore,
} from "date-fns";

export function generateDayTimeList(
  barbershop: Prisma.BarbershopGetPayload<{
    include: {
      working_days: true;
    };
  }>,
  service: Service,
  date: Date
): string[] {
  const weekDay = getDay(date);
  console.log(weekDay);
  const startTime = setMinutes(
    setHours(
      date,
      barbershop.working_days.find((day) => day.dayOfWeek === weekDay)
        ?.startTime! / 60
    ),
    0
  );
  const endTime = setMinutes(
    setHours(
      date,
      barbershop.working_days.find((day) => day.dayOfWeek === weekDay)
        ?.endTime! / 60
    ),
    0
  );
  const interval = service.duration; // interval in minutes
  const timeList: string[] = [];

  let currentTime = startTime;

  while (currentTime <= endTime) {
    if (isBefore(currentTime, new Date())) {
      currentTime = addMinutes(currentTime, interval);
      continue;
    }
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
