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

    const connectionString = `mongodb+srv://${process.env
      .mongodb_username!}:${process.env.mongodb_password!}@${process.env
      .mongodb_cluster!}.l12yekn.mongodb.net/${process.env
      .mongodb_database!}?retryWrites=true&w=majority`;

    let client;
    try {
      client = await MongoClient.connect(connectionString);
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
