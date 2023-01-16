import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const {
      email,
      name,
      message,
    }: { email: string; name: string; message: string } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    let client;
    try {
      client = await MongoClient.connect(
        "mongodb+srv://sem1101:12345qwert@cluster0.l12yekn.mongodb.net/my-site?retryWrites=true&w=majority"
      );
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
        return error;
      }
      return;
    }

    const db = client.db();
    try {
      const result = await db.collection("messages").insertOne(req.body);
      const newMessage = { ...req.body, id: result.insertedId };
      res.status(201).json({
        message: "success",
        data: newMessage,
      });
    } catch (error) {
      if (error instanceof Error) {
        client.close();
        res.status(500).json({ message: error.message });
        return error;
      }
      return;
    }

    client.close();
  }
};

export default handler;
