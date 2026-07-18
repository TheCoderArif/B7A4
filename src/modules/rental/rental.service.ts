import { prisma } from "../../lib/prisma";
import { IRentalOrderPayload } from "./tental.interface";

const createRentalOrderOnDB = async (payload : IRentalOrderPayload) => {


 const gear = await prisma.gearItem.findUnique({
    where: {
      id: payload.gearItemId,
    },
  });

  if (!gear) {
    throw new Error("Gear not found");
  }

  if (gear.available < payload.quantity) {
    throw new Error("Requested quantity is not available");
  }

  const start = new Date(payload.startDate);
  const end = new Date(payload.endDate);

  const rentalDays = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (rentalDays <= 0) {
    throw new Error("End date must be after start date");
  }

  const totalCost = gear.pricePerDay * rentalDays * payload.quantity;

  const result = {

    gearId: gear.id,
    gearName: gear.name,
    pricePerDay: gear.pricePerDay,
    quantity: payload.quantity,
    rentalDays,
    startDate: payload.startDate,
    endDate: payload.endDate,
    totalCost,

  }

  return result;
    

    
};



export const rentalService = {
    createRentalOrderOnDB
};