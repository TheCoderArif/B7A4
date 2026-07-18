import { prisma } from "../../lib/prisma";

const getAllUsersFromDB = async () => {

    const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return users;

};


const updateUserStatusOnDB = async ( userId: string, status: "ACTIVE" | "SUSPENDED") => {

     const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const result = await prisma.user.update({
    where: { id: userId },
    data: {
      status,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      updatedAt: true,
    },
  });

  return result;

};



const getAllGearsForAdminFromDB = async () => {

    const gears = await prisma.gearItem.findMany({
    include: {
      provider: true,
      category: true,
      reviews: true,
      rentalOrders: true
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return gears;

};



const getAllRentalOrdersForAdminFromDB = async () => {

    const orders = await prisma.rentalOrder.findMany({
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
        include: {
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
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;

};




export const adminService = {
    getAllUsersFromDB,
    updateUserStatusOnDB,
    getAllGearsForAdminFromDB,
    getAllRentalOrdersForAdminFromDB
};