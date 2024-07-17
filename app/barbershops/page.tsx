import BarbershopItem from "../(home)/_components/barbershop-item";
import Search from "../(home)/_components/search";
import Header from "../_components/header";
import { db } from "../_lib/prisma";

interface BarbershopsPageProps {
  searchParams: {
    search?: string;
  };
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
  });

  return (
    <>
      <Header searchValue={searchParams.search ? searchParams.search : ""} />

      <div className="px-5 py-6 flex flex-col gap-6">
        <Search
          className="md:hidden"
          defaultValues={{
            search: searchParams.search ? searchParams.search : "",
          }}
        />
        {searchParams.search && searchParams.search.length > 0 && (
          <h1 className="text-gray-400 font-bold text-xs uppercase">
            Resultados para &quot;{searchParams.search}&quot;
          </h1>
        )}

        <div className="md:mx-0 grid grid-cols-1 sm:grid-cols-2 gap-4 md:flex md:flex-wrap">
          {barbershops.map((barbershop) => (
            <div key={barbershop.id} className="min-w-56 max-w-56">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BarbershopsPage;
