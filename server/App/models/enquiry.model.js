let mongoose=require('mongoose');//import mongoose from 'mongoose';
let Schema=mongoose.Schema;//get mongoose schema
let enquirySchema=new Schema({//create schema
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
  
    message:{
        type:String,
        required:true
    }

});

let enquiryModel=mongoose.model('Enquiry',enquirySchema);//export enquiry model
module.exports=enquiryModel;