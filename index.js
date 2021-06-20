const express=require('express');
const app=express();
const path=require('path');
const MethodOverride=require('method-override');
app.use(MethodOverride('_method'));

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));

const mongoose=require('mongoose');
const Product=require('./models/product');


mongoose.connect('mongodb://localhost:27017/Amazon', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connection opened");
});

const categories=["FMCG","Clothes","electronics","Appliances","Kitchen","Kids","Furtinure","Book"];

app.get("/Products",async (req,res)=>{
    const products=await Product.find({});
    res.render("index",{products});
})

app.get("/Products/:id",async (req,res)=>{
  const {id}=req.params;
  const product=await Product.findById(id);
  res.render("show",{product});
})

app.get("/new", (req,res)=>{
  res.render("new",{categories});
})

app.post("/Products",async (req,res)=>{
   const newproduct=new Product(req.body);
   await newproduct.save();
   res.redirect("/Products");
})

app.get("/edit/:id",async (req,res)=>{
  const {id}=req.params;
  const product = await Product.findById(id);
  res.render("edit",{product,categories});
})

app.put("/Products/:id",async (req,res)=>{
   const {id} =req.params;
   const product=await Product.findByIdAndUpdate(id,req.body,{runValidators:true,new:true});
   res.redirect(`/Products/${product._id}`);
})

app.delete("/Products/:id",async (req,res)=>{
   const {id}=req.params;
   const product=await Product.findByIdAndDelete(id);
   res.redirect("/Products");
})

app.listen(3000,()=>{
  console.log("Helloo!!!!!");
})
