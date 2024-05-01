-- CreateTable
CREATE TABLE "working_days" (
    "id" TEXT NOT NULL,
    "dayOfWeek" TEXT NOT NULL,
    "isOpen" BOOLEAN NOT NULL,
    "startTime" TEXT,
    "endTime" TEXT,
    "barbershopId" TEXT NOT NULL,

    CONSTRAINT "working_days_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "working_days" ADD CONSTRAINT "working_days_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "barbershops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
