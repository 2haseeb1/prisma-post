import { PrismaClient, Prisma, ServiceStatus } from "../../../generated/prisma";

const prisma = new PrismaClient();

export const createService = async (data: { bikeId: string; serviceDate: string; description: string; status: ServiceStatus }) => {
  const bike = await prisma.bike.findUnique({
    where: { bikeId: data.bikeId },
  });

  if (!bike) {
    throw new Error(`Bike with ID ${data.bikeId} not found`);
  }

  return prisma.serviceRecord.create({
    data: {
      bikeId: data.bikeId,
      serviceDate: new Date(data.serviceDate),
      description: data.description,
      status: data.status,
    },
  });
};

export const getAllServices = async () => {
  return prisma.serviceRecord.findMany();
};

export const getServiceById = async (serviceId: string) => {
  return prisma.serviceRecord.findUnique({
    where: { serviceId },
  });
};

export const updateService = async (serviceId: string, data: { bikeId?: string; serviceDate?: string; description?: string; status?: ServiceStatus }) => {
  if (data.bikeId) {
    const bike = await prisma.bike.findUnique({
      where: { bikeId: data.bikeId },
    });
    if (!bike) {
      throw new Error(`Bike with ID ${data.bikeId} not found`);
    }
  }

  const updateData: Prisma.ServiceRecordUncheckedUpdateInput = {
    ...(data.bikeId && { bikeId: data.bikeId }),
    ...(data.serviceDate && { serviceDate: new Date(data.serviceDate) }),
    ...(data.description && { description: data.description }),
    ...(data.status && { status: data.status }),
  };

  return prisma.serviceRecord.update({
    where: { serviceId },
    data: updateData,
  });
};

export const completeService = async (serviceId: string, completionDate: string) => {
  const service = await prisma.serviceRecord.findUnique({
    where: { serviceId },
  });

  if (!service) {
    throw new Error(`Service record with ID ${serviceId} not found`);
  }

  return prisma.serviceRecord.update({
    where: { serviceId },
    data: {
      status: 'done',
      completionDate: new Date(completionDate),
      updatedAt: new Date(),
    },
  });
};

export const deleteService = async (serviceId: string) => {
  return prisma.serviceRecord.delete({
    where: { serviceId },
  });
};

export const getPendingOrOverdueServices = async () => {
  const currentDate = new Date();
  return prisma.serviceRecord.findMany({
    where: {
      OR: [
        { status: 'pending' },
        { status: 'in_progress' },
        { serviceDate: { lte: currentDate }, status: { not: 'done' } },
      ],
    },
  });
};