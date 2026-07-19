import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";

const createPayment = async (userId: string, rentalOrderId: string) => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    const rentalOrder = await prisma.rentalOrder.findUnique({
      where: {
        id: rentalOrderId,
      },
      include: {
        gearItem: true,
      },
    });

    if (!rentalOrder) {
      throw new Error("Rental order not found");
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      payment_method_types: ["card"],

      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",

            product_data: {
              name: rentalOrder.gearItem.name,
            },

            unit_amount: Math.round(rentalOrder.totalAmount * 100),
          },
        },
      ],

      success_url:
        "http://localhost:3000/payment/success?session_id={CHECKOUT_SESSION_ID}",

      cancel_url: "http://localhost:3000/payment/cancel",
    });

    return session;
  });
};



const confirmPaymentAndStoreOnDB = async (userId: string, rentalOrderId: string) => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    const rentalOrder = await prisma.rentalOrder.findUnique({
      where: {
        id: rentalOrderId,
      },
      include: {
        gearItem: true,
      },
    });

    if (!rentalOrder) {
      throw new Error("Rental order not found");
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      payment_method_types: ["card"],

      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",

            product_data: {
              name: rentalOrder.gearItem.name,
            },

            unit_amount: Math.round(rentalOrder.totalAmount * 100),
          },
        },
      ],

      success_url:
        "http://localhost:3000/payment/success?session_id={CHECKOUT_SESSION_ID}",

      cancel_url: "http://localhost:3000/payment/cancel",
    });

    return session;
  });
};



const getPaymentHistoryFromDB = async (userId: string) => {
   const payments = await prisma.payment.findMany({
    where: {
      rentalOrder: {
        customerId: userId,
      },
    },
    include: {
      rentalOrder: {
        include: {
          gearItem: {
            select: {
              id: true,
              name: true,
              image: true,
              pricePerDay: true,
            },
          },
        },
      },
    },
    orderBy: {
      paidAt: "desc",
    },
  });

  return payments;
};

const getPaymentDetailsFromDB = async (paymentId: string) => {
   const payment = await prisma.payment.findUnique({
    where: {
      id: paymentId,
    },
    include: {
      rentalOrder: {
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
            },
          },
        },
      },
    },
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  return payment;
};






export const paymentService = {
  createPayment,
  confirmPaymentAndStoreOnDB,
  getPaymentHistoryFromDB,
  getPaymentDetailsFromDB
};
