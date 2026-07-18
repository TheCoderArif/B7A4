import { prisma } from "../../lib/prisma";
import { IRentalOrderPayload } from "./tental.interface";

const createRentalOrderOnDB = async (payload : IRentalOrderPayload, customerId : string) => {


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

  const rentalOrder = await prisma.rentalOrder.create({
    data: {
      startDate: payload.startDate,
      endDate: payload.endDate,
      quantity: payload.quantity,
      totalAmount: totalCost,

      customer: {
        connect: {
          id: customerId,
        },
      },

      gearItem: {
        connect: {
          id: payload.gearItemId,
        },
      },
    },
  });

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

const getRentalOrdersFromDB = async () => {


 
     const rentalOrders = await prisma.rentalOrder.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return rentalOrders;

    
};



const getRentalOrderDetailsFromDB = async (rentalOrderId : string) => {


    const rentalOrder = await prisma.rentalOrder.findUnique({
    where: {
      id: rentalOrderId,
    },
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
      gearItem: {
        select: {
          id: true,
          name: true,
          image: true,
          pricePerDay: true,
          category: true,
          provider: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
      payment: true,
    },
  });

  if (!rentalOrder) {
    throw new Error("Rental order not found");
  }

  return rentalOrder;


 
     

    
};




export const rentalService = {
    createRentalOrderOnDB,
    getRentalOrdersFromDB,
    getRentalOrderDetailsFromDB
};