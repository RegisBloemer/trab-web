var express = require("express");
var router = express.Router();
const dbo = require("../../db/conn");
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
      } else {
        res.status(400).json({ msg: "quantity is number" });
      }
    } else {
      res.status(400).json({ msg: "sticker-id >= 0 && sticker-id <= 8" });
    }
  } else {
    res.status(400).json({ msg: "user-id not found" });
  }
});

router.get("/match", async (req, res, next) => {
  console.log("stickers match GET-----");
  console.dir(req.cookies.id);

  if (req.cookies.id) {
    const db = dbo.getDb();
    try {
      const result = await db
        .collection("user")
        .findOne({ _id: new ObjectId(req.cookies.id) });

      console.log("result", result);
      const stickers_users = Object.keys(result.stickers);
      let stickers_search = [];

      for (let i = 0; i <= 8; i++) {
        stickers_search.push({
          ["stickers." + i]: {
            $gt: 1,
          },
        });
      }

      Object.keys(result.stickers).map((e) => {
        delete stickers_search[e];
        //stickers_search.splice(e,1)
      });

      stickers_search = stickers_search.filter((r) => r);

      console.log("stickers_search", stickers_search);

      const p1 = await db
        .collection("user")
        .find({
          $or: stickers_search,
        })
        .toArray();

      console.log("p1", p1);

      res.json(p1);
    } catch (err) {
      console.log("err", err);
      res.status(400).json({ msg: "Error fetching listings!" });
    }
  } else {
    res.status(400).json({ msg: "id not found" });
  }
});

module.exports = router;
