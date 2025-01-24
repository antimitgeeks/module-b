const mongoose = require("mongoose");

const pagePreviewingSchema = new mongoose.Schema({
    partnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Partner"
    },
    thankyouPage: {
        type: JSON,
    },
    orderStatusPage: {
        type: JSON,
    },
    upSellOrderStatus: {
        type: JSON,
    },
    upSellThankyouPage: {
        type: JSON,
    },
    checkoutPageId: {
        type: String
    }
},
    { 'timestamps': true }

);

const PagePreviewing = mongoose.model("pagePreviewing", pagePreviewingSchema);

module.exports = PagePreviewing;
