const  mongoose=require('mongoose');

const connect=()=>{mongoose.connect(process.env.URL,{

useNewUrlParser: true,
useUnifiedTopology: true,
// useFindAndModify: false,
// useCreateIndex: true
})
.then(()=>console.log("connected  to database"))
.catch((err)=>console.log(err.message));}


module.exports=connect;







