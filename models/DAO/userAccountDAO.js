const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const prisma = new PrismaClient();

// async function GetUserAccount()
exports.getUserAccount = asyncHandler(async (username, password) => {
  return await prisma.userAccount.findUnique({
    where: {
      username: username,
      password: password,
    },
  }).then(prisma.$disconnect());
});

exports.GetOneCustomerById = asyncHandler(async (id) => {
  return await prisma.customer.findUnique({
    where: { ID: id },
  }).then(prisma.$disconnect());
});

// async function GetUserAccountById()
exports.getUserAccountById = asyncHandler(async (id) => {
  return await prisma.userAccount.findUnique({
    where: {
      id: id,
    },
  });
});
