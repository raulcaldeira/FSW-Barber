"use client";

import { Prisma } from "@prisma/client";
import ServiceItem from "./service-item";
import { useSession } from "next-auth/react";
import { Button } from "@/app/_components/ui/button";
import { useState } from "react";
import PhoneCopy from "./phone-copy";
import { convertMinuteToHour } from "../_helpers/hours";

interface BarbershopToggleServiceInfoProps {
  barbershop: Prisma.BarbershopGetPayload<{
    include: {
      services: true;
      working_days: true;
    };
  }>;
}

const BarbershopToggleServiceInfo = ({
  barbershop,
}: BarbershopToggleServiceInfoProps) => {
  const session = useSession();
  const [showServices, setShowServices] = useState(true);

  const handleButtonClick = (showServices: boolean) => () =>
    setShowServices(showServices);

  const weekDays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];

  const workingDays = [
    ...barbershop.working_days.slice(1),
    barbershop.working_days[0],
  ];

  return (
    <>
      <div className="mt-6 pl-5 flex gap-2">
        <Button
          variant={showServices ? "default" : "outline"}
          onClick={handleButtonClick(true)}
        >
          Serviços
        </Button>
        <Button
          variant={showServices ? "outline" : "default"}
          onClick={handleButtonClick(false)}
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
            {[barbershop.phoneNumberOne, barbershop.phoneNumberTwo]
              .filter(Boolean)
              .map((phoneNumber, index) => (
                <PhoneCopy key={index} phoneNumber={phoneNumber!} />
              ))}
          </div>

          <div className="mb-6 flex flex-col gap-2">
            {workingDays.map((weekDay) => {
              const startTime =
                weekDay.startTime && convertMinuteToHour(weekDay.startTime);
              const endTime =
                weekDay.endTime && convertMinuteToHour(weekDay.endTime);
              return (
                <div
                  key={weekDay.id}
                  className="flex justify-between items-center"
                >
                  <span className="text-sm text-gray-400 capitalize">
                    {weekDays[weekDay.dayOfWeek]}
                  </span>
                  <span className="text-sm">
                    {weekDay.isOpen ? `${startTime} - ${endTime}` : "Fechado"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default BarbershopToggleServiceInfo;
