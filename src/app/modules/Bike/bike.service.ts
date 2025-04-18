import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

export const createBike = async (data: { brand: string; model: string; year: number; customerId: string }) => {
  const customer = await prisma.customer.findUnique({
    where: { customerId: data.customerId },
  });

  if (!customer) {
    throw new Error(`Customer with ID ${data.customerId} not found`);
  }

  return await prisma.bike.create({
    data: {
      brand: data.brand,
      model: data.model,
      year: data.year,
      customerId: data.customerId,
    },
  });
};

export const getAllBikes = async () => {
  return await prisma.bike.findMany();
};

export const getBikeById = async (bikeId: string) => {
  return await prisma.bike.findUnique({
    where: { bikeId },
  });
};

export const deleteBike = async (bikeId: string) => {
  return await prisma.bike.delete({
    where: { bikeId },
  });
};

export const updateBike = async (bikeId: string, data: { brand?: string; model?: string; year?: number; customerId?: string }) => {
  // Validate customerId if provided
  if (data.customerId) {
    const customer = await prisma.customer.findUnique({
      where: { customerId: data.customerId },
    });
    if (!customer) {
      throw new Error(`Customer with ID ${data.customerId} not found`);
    }
  }

  return await prisma.bike.update({
    where: { bikeId },
    data,
  });
};