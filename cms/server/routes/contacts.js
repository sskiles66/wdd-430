var express = require("express");
var router = express.Router();
const Contact = require("../models/contact");

const SequenceGenerator = require("./sequenceGenerator");
const sequenceGenerator = new SequenceGenerator();


router.get("/", (req, res, next) => {
  Contact.find()
    .populate("group")
    .then((contacts) => {
      res.status(200).json(contacts);
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

router.post("/", async (req, res, next) => {
  await sequenceGenerator.initialize();
  const maxContactId = await sequenceGenerator.nextId("contacts");

  const contact = new Contact({
    id: maxContactId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: [],
  });

  contact
    .save()
    .then((createdContact) => {
      res.status(201).json({
        message: "Contact added successfully",
        contact: createdContact,
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
  Contact.findOne({ id: req.params.id })
    .then((contact) => {
      contact.name = req.body.name;
      contact.email = req.body.email;
      contact.phone = req.body.phone;
      contact.imageUrl = req.body.imageUrl;
      contact.group = [];

      Contact.updateOne({ id: req.params.id }, contact)
        .then((result) => {
          res.status(204).json({
            message: "Contact updated successfully",
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
        message: "Contact not found.",
        error: { document: "Contact not found" },
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Contact.findOne({ id: req.params.id })
    .then((contact) => {
      Contact.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "Contact deleted successfully",
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
        message: "Contact not found.",
        error: { document: "Contact not found" },
      });
    });
});

module.exports = router;
