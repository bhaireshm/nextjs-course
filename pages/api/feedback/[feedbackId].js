import { extractFeedbackData, getFilePath } from ".";

export default function handler(req, res) {
  const filePath = getFilePath();
  const respData = extractFeedbackData(filePath);
  const data = { data: respData.find((r) => +r.id === +req.query.feedbackId) };
  res.json(data);
}
