// library
const mongoose = require("mongoose");

//connecting
main().catch(err => console.log("database err"+err));
async function main(){
    await mongoose.connect ('mongodb+srv://sumitsingh3357:symits9957cluster@clustersymits54321.zaczmjp.mongodb.net/?retryWrites=true&w=majority')
}

 // connect to DB
const db = mongoose.connection;

//error
db.on('error',console.error.bind(console,'error connecting to db'));
 
// up and running then print the message
db.once('open',function(){
  console.log('Succesfully connected to the database')
});

