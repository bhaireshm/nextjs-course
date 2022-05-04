import { MongoServerError } from "mongodb";
import { connectDatabase, filterDocuments, insertDocument } from "../../../helpers/db-util";
const collection_name = "comments";

export default async function handler(req, res) {
  const { method, query, body } = req;
  const { eventId } = query;

  let client;
  try {
    client = await connectDatabase();
  } catch (err) {
    res.status(500).json({ message: "Database connection failed!!" });
    return;
  }

  // * GET - /api/comments/{eventId}
  if (method === "GET") {
    let resp;
    try {
      resp = await filterDocuments(client, collection_name, { eventId });
    } catch (error) {
      let message = "Data fetch failed!!";
      if (error instanceof MongoServerError) {
        console.log(`Error worth logging: ${error}`); // special case for some reason
        message = error;
      }
      res.status(500).json({ message });
      return;
    }

    res.status(200).json({ comments: resp, message: "Success!!" });
    return;
  }

  // * POST - /api/comments/{eventId}
  if (method === "POST") {
    const { email, name, text } = body;
    if (!email || !name || !text || email.trim() == "" || name.trim() == "" || text.trim() == "") {
      res.status(422).json({ message: "Invalid Input", status: false });
      return;
    }

    let data;
    try {
      data = await insertDocument(client, collection_name, { ...body, eventId });
    } catch (error) {
      let message = "Data insertion failed!!";
      if (error instanceof MongoServerError) {
        console.log(`Error worth logging: ${error}`); // special case for some reason
        message = error;
      }
      client.close();
      res.status(500).json({ message });
      return;
    }

    res.status(201).json({ data, message: "Comment added!!", status: true });
  }

  client.close();
}
