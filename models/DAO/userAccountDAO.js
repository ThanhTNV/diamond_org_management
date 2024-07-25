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
  });
});

// async function GetUserAccountById()
exports.getUserAccountById = asyncHandler(async (id) => {
  return await prisma.userAccount.findUnique({
    where: {
      id: id,
    },
  });
});
