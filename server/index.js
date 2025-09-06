let express=require('express');//import express from 'express';
let mongoose=require('mongoose');//import mongoose from 'mongoose';
let cors=require('cors');//import cors from 'cors';
const enquiryRouter = require('./App/routes/web/enquiryRoutes');
require('dotenv').config();//import dotenv from 'dotenv';dotenv.config();
let app=express();//create express app

app.use(express.json());//middleware to parse json data
app.use(cors());//enable cors
app.use('/api/website/enquiry', enquiryRouter);

mongoose.connect(process.env.DBURL).then(()=>{
	console.log("DB Connected to MongoDB");//successful connection
	app.listen(process.env.PORT||3000,()=>{
		console.log('Server running on port');//start server
	});
})
.catch((err)=>{console.log(err)});//catch error if connection fails


