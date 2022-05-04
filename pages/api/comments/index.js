import { MongoServerError } from "mongodb";
import { connectDatabase, getAllDocuments } from "../../../helpers/db-util";
const collection_name = "comments";

export default async function handler(req, res) {
  const { method } = req;
  let client;

  try {
    client = await connectDatabase();
  } catch (err) {
    res.status(500).json({ message: "Database connection failed!!" });
    return;
  }

  if (method === "GET") {
    let data;
    try {
      data = await getAllDocuments(client, collection_name, { _id: -1 });
    } catch (error) {
      let message = "Data fetch failed!!";
      if (error instanceof MongoServerError) {
        console.log(`Error worth logging: ${error}`); // special case for some reason
        message = error;
      }
      res.status(500).json({ message });
      return;
    }

    res.status(200).json({ comments: data, message: "Success!!" });
  }

  client.close();
}
