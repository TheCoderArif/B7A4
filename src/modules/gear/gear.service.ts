import { prisma } from "../../lib/prisma";

const getAllGearsFromDB = async () => {

    const gears = await prisma.gearItem.findMany({
    include: {
      provider: false,
      category: false,
      reviews: false,
      rentalOrders: false
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return gears;

};



const getSingleGearFromDB = async (gearId : string) => {

    const gear = await prisma.gearItem.findUnique({
    where: {
      id: gearId,
    },
    include: {
      provider: true,
      category: true,
      reviews: true,
      rentalOrders: true,
    },
  });

  if (!gear) {
    throw new Error("Gear not found");
  }

  return gear;

};










export const gearService = {
    getAllGearsFromDB,
    getSingleGearFromDB
};