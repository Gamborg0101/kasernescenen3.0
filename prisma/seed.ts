import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { faker } from "@faker-js/faker";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

function generateMany(input: number): Prisma.UddannelseCreateInput[] {
  const items: Prisma.UddannelseCreateInput[] = [];
  for (let i = 0; i < input; i++) {
    items.push({
      navn: faker.airline.airline().name,
    });
  }
  return items;
}

/*
Mangler bruger osv. 

Husk at tænk over "hvad skal der til, for at vi kan lave en bruger og booking"

*/

export async function main() {
  for (const u of generateMany(50)) {
    await prisma.uddannelse.create({ data: u });
  }
}

main();
