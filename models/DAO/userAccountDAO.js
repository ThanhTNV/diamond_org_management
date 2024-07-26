const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const prisma = new PrismaClient();
// Bcrypt import
const bcrypt = require("bcryptjs");

// async function GetUserAccount()
exports.getUserAccount = asyncHandler(async (username, password) => {
  const user = await prisma.userAccount
    .findUnique({
      where: {
        username: username,
      },
    })
    .then(prisma.$disconnect());

  if (user === null) {
    return null;
  }
  // Bcrypt compare
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return null;
  }
  return user;
});

// async function GetUserAccountByUsername()
exports.getUserAccountByUsername = asyncHandler(async (username) => {
  const user = await prisma.userAccount.findUnique({
    where: {
      username: username,
    },
  });
  if(user === null) {
    return null;
  }
  return "User already exists";
});

// async function GetUserAccountById()
exports.getUserAccountById = asyncHandler(async (id) => {
  return await prisma.userAccount.findUnique({
    where: {
      id: id,
    },
  });
});

// async function AddUserAccount()
exports.addUserAccount = asyncHandler(async (username, password) => {
  // Bcrypt hash
  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);
  return await prisma.userAccount.create({
    data: {
      username: username,
      password: hashedPassword,
    },
  });
});

// async function RemoveUserAccount()
exports.removeUserAccount = asyncHandler(async (id) => {
  return await prisma.userAccount.delete({
    where: {
      id: id,
    },
  });
});

// async function ShowAllUserAccounts()
exports.showAllUserAccounts = asyncHandler(async () => {
  return await prisma.userAccount.findMany();
});