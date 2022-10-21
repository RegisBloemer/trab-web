var express = require("express");
var router = express.Router();
const dbo = require("../db/conn");

router.post("/", async (req, res, next) => {
  console.log("register--", req.body);

  const db = dbo.getDb();
  try {
    const result = await db.collection("user").insertOne({
      email: String(req.body.email),
      pass: String(req.body.pass),
    });
    console.log(`Added a new match with id ${result.insertedId}`);
    res.status(200).json({ id: result.insertedId });
  } catch {
    res.status(400).json({ msg: "Error inserting matches!" });
  }
});

module.exports = router;
