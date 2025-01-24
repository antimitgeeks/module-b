
const SetupGuides = require('../../models/setupGuides.model.js');
const { shopify } = require("../../../shopify.js");




exports.setupGuide = async (session,partnerId) => {

    const data = await SetupGuides.findOneAndUpdate({ partnerId: partnerId }, { upsert: true, new: true });
    // Return the setup guide details
    return { status: true, message: `Setup Guide Details Fetched`, data: data };

}

