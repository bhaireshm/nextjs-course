import { MongoClient } from "mongodb";

export const MONGO_DB = {
  url: `mongodb://localhost:27017/?readPreference=primary&directConnection=true&ssl=false`,
  db_name: "nextjs_course",
};

export async function connectDatabase() {
  const client = await MongoClient.connect(MONGO_DB.url);
  return client;
}

export async function insertDocument(client, cname, document) {
  const data = await client.db(MONGO_DB.db_name).collection(cname).insertOne(document);
  document.id = data.insertedId;
  return document;
}

export async function getAllDocuments(client, cname, sort) {
  return client.db(MONGO_DB.db_name).collection(cname).find().sort(sort).toArray();
}

export async function findOne(client, cname, filter) {
  return client.db(MONGO_DB.db_name).collection(cname).findOne(filter);
}

export async function filterDocuments(client, cname, filter) {
  return client.db(MONGO_DB.db_name).collection(cname).find(filter).toArray();
}
