const express=require("express");
const app=express();

// app.use((req,res)=>{
    // console.log("Hi.I am Middleware");  when we execute this only this respond is send ,res of other path is not send ,to do so we need to write next() ;
//     res.send("Middleware executed");
// });

// app.use((req,res,next)=>{
//     console.log("Hi, I am 1st Middleware");
//     next(); //this calls 2nd middleware 
// });

// app.use((req,res,next)=>{
//     console.log("Hi, I am 2nd Middleware");
//     next(); //this calls next all paths
// });


// //Logger
// app.use((req,res,next)=>{
//     req.time=Date.now(); //we can manipulate req object ,here we added our method named [time]
//     console.log(req.method,req.hostname,req.path,req.time);
//     next();  
// });

app.use("/random",(req,res,next)=>{
    console.log("I am only for /random ");
    next();
});

//404
app.use((req,res)=>{
    console.log("Page not found!!");//we write this when all middleware are listed.
});

app.get("/",(req,res)=>{
    res.send("I am root");
});

app.get("/random",(req,res)=>{
    res.send("This is random Path");
});


app.listen(8080,()=>{
    console.log("Port Listening to port 8080");
});