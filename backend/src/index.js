// let's go!
require('dotenv').config({path:'variables.env'});
const cookieParser=require('cookie-parser');


const createServer = require('./createServer');
const server = createServer();
const db =require('./db');
//TODO use express middleware to handle cookies
server.express.use(cookieParser());
//TODO use express middleware to populate current user
server.start(
  {
  cors:{
    credentials:true,
    // this port with frontend will only be the only user of this server
    orgin: process.env.FRONTEND_URL,
  },
},deets=>{
  console.log(`Server is now running on port
    http:/localhost:${deets.port}`);
}
);
