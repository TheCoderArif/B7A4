import { prisma } from "../../lib/prisma";
import sendResponse from "../../utilities/sendResponse";
import { IGearPayload, IUpdateGearPayload } from "./provider.interface";

const addGearIntoDB = async (payload : IGearPayload, id: string) => {

    



    const {name, description, image, pricePerDay, quantity, available, status, categoryId} = payload;

    const providerId = id;
    console.log(providerId);


    const gear = await prisma.gearItem.create({
    data: {
      name,
      description,
      image,
      pricePerDay,
      quantity,
      available,
      status,

      // Existing provider ID
      provider: {
        connect: {
          id: providerId,
        },
      },

      // Existing category ID
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
  });

  return gear;



};


const updateGearIntoDB = async (gearId : string, payload: IUpdateGearPayload, providerId : string) => {

    const gear = await prisma.gearItem.findUniqueOrThrow({
        where: {
            id : gearId
        }
    });
    const {name, description, image, pricePerDay, quantity, available, status, categoryId} = payload;

    if (!gear){
        throw new Error("Gear not found");
    }

    const result = await prisma.gearItem.update({
  where: {
    id: gearId,
  },
  data: {
    name,
    description,
    image,
    pricePerDay,
    quantity,
    available,
    status,
    category: {
      connect: {
        id: categoryId,
      },
    },
    provider: {
      connect: {
        id: providerId,
      },
    },
  },
});

    return result;

};


const deleteGearFromDB = async (gearId : string) => {

  const gear = await prisma.gearItem.findUniqueOrThrow({
        where: {
            id : gearId
        }
    });

    if (!gear) {
      throw new Error("Gear not exists!!");
      
    }



   const result = await prisma.gearItem.delete({
  where: {
    id: gearId,
  },
});

  return result;


};



const getIncomingRentalOrdersFromDB = async () => {


 
     const rentalOrders = await prisma.rentalOrder.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return rentalOrders;

    
};


const updateRentalOrderStatusOnDB = async ( rentalOrderId: string,
  status: 'PLACED' | 'CONFIRMED'| 'RETURNED'| 'CANCELLED') => {

    const rentalOrder = await prisma.rentalOrder.findUnique({
    where: {
      id: rentalOrderId,
    },
  });

  if (!rentalOrder) {
    throw new Error("Rental order not found");
  }

  // Update the status
  const result = await prisma.rentalOrder.update({
    where: {
      id: rentalOrderId,
    },
    data: {
      status,
    },
  });

  return result;

};







export const providerService = {
    addGearIntoDB,
    updateGearIntoDB,
    deleteGearFromDB,
    getIncomingRentalOrdersFromDB,
    updateRentalOrderStatusOnDB
};