"use client";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { CalendarDays, CircleUserRound, MenuIcon } from "lucide-react";
import SideMenu from "./side-menu";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Search from "../(home)/_components/search";
import clsx from "clsx";

interface HeaderProps {
  className?: string;
  searchIsShown?: boolean;
  searchValue?: string;
}

const Header = ({
  className,
  searchIsShown = true,
  searchValue,
}: HeaderProps) => {
  const { data } = useSession();
  const router = useRouter();
  const currentRoute = usePathname();

  function handleClickBookingsButton() {
    router.push("/bookings");
  }

  function handleClickLoginButton() {
    signIn("google");
  }

  return (
    <header className={clsx(className)}>
      <Card>
        <CardContent className="p-5 lg:px-32 lg:gap-11 justify-between flex flex-row items-center">
          <Link href="/">
            <Image src="/logo.png" alt="FSW Barber" height={22} width={120} />
          </Link>

          <SideMenu>
            <Button variant="outline" size="icon" className="lg:hidden h-8 w-8">
              <MenuIcon size={18} />
            </Button>
          </SideMenu>

          {searchIsShown && (
            <div className="hidden lg:block flex-1 max-w-[935px]">
              <Search
                defaultValues={{
                  search: searchValue ? searchValue : "",
                }}
              />
            </div>
          )}

          <div className="hidden lg:flex items-center">
            <Button
              variant="ghost"
              className="flex gap-2"
              onClick={() => handleClickBookingsButton()}
            >
              <CalendarDays size={20} />
              Agendamentos
            </Button>
            {data?.user ? (
              <SideMenu>
                <Button
                  variant="ghost"
                  className="flex gap-2 font-bold hover:bg-transparent"
                >
                  <Avatar className="bg-secondary flex justify-center items-center max-w-9 max-h-9">
                    <AvatarImage
                      src={data?.user?.image ?? ""}
                      alt="Profile image"
                    />
                    <AvatarFallback className="text-primary">
                      <h2 className="text-lg">
                        {data?.user?.name?.charAt(0).toUpperCase()}
                      </h2>
                    </AvatarFallback>
                  </Avatar>
                  {data?.user?.name}
                </Button>
              </SideMenu>
            ) : (
              <Button
                className="flex gap-2 font-bold"
                onClick={() => handleClickLoginButton()}
              >
                <CircleUserRound size={20} />
                Fazer Login
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </header>
  );
};

export default Header;
