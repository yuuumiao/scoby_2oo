const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const uploader = require("../config/cloudinary");
const requireAuth = require("../middlewares/requireAuth");

//Gets all the items in the DB - prefix : "/api/items"
router.get("/", (req, res, next) => {
  Item.find()
    .populate("id_user") // Gives us the author's id (id_user) object document instead of just the id : )
    .then((resFromApi) => {
      res.status(200).json(resFromApi);
    })
    .catch((err) => {
      next(err);
    });
});

// Get one item in the DB - prefix : "/api/items"
router.get("/:id", (req, res, next) => {
  Item.findById(req.params.id)
    .then((resFromApi) => {
      res.status(200).json(resFromApi);
    })
    .catch((err) => {
      next(err);
    });
});

//Create an item in the DB - prefix : "/api/items"
router.post("/", requireAuth, uploader.single("image"), (req, res, next) => {
  const newItem = { ...req.body };

  if (req.file) {
    newItem.image = req.file.path;
  }

  console.log(req.file);
  newItem.id_user = req.session.currentUser;

  Item.create(newItem)
    .then((itemDocument) => {
      itemDocument
        .populate("id_user")
        .execPopulate() // Populate on .create() does not work, but we can use populate() on the document once its created !
        .then((item) => {
          res.status(201).json(item); // send the populated document.
        })
        .catch(next);
    })
    .catch(next);
});

//Update an item - prefix : "/api/items"
router.patch(
  "/:id",
  requireAuth,
  uploader.single("image"),
  (req, res, next) => {
    const newItem = { ...req.body };

    Item.findById(req.params.id)
      .then((itemDocument) => {
        if (!itemDocument)
          return res.status(404).json({ message: "Item not found" });
        if (itemDocument.id_user.toString() !== req.session.currentUser) {
          return res
            .status(403)
            .json({ message: "You are not allowed to update this document" });
        }

        if (req.file) newItem.image = req.file.path;
        console.log(req.file);
        Item.findByIdAndUpdate(req.params.id, newItem, { new: true })
          .then((resFromApi) => {
            res.status(200).json(resFromApi);
          })
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  }
);

//Deletes an item - prefix : "/api/items"
router.delete("/:id", requireAuth, (req, res, next) => {
  Item.findByIdAndDelete(req.params.id)
    .then((resFromApi) => {
      res.status(200).json({ message: "deleted successfully" });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
