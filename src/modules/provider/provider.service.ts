import { prisma } from "../../lib/prisma";

const addGearIntoDB = async (payload : any, id: string) => {



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


export const providerService = {
    addGearIntoDB
};