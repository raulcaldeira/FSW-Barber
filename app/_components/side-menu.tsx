"use client";
import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  UserIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ReactNode } from "react";

const SideMenu = ({children}:{children: ReactNode}) => {
  const { data } = useSession();

  const handleLoginClick = () => signIn("google");
  const handleLogoutClick = () => signOut();

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>

      <SheetContent className="p-0">
        <SheetHeader className="p-5 text-left border-b border-solid border-secondary">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        {data?.user ? (
          <div className="px-5 py-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Avatar className="bg-secondary flex justify-center items-center">
                <AvatarImage src={data.user.image ?? ""} alt="Profile image" />
                <AvatarFallback className="text-primary">
                  <h2 className="text-xl">
                    {data.user.name?.charAt(0).toUpperCase()}
                  </h2>
                </AvatarFallback>
              </Avatar>
              <h2 className="font-bold">{data.user.name}</h2>
            </div>

            <Button variant="secondary" size="icon" onClick={handleLogoutClick}>
              <LogOutIcon />
            </Button>
          </div>
        ) : (
          <div className="px-5 py-6 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <UserIcon size={30} />
              <h2 className="font-bold">Olá, faça seu login!</h2>
            </div>
            <Button
              variant="secondary"
              className="w-full justify-start"
              onClick={handleLoginClick}
            >
              <LogInIcon className="mr-2" size={18} />
              Fazer Login
            </Button>
          </div>
        )}

        <div className="px-5 flex flex-col gap-3">
          <Button variant="outline" className="justify-start" asChild>
            <Link href="/">
              <HomeIcon size={18} className="mr-2" />
              Início
            </Link>
          </Button>

          {data?.user && (
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/bookings">
                <CalendarIcon size={18} className="mr-2" />
                Agendamentos
              </Link>
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SideMenu;
