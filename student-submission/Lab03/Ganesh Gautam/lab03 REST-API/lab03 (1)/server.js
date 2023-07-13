// creating a http server
const http = require("http");
const getReq= require("./methods/get-request");
const postReq= require("./methods/post-request");
const putReq= require("./methods/put-request");
const deleteReqReq= require("./methods/delete-request");

let products = require("./data/products.json");

// require("dotenv").config();

//port for our server to listen
const PORT = process.env.PORT || 5001;

//creating a http server we must have req res as para
const server = http.createServer((req,res)=>{

  req.products = products;
switch(req.method){
  case "GET":
  getReq(req,res);
  break;
  case "POST":
  postReq(req,res);
  break;
  case "PUT":
  putReq(req,res);
  break;
  case "DELETE":
  deleteReq(req,res);
  break;
  default:
    res.statusCode= 404;
  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify({title: "Not Found", message:"Route not found"}));
  res.end();
}
});

server.listen(PORT, ()=>{
  console.log(`Server started on port: ${PORT}`);
})