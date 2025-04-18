import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

export const createCustomer = async (data: { name: string; email: string; phone: string }) => {
  return await prisma.customer.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
    },
  });
};


export const getAllCustomers = async () => {
  return await prisma.customer.findMany();
};

export const getCustomerById = async (customerId: string) => {
  return await prisma.customer.findUnique({
    where: { customerId },
  });
};



export const updateCustomer = async (customerId: string, data: { name?: string; email?: string; phone?: string }) => {
  // Check if the customer exists
  const customer = await prisma.customer.findUnique({
    where: { customerId: customerId }, // Use customerId instead of id
  });

  if (!customer) {
    throw new Error('Customer not found');
  }

  // Update the customer with the provided data
  return await prisma.customer.update({
    where: { customerId: customerId }, // Use customerId instead of id
    data: {
      name: data.name ?? customer.name, // Use existing value if not provided
      email: data.email ?? customer.email,
      phone: data.phone ?? customer.phone,
    },
  });
};

export const deleteCustomer = async (customerId: string) => {
  return await prisma.customer.delete({
    where: { customerId },
  });
};