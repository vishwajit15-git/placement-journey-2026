const express=require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose");
const Chat=require("./models/chats.js")

main()
    .then(()=>{
        console.log("Connection Succesfull");
    })
    .catch((err)=>{
        console.log(err);
    });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}; 

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

app.listen(8080,()=>{
    console.log("App is Listening");
});

// let chat1=new Chat({
//     from:"vishwa",
//     to:"sharwa",
//     msg:"Hey hru??",
//     created_at: new Date()
// });

// chat1.save()
//     .then((res)=>{
//         console.log(res);
//     })
//     .catch((err)=>{
//         console.log(err);
//     });


//Index Route
app.get("/chats",async (req,res)=>{
    let chats=await Chat.find();
    res.render("chat.ejs",{chats});
});


app.get("/",(req,res)=>{
    res.send("working root");
});