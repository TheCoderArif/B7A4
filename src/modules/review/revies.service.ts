import { prisma } from "../../lib/prisma";

const createReviewOnDB = async (customerId: string,
  payload: {
    gearItemId: string;
    rating: number;
    comment?: string;
  }) => {


    const rentalOrder = await prisma.rentalOrder.findFirst({
    where: {
      customerId,
      gearItemId: payload.gearItemId,
      status: "RETURNED",
    },
  });

  if (!rentalOrder) {

    throw new Error ("You can review this gear only after returning it.")

  }

  // Check if already reviewed
  const existingReview = await prisma.review.findUnique({
    where: {
      customerId_gearItemId: {
        customerId,
        gearItemId: payload.gearItemId,
      },
    },
  });

  if (existingReview) {
    throw new Error ("You have already reviewed this gear.")
    
    
  }

  // Create review
  const review = await prisma.review.create({
    data: {
      rating: payload.rating,
      comment: payload.comment,

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
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      gearItem: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  return review;

    
};



export const reviewService = {
    createReviewOnDB
};