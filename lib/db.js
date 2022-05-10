import { MongoClient } from "mongodb";
const MONGO_DB = {
  url: "mongodb://localhost:27017/?readPreference=primary&directConnection=true&ssl=false",
  db_name: "nextjs_course",
};

export async function connectToDatabase() {
  const client = await MongoClient.connect(`${MONGO_DB.url}`);
  const db = client.db(MONGO_DB.db_name);
  return { client, db };
}
