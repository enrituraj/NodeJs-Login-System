const mongoose = require('mongoose');

// Database value comming from .env file
const DB = process.env.DATABASE;

// Connection To Database
mongoose.connect(DB, {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true,
    //useFindAndModify:false
}).then(() => {
    console.log(`connnection successful`);
}).catch((err) =>{ 
    console.log(`no connection`,err)
});