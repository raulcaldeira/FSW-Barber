"use server";

import { db } from "@/app/_lib/prisma";
import { endOfDay, startOfDay } from "date-fns";

export const getDayBookings = async (
  barbershopId: string,
  date: Date,
  userId: string
) => {
  const [userBookingsInDate, bookings] = await Promise.all([
    db.booking.findMany({
      where: {
        userId: userId,
        date: {
          lte: endOfDay(date),
          gte: startOfDay(date),
        },
      },
    }),
    db.booking.findMany({
      where: {
        barbershopId: barbershopId,
        date: {
          lte: endOfDay(date),
          gte: startOfDay(date),
        },
      },
    }),
  ]);

  if (userBookingsInDate.length > 0) {
    // Filtrar reservas indisponíveis para o usuário
    const unavailableBookings = userBookingsInDate.filter(
      (booking) => barbershopId !== booking.barbershopId
    );

    // Adicionar as reservas indisponíveis à lista de reservas
    bookings.push(...unavailableBookings);
  }

  return bookings;
};
