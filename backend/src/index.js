// let's go!
require('dotenv').config({path:'variables.env'});
const cookieParser=require('cookie-parser');
const jwt = require('jsonwebtoken');

const createServer = require('./createServer');
const server = createServer();
const db =require('./db');
//TODO use express middleware to handle cookies
server.express.use(cookieParser());
//TODO use express middleware to populate current user
//decode the JWT so we can get the user Id on each request
server.express.use((req,res,next)=>{
  const {token}=req.cookies;
  console.log(`token is ${token}`);

  if(token){
    const {userId}=jwt.verify(token,process.env.APP_SECRET);
    //put the userId onto the req for future requests to acess
    req.userId=userId;
  }
  next();

});
server.start(
  {
  cors:{
      credentials: true,
    // this port with frontend will only be the only user of this server
    origin: process.env.FRONTEND_URL,
  },
},deets=>{
  console.log(`Server is now running on port
    http:/localhost:${deets.port}`);
}
);
