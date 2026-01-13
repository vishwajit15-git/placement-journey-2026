const mongoose = require('mongoose');

main()
    .then(()=>{
        console.log("Connection Succesfull");
    })
    .catch(err => console.log(err));



async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    age:Number,
});

const User=mongoose.model("User",userSchema);

// const user1=new User({name:"Vishwa",email:"vishwa@gmail.com",age:19});
// const user2=new User({
//     name:"Sharwa",
//     email:"sharwa@gmail.com",
//     age:20
// });


// user1.save(); // we do this way generally
// user2.save().then((res)=>{
//     console.log(res);
// }   ).catch((err)=>{
//     console.log(err);
// }); //we do not do this way generally

// User.insertMany([
//     {name:"Rudra",email:"rudra@gmail.com",age:15},
//     {name:"Raj",email:"raj@gmail.com",age:18},
//     {name:"Don",email:"don@gmail.com",age:21},
// ]).then((data)=>{
//     console.log(data);
// });

// User.find({age:{$gte:20}}).then((res)=>{
//     console.log(res);
// });


// User.updateOne({name:"Raj"},{age:55})
//     .then((res)=>{
//         console.log(res);
//     })
//     .catch((err)=>{
//         console.log(err);
//     });

// User.updateMany({age:{$gt:20}},{age:40})
//     .then((res)=>{
//         console.log(res);
//     })
//     .catch((err)=>{
//         console.log(err);
//     });


    // User.findOneAndUpdate({name:"Vishwa"},{$set:{age:39}},{new:true})
    //     .then((res)=>{
    //         console.log(res);
    //     })
    //     .catch((err)=>{
    //         console.log(err);
    //     });


 User.findByIdAndDelete("6963b527a70e089ad294e6ff")
    .then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log(err);
    });

