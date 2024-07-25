const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");

const prisma = new PrismaClient();

// async function GetAllCustomers() {
//   const customers = await prisma.customer.findMany();
//   return customers;
// }

const GetAllCustomers = asyncHandler(async () => {
  const customers = await prisma.customer.findMany().then(prisma.$disconnect());
  console.log(customers);
});

// GetAllCustomers();

const CreateACustomer = asyncHandler(async () => {
  await prisma.customer.create({
    data: {
      ID: 724304,
      Phone: "0987654321",
      FirstName: "Alice",
      LastName: "Wonderland",
      Point: 0,
    },
  });
});

// CreateACustomer();

GetAllCustomers();

// GetAllCustomers()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   });
