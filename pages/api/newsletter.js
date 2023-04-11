import { MongoClient } from "mongodb";
// La ligne suivante ne doit être utilisée qu'une seule fois et au tout début du projet. De préférence dans index.js
require("dotenv").config("../../.env"); // Permet d'activer les variables d'environnement qui se trouvent dans le fichier `.env`

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      // 422 means that the user input was bad
      res.status(422).json({ message: "Invalid email address." });
      // Canceling the function execution
      return;
    }

    const client = await MongoClient.connect(
      `mongodb+srv://phouee:${process.env.MONGODB_PASSWORD}@clustertestph.lyjon.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`
    );
    // .then((client) => {
    const db = client.db();
    await db.collection("emails").insertOne({ email: userEmail });
    // });
    // console.log(userEmail);
    client.close();
    // 201 means "success, a response was added"
    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
