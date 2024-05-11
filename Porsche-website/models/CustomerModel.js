const mongoose = require('mongoose')
const CustomerSchema = mongoose.Schema({
    customerId:{
        type:Number,
        required:true
    },
    first_name:{
        type:String
    },
    last_name:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    DOB:{
        type:Date
    },
    age:{
        type:Number
    }
})

CustomerSchema.statics.login=async function(email,password){
    const customer=await this.findOne({email:email})
    if(customer){
        const auth=await brcypt.compare(password,customer.password)
         if (auth){
            return customer
         }
        throw Error('Incorrect password')
    }
    throw Error('Incorrect email')
}

const Customer = mongoose.model('Customer' , CustomerSchema)
module.exports = Customer