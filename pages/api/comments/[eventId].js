// api/comments/eventId
import mongoose from "mongoose";
import { MongoClient } from "mongodb";
// La ligne suivante ne doit être utilisée qu'une seule fois et au tout début du projet. De préférence dans index.js
require("dotenv").config("../../../.env"); // Permet d'activer les variables d'environnement qui se trouvent dans le fichier `.env`

async function handler(req, res) {
  // console.log("A");
  const eventId = req.query.eventId;
  mongoose.connect(
    `mongodb+srv://phouee:${process.env.MONGODB_PASSWORD}@clustertestph.lyjon.mongodb.net/retryWrites=true&w=majority`
  );

  // const client = MongoClient.connect(
  //   `mongodb+srv://phouee:${process.env.MONGODB_PASSWORD}@clustertestph.lyjon.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`
  // );

  // console.log(process.env.MONGODB_NAME);
  if (req.method === "POST") {
    const { email, name, text } = req.body;
    // add server-side validation
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    const newComment = {
      // id: new Date().toISOString(),
      email,
      name,
      text,
      eventId,
    };
    const Comment = mongoose.model("comment", {
      email: String,
      name: String,
      text: String,
      eventId: String,
    });
    const pushedComment = new Comment(newComment);
    await pushedComment.save();
    // res.json({ pushedComment });
    // const db = client.db();
    // const result = await db.collection("comments").insertOne(newComment);
    console.log(pushedComment);
    console.log("A");
    res.status(201).json({ message: "Added comment.", comment: newComment });
  }
  if (req.method === "GET") {
    const dummyList = [
      { id: "c1", name: "Max", text: "A first comment!" },
      { id: "c2", name: "Manuel", text: "A second comment!" },
    ];
    res.status(200).json({ comments: dummyList });
  }
  // client.close();
}

export default handler;
