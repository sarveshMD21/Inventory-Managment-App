const mongoose=require('mongoose');
const Product=require('./models/product');

mongoose.connect('mongodb://localhost:27017/Amazon', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connection opened");
});

/*Product.insertMany([
    {name:"Redmi" , price:20000, category:"electronics"},
    {name:"Dove" , price:100, category:"FMCG"},
    {name:"Pepe Jeans" , price:1000, category:"Clothes"},
    {name:"LG grinder" , price:10000, category:"Appliance"}
]).then(data=>{
    console.log(data)});*/
/*Product.deleteMany({name:"Maggi"}).then(data=>{
    console.log(data);
});*/
