const express=require('express');
const morgan = require('morgan');
const app=express();
const path=require('path');
const PORT=3000;
// middleware
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use((morgan('dev')));

// routes


app.get('/ruksana',(req,es)=>{
    es.send("hi hello how ae you")
});
app.get("/api",(req,res)=>{
    res.json({
        name:"Ruksana",
        age:25,
        city:"Delhi"
    })
});
app.listen(PORT,(req,res)=>{
    console.log(`Server is running on port ${PORT}`);

})
