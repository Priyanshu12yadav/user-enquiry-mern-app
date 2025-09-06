let express =require('express');//import express from 'express'
//import { enquiryInsert } from '../../controller/web/enquiryController.js';
const {enquiryInsert,enquiryList, enquiryDelete, enquirySingleRow, enquiryUpdate} =require('../../controller/web/enquiryController');
//const { enquiryUpdate } = require('../../../../../mongoose-crud-opr/app/controller/web/userEnquiryController');
let enquiryRouter = express.Router(); //create express router

enquiryRouter.post("/insert", enquiryInsert) //define route for inserting enquiry
enquiryRouter.get("/view", enquiryList) //define route for viewing enquiries
enquiryRouter.delete("/delete/:id",enquiryDelete    )
enquiryRouter.get("/single/:id",enquirySingleRow)
enquiryRouter.put("/update/:id",enquiryUpdate)
module.exports = enquiryRouter; //export enquiry router