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
  router.post('/', async (req, res) => {
    const newData = req.body;

    if (!newData.guest_name || !newData.guest_email) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        console.log("Received new booking request:", newData); // Debugging

        // Insert only if no existing booking with the same `_id`
        const result = await collection.insertOne(newData);
        console.log("Inserted booking:", result.insertedId); // Debugging
        res.json(result.ops[0]); // Send back only one result
    } catch (err) {
        console.error("Error inserting booking:", err);
        res.status(500).json({ status: 500, error: err });
    }
});




  //UPDATE
  router.put('/:id', (req, res) => {
    const id = req.params.id;
    try {
        if (!ObjectID.isValid(id)) {
            return res.status(400).json({ message: "Invalid booking ID format" });
        }

        const objectId = new ObjectID(id);
        const updatedData = {
            ...req.body,
            checked_in: req.body.checked_in === "true" || req.body.checked_in === true // Convert to Boolean
        };
        delete updatedData._id; // Prevent `_id` modification

        collection.updateOne({ _id: objectId }, { $set: updatedData }, { upsert: false })
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
    router.delete('/:id', async (req, res) => {
        const id = req.params.id;

        try {
            if (!ObjectID.isValid(id)) {
                return res.status(400).json({ message: "Invalid booking ID format" });
            }

            const objectId = new ObjectID(id);
            const result = await collection.deleteOne({ _id: objectId });

            if (result.deletedCount === 0) {
                return res.status(404).json({ message: "Booking not found" });
            }

            res.json({ message: "Deleted successfully" });
        } catch (err) {
            console.error("Error deleting booking:", err);
            res.status(500).json({ status: 500, error: err.message });
        }
    });



  return router;
};

module.exports = createRouter;