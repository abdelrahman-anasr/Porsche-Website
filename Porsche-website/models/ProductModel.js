const mongoose = require('mongoose')
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

const Products = mongoose.model('Products' , ProductSchema)

module.exports = Products