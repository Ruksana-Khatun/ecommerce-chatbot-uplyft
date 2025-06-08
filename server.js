const express=require('express');
const morgan = require('morgan');
const app=express();
const path=require('path');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const PORT=3000;
const userMiddleware = require('./middleware/userMiddleware')
const userRoutes = require('./routes/user.routes');

// middleware
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use((morgan('dev')));

// routes
app.use("/api/user",userRoutes);
// app.use('/chatbot',chatbot);


app.get('/ruksana',(req,es)=>{
    es.send("hi hello how ae you")
});

mongoose.connect(process.env.MONGO_URL|| 'mongodb://localhost:27017/mydatabase')
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
.catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

