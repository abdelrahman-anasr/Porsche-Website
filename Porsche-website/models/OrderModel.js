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




const OrderSchema = mongoose.Schema({
    orderId: {
        type:Number,
        required:true
    },
    productId:{
        type:Number,
        required:true
    },
    user_email:{
        type:String,
        required:true
    },
    order_date: {
        type:String,
        required: true
    }
})

const Order = mongoose.model('Order' , OrderSchema)

module.exports = Order