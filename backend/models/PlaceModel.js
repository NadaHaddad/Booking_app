const mongoose=require('mongoose');
const PlaceSchema=new mongoose.Schema({
    owner:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
        
    },
    title:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    photos:{
        type:[String]

    },
    description:{
        type:String
    },
    features:{
        type:[String]
    },
    extraInfo:{type:String},
    checkIn:{type:Number},
    checkOut:{type:Number},
    maxGuests:{type:Number},
    price:{type:Number}

}) 
const PlaceModel=mongoose.model('Place',PlaceSchema);
module.exports=PlaceModel;