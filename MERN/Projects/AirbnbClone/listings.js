const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
main()
    .then(()=>{
        console.log("Connected to DB");
    })
    .catch((err)=>{
        console.log(err);
    });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get("/",(req,res)=>{
    res.send("HI,Iam Groot");
});

// app.get("/testListing",async (req,res)=>{
//     let sampleListing=new Listing({
//         title:"Grand 3BHK Villa",
//         description:"Luxurous Villa",
//         price:20000,
//         location:"Pune,Maharashtra",
//         country:"India"
//     });

//     await sampleListing.save().then((res)=>console.log(res)).catch((err)=>console.log(err))
//     console.log("Sample was saved!");
//     res.send("Succesfull");
// });


//Index Route 
app.get("/listings",async(req,res)=>{
    let allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
});

//Show Route (Each individual listing)
app.get("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

app.listen(8080,()=>{
    console.log("Server is listening to port: 8080");
})