import express from "express";

import { MongoClient } from "mongodb";
const url = "mongodb://localhost:27017";
const dbName = "pilkosis";
const app = express();
const PORT = 8080 || process.env.PORT;

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// console.log(getJam());

client.connect((err, client) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Berhasil konek ke mongo db");
  }
});

const db = client.db(dbName);

app.get("/", (req, res) => {
  res.json({
    message: "PERGI KE /api",
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
