import { prisma } from "./prisma"

export async function testDatabaseConnection() {
  try {
    await prisma.$connect();

    const userCount = await prisma.user.count();

    return { success: true, message: "Database connection successful" };
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  } finally {
    await prisma.$disconnect();
  }
}
