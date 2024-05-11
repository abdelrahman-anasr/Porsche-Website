const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const url = "mongodb+srv://abdelrahman2004:software123@database.99j14ho.mongodb.net/"

mongoose.connect(url).then((ans) => { 
    console.log("ConnectedSuccessful") 
  }).catch((err) => { 
    console.log("Error in the Connection") 
  }) 

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
    console.log(email)
    const admin=await this.findOne({email:email})
    console.log("Testing testing")
    console.log(admin)
    if(admin){
        const auth=await brcypt.compare(password,admin.password)
         if (auth){
            return admin

         }
        throw Error('Incorrect password')
    }
    throw Error('Incorrect email')
}


const Admins = mongoose.model('Admin' , AdminSchema)

module.exports = Admins