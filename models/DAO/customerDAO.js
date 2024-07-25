const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const prisma = new PrismaClient();

// async function GetAllCustomers()
exports.getAllCustomers = asyncHandler(async () => {
  return await prisma.customer.findMany().then(prisma.$disconnect());
});

exports.GetOneCustomerById = asyncHandler(async (id) => {
  return await prisma.customer.findUnique({
    where: { ID: id },
  }).then(prisma.$disconnect());
});

exports.GetOneCustomerByPhone = asyncHandler(async (phone) => {
  return await prisma.customer.findFirst({
    where: { Phone: phone },
  }).then(prisma.$disconnect());
});

exports.AddACustomer = asyncHandler(async (customer) => {
  await prisma.customer.create({
    data: {
      ID: customer.ID,
      Phone: customer.Phone,
      FirstName: customer.FirstName,
      LastName: customer.LastName,
      Point: customer.Point,
    },
  }).then(prisma.$disconnect());
});

exports.UpdateACustomer = asyncHandler(async (id, customer) => {
  await prisma.customer.update({
    where: { ID: id },
    data: {
      Phone: customer.Phone,
      FirstName: customer.FirstName,
      LastName: customer.LastName,
      Point: customer.Point,
    },
  }).then(prisma.$disconnect());
});

exports.DeleteACustomer = asyncHandler(async (id) => {
  await prisma.customer.delete({
    where: { ID: id },
  }).then(prisma.$disconnect());
});