import { db } from "@/app/_lib/prisma";
import BarbershopInfo from "./_components/barbershop-info";
import { redirect } from "next/navigation";
import BarbershopToggleServiceInfo from "./_components/barbershop-toggle-service-info";

interface BarbershopDetailsPageProps {
  params: {
    id?: string;
  };
}

const BarbershopDetailsPage = async ({
  params,
}: BarbershopDetailsPageProps) => {
  if (!params.id) {
    return redirect("/");
  }

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
      working_days: { orderBy: { dayOfWeek: "asc" } },
    },
  });

  if (!barbershop) {
    return redirect("/");
  }

  return (
    <div>
      <BarbershopInfo barbershop={barbershop} />

      <BarbershopToggleServiceInfo barbershop={barbershop} />
    </div>
  );
};

export default BarbershopDetailsPage;
