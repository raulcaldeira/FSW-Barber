import { format } from "date-fns";
import Header from "../_components/header";
import { ptBR } from "date-fns/locale";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import Hero from "./_components/hero";
import BarbershopCarousel from "./_components/barbershop-carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../_components/ui/carousel";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const [barbershops, barbershopsMoreVisiteds, confirmedBookings] =
    await Promise.all([
      db.barbershop.findMany({}),
      db.barbershop.findMany({
        orderBy: {
          bookings: {
            _count: "desc",
          },
        },
        take: 10,
      }),
      session?.user
        ? db.booking.findMany({
            where: {
              userId: (session.user as any).id,
              date: {
                gte: new Date(),
              },
            },
            include: {
              service: true,
              barbershop: true,
            },
          })
        : Promise.resolve([]),
    ]);

  const firstNameUser = session?.user?.name?.split(" ")[0];

  return (
    <div>
      <Header />

      <section className="w-full hidden lg:block">
        <Hero
          hasSession={session ? true : false}
          firstNameUser={firstNameUser ? firstNameUser : ""}
          barbershops={barbershops}
          confirmedBookings={confirmedBookings}
        />
      </section>

      <section className="lg:hidden">
        <div className="px-5 pt-5">
          {session?.user ? (
            <h2 className="text-xl font-bold">Olá, {firstNameUser}!</h2>
          ) : (
            <h2 className="text-xl font-bold">Olá, seja bem-vindo!</h2>
          )}
          <p className="capitalize text-sm">
            {format(new Date(), "EEEE',' dd 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
        </div>

        <div className="px-5 mt-6">
          <Search />
        </div>

        {confirmedBookings.length > 0 && (
          <Carousel className="pl-5 mt-6">
            <h2 className="text-xs mb-3 uppercase text-gray-400 font-bold">
              Agendamentos
            </h2>

            <CarouselContent className="">
              {confirmedBookings.map((booking) => (
                <CarouselItem key={booking.id}>
                  <BookingItem booking={booking} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}

        <div className="px-5 mt-6">
          <BarbershopCarousel title="Recomendados" barbershops={barbershops} />
        </div>
      </section>

      <div className="px-5 lg:px-32 mt-6">
        <BarbershopCarousel
          title="Populares"
          barbershops={barbershops.reverse()}
        />
      </div>

      <div className="px-5 lg:px-32 mt-6">
        <BarbershopCarousel
          title="Mais visitados"
          barbershops={barbershopsMoreVisiteds}
        />
      </div>
    </div>
  );
}
