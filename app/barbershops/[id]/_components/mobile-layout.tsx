import { Prisma } from "@prisma/client";
import BarbershopInfo from "./barbershop-info";
import BarbershopToggleServiceInfo from "./barbershop-toggle-service-info";

interface MobileLayoutProps {
  barbershop: Prisma.BarbershopGetPayload<{
    include: {
      services: true;
      working_days: true;
    };
  }>;
}

const MobileLayout = ({ barbershop }: MobileLayoutProps) => {
  return (
    <>
      <BarbershopInfo barbershop={barbershop} />

      <BarbershopToggleServiceInfo barbershop={barbershop} />
    </>
  );
};

export default MobileLayout;
