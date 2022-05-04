import { MongoServerError } from "mongodb";
import { connectDatabase, getAllDocuments, insertDocument } from "../../../helpers/db-util";
const collection_name = "newsletter";

export default async function handler(req, res) {
  const { method, body } = req;

  let client;
  try {
    client = await connectDatabase();
  } catch (err) {
    res.status(500).json({ message: "Database connection failed!!" });
    return;
  }

  if (method === "GET") {
    let resp;
    try {
      resp = await getAllDocuments(client, collection_name);
    } catch (error) {
      let message = "Data fetch failed!!";
      if (error instanceof MongoServerError) {
        console.log(`Error worth logging: ${error}`); // special case for some reason
        message = error;
      }
      client.close();
      res.status(500).json({ message });
      return;
    }

    res.status(200).json({ newsletters: resp, message: "Success!!" });
    return;
  }

  if (method === "POST") {
    if (!body.email || !body.email.includes("@")) {
      res.status(422).json({ message: "Invalid message", status: false });
      return;
    }

    let data;
    try {
      data = await insertDocument(client, collection_name, body);
    } catch (error) {
      let message = "Data insertion failed!!";
      if (error instanceof MongoServerError) {
        console.log(`Error worth logging: ${error}`); // special case for some reason
        message = error;
      }
      res.status(500).json({ message });
      return;
    }

    res.status(201).json({ data: body, message: "Signed Up!!", status: true });
  }

  client.close();
}
