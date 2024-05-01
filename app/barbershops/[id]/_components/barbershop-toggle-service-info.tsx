"use client";
import { Prisma } from "@prisma/client";
import ServiceItem from "./service-item";
import { useSession } from "next-auth/react";
import { Button } from "@/app/_components/ui/button";
import { useState } from "react";
import PhoneCopy from "./phone-copy";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BarbershopToggleServiceInfoProps {
  barbershop: Prisma.BarbershopGetPayload<{
    include: {
      services: true;
    };
  }>;
}

const BarbershopToggleServiceInfo = ({
  barbershop,
}: BarbershopToggleServiceInfoProps) => {
  const session = useSession();

  const [showServices, setShowServices] = useState(true);

  const workingDays = {
    Domingo: false,
    "Segunda-Feira": false,
    "Terça-Feira": true,
    "Quarta-Feira": true,
    "Quinta-Feira": true,
    "Sexta-Feira": true,
    Sábado: true,
  };

  return (
    <>
      <div className="mt-6 pl-5 flex gap-2">
        <Button
          variant={showServices ? "default" : "outline"}
          onClick={() => setShowServices(true)}
        >
          Serviços
        </Button>
        <Button
          variant={showServices ? "outline" : "default"}
          onClick={() => setShowServices(false)}
        >
          Informações
        </Button>
      </div>

      {showServices ? (
        <div className="px-5 py-6 flex flex-col gap-4">
          {barbershop.services.map((service) => (
            <ServiceItem
              key={service.id}
              barbershop={barbershop}
              service={service}
              isAuthenticated={session.status === "authenticated"}
            />
          ))}
        </div>
      ) : (
        <div className="px-5 py-6 flex flex-col gap-4">
          <div className="pb-6 mb-6 border-b border-solid border-secondary">
            <h2 className="text-xs text-gray-400 uppercase">Sobre nós</h2>
            <p className="mt-3 text-sm">{barbershop.description}</p>
          </div>

          <div className="flex flex-col gap-3 pb-6 mb-6 border-b border-solid border-secondary">
            <PhoneCopy phoneNumber={barbershop.phoneNumberOne} />

            {barbershop.phoneNumberTwo && (
              <PhoneCopy phoneNumber={barbershop.phoneNumberTwo} />
            )}
          </div>

          <div className="mb-6 flex flex-col gap-2">
            {Object.entries(workingDays).map((weekDay) => (
              <div key={weekDay[0]} className="flex justify-between items-center">
                <span className="text-sm text-gray-400">{weekDay[0]}</span>
                <span className="text-sm">
                  {weekDay[1] ? "09-00 - 21:00" : "Fechado"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default BarbershopToggleServiceInfo;
