var express = require("express");
var router = express.Router();
const Band = require("../models/band");

router.get("/", (req, res, next) => {
  Band.find()
    .then((bands) => {
      res.status(200).json(bands);
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

router.post("/", (req, res, next) => {
  const band = new Band({
    bandTitle: req.body.bandTitle,
    genre: req.body.genre,
    imageUrl: req.body.imageUrl,
  });

  band
    .save()
    .then((createdBand) => {
      res.status(201).json({
        message: "Band added successfully",
        band: createdBand,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

router.put("/:id", (req, res, next) => {
  Band.findOne({ _id: req.params.id })
    .then((band) => {
      band.bandTitle = req.body.bandTitle;
      band.genre = req.body.genre;
      band.imageUrl = req.body.imageUrl;

      Band.updateOne({ _id: req.params.id }, band)
        .then((result) => {
          res.status(204).json({
            message: "Band updated successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Band not found.",
        error: { band: "Band not found" },
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Band.findOne({ _id: req.params.id })
    .then((band) => {
      Band.deleteOne({ _id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "Band deleted successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Band not found.",
        error: { band: "Band not found" },
      });
    });
});

module.exports = router;
