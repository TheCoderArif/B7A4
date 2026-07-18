import { prisma } from "../../lib/prisma";

const getAllGearsFromDB = async () => {

    const gears = await prisma.gearItem.findMany({
    include: {
      provider: true,
      category: true,
      reviews: true,
      rentalOrders: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return gears;

};










export const gearService = {
    getAllGearsFromDB
};