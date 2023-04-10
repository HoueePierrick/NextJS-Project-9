function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      // 422 means that the user input was bad
      res.status(422).json({ message: "Invalid email address." });
      // Canceling the function execution
      return;
    }
    console.log(userEmail);
    // 201 means "success, a response was added"
    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
