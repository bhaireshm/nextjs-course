import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../../lib/db";
import { hashPassword, verifyPassword } from "../../../lib/auth";

export default async function handler(req, res) {
  const { method, body } = req;

  if (method === "PATCH") {
    const session = await getSession({ req });

    if (!session) {
      res.status(401).json({ message: "Not authenticated!!", status: false });
      return;
    }

    const { email } = session.user;
    console.log(body);
    const { oldPassword, newPassword } = body;

    const { client, db } = await connectToDatabase();
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      client.close();
      return;
    }

    const isOldPasswordMatch = await verifyPassword(oldPassword, user.password);
    if (!isOldPasswordMatch) {
      res.status(422).json({ message: "Invalid password" });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(newPassword);
    const result = await usersCollection.updateOne({ email }, { $set: { password: hashedPassword } });

    res.status(200).json({ message: "Password updated!!", status: true, data: result });
    client.close();
    return;
  }
}
