import { Card, CardContent } from "@/app/_components/ui/card";
import { Prisma } from "@prisma/client";
import { MapPinIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import ServiceItem from "./service-item";
import { getServerSession, Session } from "next-auth";
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import BarbershopTotalInfo from "./barbershop-card-total-info";

interface MobileLayoutProps {
  barbershop: Prisma.BarbershopGetPayload<{
    include: {
      services: true;
      working_days: true;
    };
  }>;
}

type SessionStatus = "authenticated" | "unauthenticated" | "loading" | "error";

interface ServerSessionWithStatus extends Session {
  status: SessionStatus;
}

const DesktopLayout = async ({ barbershop }: MobileLayoutProps) => {
  const session = (await getServerSession()) as ServerSessionWithStatus;

  return (
    <section className="mt-10 px-32 flex justify-center gap-10">
      <div className="">
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          layout="responsive"
          width={758}
          height={487}
          quality={100}
          style={{ minWidth: "550px" }}
        />

        <div className="mt-5 flex justify-between">
          <div className="">
            <h1 className="text-xl font-bold">{barbershop.name}</h1>
            <div className="flex items-center gap-2 mt-3">
              <MapPinIcon className="text-primary" size={18} />
              <p className="text-sm">{barbershop.address}</p>
            </div>
          </div>
          <Card className="px-5 py-2 flex flex-col items-center rounded-lg">
            <div className="flex items-center gap-2">
              <StarIcon className="text-primary" fill="#8162FF" size={18} />
              <span className="text-lg font-bold">5,0</span>
            </div>
            <p className="text-sm text-gray-400">899 avaliações</p>
          </Card>
        </div>

        <div className="mt-10">
          <h2 className="uppercase text-gray-400 opacity-85">SERVIÇOS</h2>

          <div className="mt-3 grid lg:grid-cols-1 xl:grid-cols-2 gap-5">
            {barbershop.services.map((service) => (
              <ServiceItem
                key={service.id}
                barbershop={barbershop}
                service={service}
                isAuthenticated={session?.status === "authenticated"}
              />
            ))}
          </div>
        </div>
      </div>
      <Card className="max-w-[386px] min-w-[320px] h-fit">
        <CardContent className="p-5">
          <div className="relative h-[180px] w-full">
            <Image src="/barbershop-map.png" fill alt={barbershop.name} />

            <div className="w-full absolute bottom-4 left-0 px-5">
              <Card>
                <CardContent className="p-3 flex gap-2">
                  <Avatar>
                    <AvatarImage src={barbershop.imageUrl} />
                  </Avatar>

                  <div>
                    <h2 className="font-bold">{barbershop.name}</h2>
                    <h3 className="text-xs overflow-hidden text-nowrap text-ellipsis">
                      {barbershop.address}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <BarbershopTotalInfo barbershop={barbershop} />
        </CardContent>
      </Card>
    </section>
  );
};

export default DesktopLayout;
