import { PrismaClient } from "@prisma/client";
class Database {
  private static instance: Database;
  public prisma: PrismaClient;

  private constructor() {
    this.prisma = new PrismaClient();
    this.prisma.$connect();
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public connect() {
    // Logic to connect to the database
    this.prisma
      .$connect()
      .then(() => console.log("Database connected"))
      .catch((error: string) =>
        console.error("Database connection error:", error)
      );
  }

  public disconnect() {
    this.prisma.$disconnect().then(() => console.log("Database disconnected"));
  }
}

export default Database;
