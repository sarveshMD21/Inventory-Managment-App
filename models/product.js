const mongoose=require('mongoose');

const productschema=new mongoose.Schema({
    name:{
        type:String,
        required:true},
    price:{
        type:Number,
        required:true,
        min:0},
    category:{
        type: String,
        enum:["electronics","FMCG","Clothes","Appliance","Book","Furtinure","Kids","Kitchen"]
    }
})

const Product=new mongoose.model("Product",productschema);

module.exports=Product;