var express = require("express");
var router = express.Router();
const dbo = require("../db/conn");
var ObjectId = require("mongodb").ObjectId;

router.get("/", async (req, res, next) => {
  console.log("stickers-----");
  console.dir(req.cookies.id);

  if (req.cookies.id) {
    const db = dbo.getDb();
    try {
      const result = await db
        .collection("user")
        .findOne({ _id: new ObjectId(req.cookies.id) });

      console.log("result", result);
      res.json(result);
    } catch (err) {
      console.log("err", err);
      res.status(400).json({ msg: "Error fetching listings!" });
    }
  }
});

router.post("/", async (req, res, next) => {
  console.log("stickers POST-----");
  console.dir(req.cookies.id);

  if (req.cookies.id) {
    const id = Number(req.body.id);
    if (!Number.isNaN(id) && id >= 0 && id <= 8) {
      const quantity = Number(req.body.quantity);
      if (!Number.isNaN(quantity) && quantity >= 0) {
        const db = dbo.getDb();
        try {
          const result = await db
            .collection("user")
            .updateOne(
              { _id: new ObjectId(req.cookies.id) },
              { $inc: { [`stickers.${id}`]: 1 } }
            );

          console.log("result", result);
          res.json(result);
        } catch (err) {
          console.log("err", err);
          res.status(400).json({ msg: "Error fetching listings!" });
        }
      }
    }
  }
});

module.exports = router;
