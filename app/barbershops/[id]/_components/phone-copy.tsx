"use client";

import { BadgeCheckIcon, Smartphone } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { toast } from "sonner";

interface PhoneCopyProps {
  phoneNumber: string;
}

const PhoneCopy = ({ phoneNumber }: PhoneCopyProps) => {
  const handleCopyPhoneNumber = (phoneNumber: string) => {
    navigator.clipboard
      .writeText(phoneNumber)
      .then(() => {
        toast.success("Número copiado para área de transferência!", {
          icon: <BadgeCheckIcon className="text-green-600" size={20} />,
        });
      })
      .catch((error) => {
        console.error("Erro ao copiar número:", error);
        alert("Erro ao copiar número. Por favor, tente novamente.");
      });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="">
        <span className="flex items-center gap-2 text-sm">
          <Smartphone />
          {phoneNumber}
        </span>
      </div>
      <div>
        <Button
          variant="secondary"
          onClick={() => handleCopyPhoneNumber(phoneNumber)}
        >
          Copiar
        </Button>
      </div>
    </div>
  );
};

export default PhoneCopy;
