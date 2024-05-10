import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import Search from "./search";
import { Barbershop, Prisma } from "@prisma/client";
import BarbershopCarousel from "./barbershop-carousel";
import BookingItem from "@/app/_components/booking-item";

interface HeroProps {
  hasSession: boolean;
  firstNameUser: string;
  barbershops: Barbershop[];
  confirmedBookings: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>[];
}

const Hero = ({
  hasSession,
  firstNameUser,
  barbershops,
  confirmedBookings,
}: HeroProps) => {
  return (
    <div className="w-full px-32 py-16 relative flex flex-row justify-around gap-32">
      <Image
        src="/hero-home-bg.png"
        alt="imagem de fundo"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <div className="min-w-[439px] flex flex-col gap-11 z-50">
        <div>
          <h2 className="text-xl">
            Olá,{" "}
            <span className="font-bold">
              {firstNameUser ? `${firstNameUser}!` : "Faça seu login!"}
            </span>
          </h2>
          <p className="capitalize text-sm text-gray-400">
            {format(new Date(), "EEEE',' dd 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
        </div>

        <Search />

        {hasSession && (
          <div className="mt-6">
            <h2 className="pl-5 text-xs mb-3 uppercase text-gray-400 font-bold">
              Agendamentos
            </h2>

            <div className="px-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 z-50" style={{ maxWidth: "calc(100% - 439px)" }}>
        <BarbershopCarousel title="Recomendados" barbershops={barbershops} />
      </div>
    </div>
  );
};

export default Hero;
