import SideMenu from "@/app/_components/side-menu";
import { Button } from "@/app/_components/ui/button";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BarbershopInfoProps {
  barbershop: Barbershop;
}

const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
  return (
    <>
      <div className="h-[250px] w-full relative">
        <Link href={"/"}>
          <Button
            size="icon"
            variant="outline"
            className="z-50 absolute top-4 left-4 rounded-full"
            asChild
          >
            <ChevronLeftIcon />
          </Button>
        </Link>

        <SideMenu>
          <Button
            size="icon"
            variant="outline"
            className="z-50 absolute top-4 right-4 rounded-full"
          >
            <MenuIcon />
          </Button>
        </SideMenu>

        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          style={{ objectFit: "cover" }}
          className="opacity-75"
        />
      </div>

      <div className="px-5 pt-3 pb-6 border-b border-solid border-secondary">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>
        <div className="flex items-center gap-2 mt-3">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop.address}</p>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <StarIcon className="text-primary" size={18} />
          <p className="text-sm">
            5,0 <span className="text-gray-400">(899 avaliações)</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default BarbershopInfo;
