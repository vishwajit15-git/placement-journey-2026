const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

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

//Create New[GET]
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});

//Show Route (Each individual listing)
app.get("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

//Create Route[POST]
app.post("/listings",async(req,res)=>{
    //let {title,description,image,price,location,country}=req.body; //ye sab krne se accha hai kee hum ek object mai store krwaye ye sab look for [name=""] format in new.ejs
    let listing=req.body.listing;
    let newListing=await new Listing(listing);
    newListing.save();
    res.redirect("/listings");
});

//Update Route [GET ID]
app.get("/listings/:id/edit",async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});
//Update Route [PUT ID]
app.put("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});//here it is same like we did in Creat Route [POST] but here we did it directly three dot means deconstruct the listing object
    res.redirect(`/listings/${id}`);
});

//DELETE ROUTE
app.delete("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});

app.listen(8080,()=>{
    console.log("Server is listening to port: 8080");
})