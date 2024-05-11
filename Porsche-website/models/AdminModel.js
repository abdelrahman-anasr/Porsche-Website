const mongoose = require('mongoose')
const AdminSchema = mongoose.Schema({
    adminId:{
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
AdminSchema.statics.login=async function(email,password){
    const admin=await this.findOne({email:email})
    if(admin){
        const auth=await brcypt.compare(password,customer.password)
         if (auth){
            return customer

         }
        throw Error('Incorrect password')
    }
    throw Error('Incorrect email')
}

const Admins = mongoose.model('Admin' , AdminSchema)

module.exports = Admins