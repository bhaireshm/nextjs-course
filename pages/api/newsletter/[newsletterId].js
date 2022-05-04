import { MongoServerError } from "mongodb";
import { connectDatabase, findOne } from "../../../helpers/db-util";
const collection_name = "newsletter";

export default async function handler(req, res) {
  const { method, query } = req;
  const newsletterId = query.newsletterId;

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
      data = await findOne(client, collection_name, { _id: newsletterId });
    } catch (error) {
      let message = "Data fetch failed!!";
      if (error instanceof MongoServerError) {
        console.log(`Error worth logging: ${error}`); // special case for some reason
        message = error;
      }
      res.status(500).json({ message });
      return;
    }

    res.status(200).json({ data, message: "Success!!" });
  }

  client.close();
}
