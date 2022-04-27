import fs from "fs";
import { join } from "path";

export function getFilePath() {
  return join(process.cwd(), "data", "feedback.json");
}

export function extractFeedbackData(filePath) {
  const respData = fs.readFileSync(filePath);
  return JSON.parse(respData);
}

export default async function FeedbackAPI(req, res) {
  const { body, method } = req;

  if (method === "POST") {
    body["id"] = new Date().getTime();

    //   Save data in file or db
    const filePath = getFilePath();
    const respData = extractFeedbackData(filePath);
    respData.push(body);

    fs.writeFileSync(filePath, JSON.stringify(respData), "utf-8");
    res.status(201).json({ message: "Success!!", feedback: body });
  }

  if (method === "GET") {
    const filePath = getFilePath();
    const respData = extractFeedbackData(filePath);

    res.json({ message: "Success!!", data: respData });
  }
}
