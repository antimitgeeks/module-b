const partnerService=require('../../service/Partner/index.js')
// Constants
exports.createPartner = async (req, res) => {
    try {
        console.log(`::: --- API: createPartner , Path: ${req.originalUrl} ---`);

        // Get session from Shopify middleware
        const session = res.locals.shopify.session || res.locals.shopify;

        // Call service to create partner
        const result = await partnerService.createPartner(session);
        res.status(200).json(result);

        // Handle service response
     

    } catch (error) {
        console.error("Error in createPartner:", error);
res.status(500).json({ error: "Internal server error" });}
};
exports.updatePartner = async (req, res) => {
    try {
        console.log(`::: --- API: createPartner , Path: ${req.originalUrl} ---`);

        // Get session from Shopify middleware
        const session = res.locals.shopify.session || res.locals.shopify;

        // Call service to create partner
        const result = await partnerService.updatePartner(req, res);
        res.status(200).json(result);

        // Handle service response
     

    } catch (error) {
        console.error("Error in updatePartner:", error);
res.status(500).json({ error: "Internal server error" });}
};
exports.getPartnerInfo = async (req, res) => {
    try {
        console.log(`::: --- API: getPartnerInfo , Path: ${req.originalUrl} ---`);

        // Get session from Shopify middleware
        const session = res.locals.shopify.session || res.locals.shopify;

        // Call service to create partner
        const result = await partnerService.getPartnerInfo(req, res);
        // res.status(200).json(result);

        // Handle service response
     

    } catch (error) {
        console.error("Error in createPartner:", error);
res.status(500).json({ error: "Internal server error" });}
};
