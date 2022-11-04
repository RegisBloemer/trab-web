var express = require("express");
const { UnorderedBulkOperation } = require("mongodb");
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
              { $set: { [`stickers.${id}`]: quantity } },
              { upsert: true }
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
      const user_date = await db
        .collection("user")
        .findOne({ _id: new ObjectId(req.cookies.id) });

      console.log("result", user_date);
      const stickers_users = Object.keys(user_date.stickers);
      let stickers_search = [];

      for (let i = 0; i <= 8; i++) {
        stickers_search.push({
          ["stickers." + i]: {
            $gt: 1,
          },
        });
      }

      Object.keys(user_date.stickers).map((e) => {
        if (stickers_search[e] > 0) {
          delete stickers_search[e];
          //stickers_search.splice(e,1)
        }
      });

      stickers_search = stickers_search.filter((r) => r);

      console.log("stickers_search", stickers_search);

      const p1 = await db
        .collection("user")
        .find({
          $and: [{ $or: stickers_search }, { city: user_date.city }],
        })
        .toArray();

      console.log("p1", p1);

      const p1_list = p1.filter((e) => {
        const e_stickers = Object.keys(e.stickers);
        const sticker_match = stickers_users.filter((el) => {
          const not_includes = e_stickers.includes(el);
          console.log("not_includes", not_includes, el);
          console.log(user_date.stickers[el]);
          if (!not_includes) {
            if (user_date.stickers[el] > 1) {
              return el;
            }
          }
        });
        console.log("sticker_match", sticker_match);
        if (sticker_match.length > 0) {
            console.log(e, "---------------------------");
            delete e.pass;
            return e;
        }
      });
      console.log("p1_list", p1_list);

      res.json(p1_list);
    } catch (err) {
      console.log("err", err);
      res.status(400).json({ msg: "Error fetching listings!" });
    }
  } else {
    res.status(400).json({ msg: "id not found" });
  }
});

module.exports = router;
