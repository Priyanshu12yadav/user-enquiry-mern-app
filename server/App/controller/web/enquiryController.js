const enquiryModel=require("../../models/enquiry.model");
let enquiryInsert=(req,res)=>
    {
        let{name,email,message}=req.body;
        let enquiry=new enquiryModel({
            name,
            email,
            message
        });
        enquiry.save().then(()=>{
            res.send({status:1,message:"Enquiry Submitted Successfully"});

    }).catch((err)=>{
        res.send({status:0,message:"Error in Submission",error:err});   
    })
    }
let enquiryList=async(req,res)=>{
    let enquiryList=await enquiryModel.find();
    res.send({status:1,enquiryList:enquiryList});
}

let enquiryDelete=async(req,res)=>{
    let enId=req.params.id;
    let enquiry=await enquiryModel.deleteOne({_id:enId});
    res.send({status:1,message:"Enquiry deleted successfully",enquiry});
}

let enquirySingleRow=async(req,res)=>{
    let enId=req.params.id;
    let enquiry=await enquiryModel.findOne({_id:enId});
    res.send({status:1,enquiry});
}

let enquiryUpdate=async(req,res)=>{
    let enquiryId=req.params.id;
    let{name,email,message}=req.body;
        let updateObj={
            name,
            email,
            message
        };
        let updateRes=await enquiryModel.updateOne({_id:enquiryId},updateObj)
        res.send({status:1,message:"Enquiry update Successfully",updateRes})
}
module.exports={enquiryInsert,enquiryList,enquiryDelete,enquirySingleRow,enquiryUpdate};