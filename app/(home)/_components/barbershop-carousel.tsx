import { Barbershop } from "@prisma/client";
import BarbershopItem from "./barbershop-item";

interface BarbershopCarouselProps {
  title: string;
  barbershops: Barbershop[];
}

const BarbershopCarousel = ({
  title,
  barbershops,
}: BarbershopCarouselProps) => {
  return (
    <div>
      <h2 className="px-5 text-xs lg:text-sm mb-3 uppercase text-gray-40 font-bold">
        {title}
      </h2>

      <div className="flex px-5 gap-4 lg:gap-5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {barbershops.map((barbershop) => (
          <div key={barbershop.id} className="min-w-[167px] lg:min-w-[221px] max-w-[167px] lg:max-w-[221px]">
            <BarbershopItem barbershop={barbershop} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarbershopCarousel;
