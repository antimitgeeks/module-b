const dashboardService=require("../../service/Dashboard/index")
exports.setupGuide = async (req, res) => {
    try {
        console.log(`::: --- API: createPartner , Path: ${req.originalUrl} ---`);

        // Get session from Shopify middleware
        const session = res.locals.shopify.session || res.locals.shopify;
        const partnerId = req.currentPartnerInfo?._id

        // Call service to create partner
        const result = await dashboardService.setupGuide(session,partnerId);
        res.status(200).json(result);

        // Handle service response
     

    } catch (error) {
        console.error("Error in createPartner:", error);
res.status(500).json({ error: "Internal server error" });}
};