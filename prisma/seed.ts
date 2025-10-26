import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const locations = [
  {
    city: "Metro Manila",
    country: "Philippines",
    imageUrl: "/location/photo-1754388298164-4db76ebc1276.jpeg",
  },
  {
    city: "Jakarta",
    country: "Indonesia",
    imageUrl: "/location/photo-1670163297171-075c1bbad3b0.jpeg",
  },
  {
    city: "Seoul",
    country: "South Korea",
    imageUrl: "/location/photo-1735253499196-8f261d5551c4.jpeg",
  },
  {
    city: "Denpasar",
    country: "Indonesia",
    imageUrl: "/location/photo-1655100021097-372e99cd9965.jpeg",
  },
  {
    city: "Osaka",
    country: "Japan",
    imageUrl: "/location/photo-1746431565053-87d6cc1c4e50.jpeg",
  },
  {
    city: "Kyoto",
    country: "Japan",
    imageUrl: "/location/photo-1588677979404-ff19ee781344.jpeg",
  },
  {
    city: "Tokyo",
    country: "Japan",
    imageUrl: "/location/photo-1699444116939-41ecae88b19a.jpeg",
  },
  {
    city: "Stockholm",
    country: "Sweden",
    imageUrl: "/location/photo-1645096685522-5de4fd482ffd.jpeg",
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  for (const loc of locations) {
    const cafes = Array.from({ length: Math.floor(Math.random() * 3) + 2 }).map(
      (_, i) => ({
        name: `${loc.city} Cafe ${i + 1}`,
        address: `Street ${i + 1}, ${loc.city}`,
        imageUrl: `/cafe/default-cafe-${(i % 3) + 1}.jpg`,
      })
    );

    await prisma.location.create({
      data: {
        ...loc,
        cafes: {
          create: cafes,
        },
      },
    });
  }

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
