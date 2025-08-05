import fs from "fs/promises";
import Database from ".";
import { v4 as uuidv4 } from "uuid";
import { encryptPassword } from "../utils/hashPassword";
const prisma = Database.getInstance().prisma;

const users = [
  {
    fullname: "John Doe",
    email: "john@example.com",
    password: "password123",
  },
  {
    fullname: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
  },
];

function seedUsers() {
  // Seed the users into the database
  users.forEach(async (user) => {
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });
    if (!existingUser) {
      await prisma.user.create({
        data: {
          ...user,
          passwordHash: await encryptPassword(user.password),
          cartSessionId: uuidv4(),
        },
      });
    }
  });
}

export function clearUsers() {
  // Clear all users from the database
  return prisma.user.deleteMany();
}

async function parseCSV() {
  const file = await fs.readFile(
    "/home/anas/projects/gadgetbucket/backend/dummyProducts/gaming_pc.csv",
    "utf-8"
  );
  const rows = file.split("\n");
  const products = rows.map((row: string) => {
    const [image, title, price] = row.split("!");
    return { image, title, price };
  });
  return products;
}

async function seedProducts() {
  const products = await parseCSV();
  products.map(async (product) => {
    if (!product.image || !product.title || !product.price) {
      console.error("Invalid product data:", product);
      return;
    }

    const data = {
      price: parseFloat(product.price.split("₹")[0]),
      offerPrice: parseFloat(product.price.split("₹")[0]) * 0.9, // Assuming a 10% discount
      image: product.image,
      name: product.title,
      description: "A high-performance gaming PC",
    };

    await prisma.product.create({
      data,
    });
  });
  console.log("Products seeded successfully");
}

seedProducts();

export default seedUsers;
