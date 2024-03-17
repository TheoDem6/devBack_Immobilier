let mongoose = require('mongoose');
let Client = require('../../Model/client');

/*
 * POST /book to save a new book.
 */
async function postClient(req, res) {
    try {
        //Creates a new book
        var newClient = new Client(req.body);
        //Save it into the DB.
        await newClient.save().then(() => {
                res.json({message: "Un nouveau client a été ajouté", newClient });
        });
    }
    catch (error) {
        // console.log(error)
        res.status(206).send(error);
      }
    
}

module.exports = { postClient };

