const brcypt = require('bcrypt')
const { Admin } = require('mongodb')
const mongoose = require('mongoose')

const url = "mongodb+srv://abdelrahman2004:software123@database.99j14ho.mongodb.net/Porsche"

mongoose.connect(url).then((ans) => { 
    console.log("Connecting SuccesFul!") 
  }).catch((err) => { 
    console.log("Error in the Connection") 
  }) 

const Schema = mongoose.Schema


const mongoDb = mongoose.connection




const ProductSchema = mongoose.Schema({
    productId:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    model:{
        type:String,
    },
    model_year:{
        type:Number
    },
    color:{
        type:String
    },
    price:{
        type:Number
    }
})

const Products = mongoose.model('Product' , ProductSchema)

module.exports = Products