const Languages = require('../../models/languages.model.js');
exports.languageList = async (req, res) => {
    console.log('/api/language/list');
    const params=req.body

    const details = await Languages.find().sort({ createdAt: -1 }).limit(params.limit).skip(params.offset);
    

    // Return the response structure with success message and fetched data
    const data = {
        status: true,
        message: `Language fetched`,  // Success message indicating the list was fetched
        data: details  // The list of languages fetched from the database
    };

    res.status(200).send(data);
};