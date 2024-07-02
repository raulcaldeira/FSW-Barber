import { db } from "@/app/_lib/prisma";
import { redirect } from "next/navigation";
import Header from "@/app/_components/header";
import MobileLayout from "./_components/mobile-layout";
import DesktopLayout from "./_components/desktop-layout";

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
    <>
      <Header className="hidden lg:block" />
      <section>
        <div className="hidden lg:block">
          <DesktopLayout barbershop={barbershop} />
        </div>
        <div className="lg:hidden">
          <MobileLayout barbershop={barbershop} />
        </div>
      </section>
    </>
  );
};

export default BarbershopDetailsPage;
