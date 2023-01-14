import fs from "fs/promises";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import { Feedback } from "@/models/Feedback";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  const filePath = path.join(process.cwd(), "data", "feedback.json");
  const data = await fs.readFile(filePath, { encoding: "utf-8" });
  const readableData: Feedback[] = JSON.parse(data);

  const feedback = readableData.find((feedback) => feedback.id === id);

  res.json({
    message: "success",
    data: {
      feedback,
    },
  });
};

export default handler;
