const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema}=require("./schema.js");


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


//JOI Middleware
const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errmsg=err.details.map((el)=>el.message).join(","); //if we want to print all errors in details object from error 
        throw new ExpressError(400,error);   // here pass errmsg instead of error;
    }
    else{
        next();
    }
};

//Index Route 
app.get("/listings",wrapAsync(async(req,res)=>{
    let allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}));

//Create New[GET]
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});

//Show Route (Each individual listing)
app.get("/listings/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
}));

//Create Route[POST]
app.post("/listings",validateListing, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));


//Update Route [GET ID]
app.get("/listings/:id/edit",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}));
//Update Route [PUT ID]
app.put("/listings/:id",validateListing,wrapAsync(async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});//here it is same like we did in Creat Route [POST] but here we did it directly three dot means deconstruct the listing object
    res.redirect(`/listings/${id}`);
}));

//DELETE ROUTE
app.delete("/listings/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}));

//To test Page not found error
app.all(/.*/,(req,res,next)=>{
    next(new ExpressError(404,"Page not Found!"));
})

app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went wrong"}=err;
    res.status(statusCode).render("error.ejs",{message});
    // res.status(statusCode).send(message);
});

app.listen(8080,()=>{
    console.log("Server is listening to port: 8080");
})