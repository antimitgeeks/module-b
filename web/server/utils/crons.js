const {CronJob} = require('cron');
const Partners = require('../models/partners.model.js');

const createCronJob = (cronExpression, jobFunction) => {
    const cronJob = new CronJob(cronExpression, jobFunction);
    cronJob.start();
    return cronJob;
};

// this is for every day mid night check 
//const cronExpressionMidnight = '0 0 0 * * *';
const cronExpression1 = '0 0 0 * * *'; 
const jobFunction1 = async () => {
        const partnerList = await Partners.find({ isTrail: true }, '_id createdAt');
        console.log(partnerList);
        partnerList.forEach(async(item)=>{
        const createdAt=item?.createdAt
        const createdDate=new Date(createdAt)
        const todayDate=new Date()
        const daysDifference=todayDate-createdDate    
        const differenceInDays = daysDifference / (24 * 60 * 60 * 1000);
    
            console.log("differenceInDays-----" ,differenceInDays)
            
            if(differenceInDays >= 90){
    
            console.log('expired lan updating the details...',new Date())
            await Partners.updateOne({ _id: item._id }, { isTrail: false ,amount:0,planName:'Free',chargeId:null});
        }
        
    
       
    })

   
    console.log('****************************************partner crone running*************************************************');
};

// execute cron every day mid night check if have any customer between 30 day abandoned send notification 

const checkPartnerValidity =createCronJob(cronExpression1, jobFunction1);



module.exports = {checkPartnerValidity};
