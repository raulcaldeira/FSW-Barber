import { Barbershop } from "@prisma/client";
import BarbershopItem from "./barbershop-item";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/_components/ui/carousel";

interface BarbershopCarouselProps {
  title: string;
  barbershops: Barbershop[];
}

const BarbershopCarousel = ({
  title,
  barbershops,
}: BarbershopCarouselProps) => {
  return (
    <Carousel opts={{ dragFree: true }}>
      <h2 className="text-xs lg:text-sm mb-3 uppercase text-gray-40 font-bold">
        {title}
      </h2>
    
      <CarouselPrevious className="hidden lg:flex" />
      <CarouselContent>
        {barbershops.map((barbershop) => (
          <CarouselItem
            key={barbershop.id}
            className="md:basis-1/2 lg:basis-1/3 min-w-[167px] lg:min-w-[221px] max-w-[167px] lg:max-w-[221px]"
          >
            <BarbershopItem barbershop={barbershop} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="hidden lg:flex" />
    </Carousel>
  );
};

export default BarbershopCarousel;
