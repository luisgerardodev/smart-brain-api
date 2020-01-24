const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '9fda9c8b98244b58bd64c27ec9308645'
   });

const handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}



const handleEntries = (req, res, db) => {
    const { id } = req.body;
    db('users').where({ id })
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
    handleEntries,
    handleApiCall
}