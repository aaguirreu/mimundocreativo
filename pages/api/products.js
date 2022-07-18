import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const {
        title,
        image,
        description,
        price,
      } = req.body;
      const product = await prisma.productos.create({
        data: {
          title,
          image,
          description,
          price,
        },
      });
      res.status(200).json(product);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
