import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import { Body } from "../../../models/Body";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const dataBasePath = path.join(process.cwd(), "data", "feedback.json");
  const data = fs.readFileSync(dataBasePath, { encoding: "utf-8" });
  const normalizeData = JSON.parse(data);

  if (req.method === "POST") {
    const { email, feedback }: Body = req.body;

    const newFeedback = {
      id: new Date().toISOString,
      email,
      feedback,
    };

    normalizeData.push(newFeedback);
    fs.writeFileSync(dataBasePath, JSON.stringify(normalizeData), {
      encoding: "utf-8",
    });

    res.status(201).json({ message: "Feedback successful added" });
    return;
  }

  res.status(200).json(normalizeData);
};

export default handler;
