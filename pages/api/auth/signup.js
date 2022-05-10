import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";
import { responseFormat } from "../../../lib/helper";

const collection_name = "users";

export default async function handler(req, res) {
  const { method, body } = req;
  if (method === "POST") {
    const { email, password } = body;

    if (!email || !email.includes("@") || !password || password.trim().length < 6) {
      res.status(422).json(responseFormat(null, "Invalid email", false));
      return;
    }

    const { client, db } = await connectToDatabase();
    const collection = db.collection(collection_name);
    let data;

    try {
      const userExists = await collection.countDocuments({ email });
      if (userExists > 0) {
        res.status(422).json(responseFormat(null, "Email already exists", false));
        client.close();
        return;
      }

      const hashedPassword = await hashPassword(password);
      data = await collection.insertOne({ email, password: hashedPassword });

      res.status(201).json(responseFormat(data, "User created successfully"));
    } catch (err) {
      const message = err.message || "Data insertion failed!!";
      res.status(500).json(responseFormat(err, message, false));
    } finally {
      client.close();
    }
    return;
  }
}
