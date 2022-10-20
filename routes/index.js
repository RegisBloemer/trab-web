var express = require("express");
var router = express.Router();
const dbo = require("../db/conn");

/* GET home page. */
router.get("/:id", async (req, res, next) => {
  console.log("req",req.params)
  const db = dbo.getDb();

  db.collection("user")
    .find({
      figurinhas: {
        $elemMatch: {
          $and: [
            {
              0: "63509e7ed33a389b5a15b2b7",
            },
            {
              1: {
                $gt: Number(req.params.id),
              },
            },
          ],
        },
      },
    })
    .toArray((err, result) => {
      console.log("result", result);
      if (err) {
        console.log(err);
        res.status(400).send("Error fetching listings!");
      } else {
        res.json(result);
      }
    });



  //res.send("tua mae" + a);
});

module.exports = router;
