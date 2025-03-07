const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function(collection) {

    const router = express.Router();

    //GET
    router.get('/', (req, res) => {
        collection
        .find()
        .toArray()
        .then((docs) => res.json(docs))
        .catch((err) => {
            console.error(err);
            res.status(500);
            res.json({ status: 500, error: err});
        });
    });


    //SHOW
  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection
      .findOne({ _id: ObjectID(id) })
      .then((doc) => res.json(doc))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  //CREATE
  router.post('/', (req, res) => {
    const newData = req.body
    collection.insertOne(newData)
    .then((result) => {
      res.json(result.ops[0])
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({status:500, error: err});
    });
  });


  //UPDATE
  router.put('/:id', (req, res) => {
    const id = req.params.id;

    try {
        if (!ObjectID.isValid(id)) {
            return res.status(400).json({ message: "Invalid booking ID format" });
        }

        const objectId = new ObjectID(id); // Convert to ObjectID
        const updatedData = { ...req.body };
        delete updatedData._id; // Remove `_id` from update payload

        collection
            .updateOne({ _id: objectId }, { $set: updatedData })
            .then((result) => {
                if (result.matchedCount === 0) {
                    return res.status(404).json({ message: "Booking not found" });
                }
                res.json({ message: "Booking updated successfully", updatedData });
            })
            .catch((err) => {
                console.error("Error updating booking:", err);
                res.status(500).json({ status: 500, error: err.message });
            });
    } catch (err) {
        console.error("Invalid ObjectID:", err);
        res.status(400).json({ message: "Invalid booking ID" });
    }
});


  // DELETE
  router.delete('/:id', (req, res) => {
    const id = req.params.id;

    try {
        const objectId = new ObjectID(id); // Ensure ID is valid
        collection
            .deleteOne({ _id: objectId })
            .then((result) => {
                if (result.deletedCount === 0) {
                    return res.status(404).json({ message: "Booking not found" });
                }
                res.json({ message: "Booking deleted successfully" });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ status: 500, error: err.message });
            });
    } catch (err) {
        console.error("Invalid ObjectID:", err);
        res.status(400).json({ message: "Invalid booking ID" });
    }
});




  return router;
};

module.exports = createRouter;