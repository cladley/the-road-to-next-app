import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient();

const tickets = [
  {
    title: "Ticket 1",
    content: "This is the first ticket from the database",
    status: "DONE" as const,
    deadline: "2024-12-31",
    bounty: 100,
  },
  {
    title: "Ticket 2",
    content: "This is the second ticket from the database",
    status: "OPEN" as const,
    deadline: "2024-12-31",
    bounty: 200,
  },
  {
    title: "Ticket 3",
    content: "This is the third ticket from the database",
    status: "IN_PROGRESS" as const,
    deadline: "2024-12-31",
    bounty: 300,
  },
];

const seed = async () => {
  console.log("DB Seed: Starting...");
  console.time("seed");

  await prisma.ticket.deleteMany();

  await prisma.ticket.createMany({
    data: tickets,
  });

  console.log("DB Seed: Finished...");
  console.timeEnd("seed");
};

seed();
