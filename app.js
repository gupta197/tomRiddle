const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  registerUser = [],
  mongo = require("mongodb"),
  connection = require("./database/database"),
  fetch = require('node-fetch');

var userModel = require('./model/users');

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// Home Page Url
app.get("/", (req, res) => {
  const value1 = 20;
  const value2 = 79;
  const sum = value1 + value2;
  return res.send("Welcome Tom Riddle");
});
// Sum Of 2 number
app.post("/sum", (req, res) => {
  try {
    const { value1, value2 } = req.body;
    console.log(value1, value2);
    if (
      value1 &&
      value2 &&
      typeof value1 == "number" &&
      typeof value2 == "number"
    ) {
      const total = value1 + value2;
      return res.send(`Your Answers
              ${value1} + ${value2} = ${total}
              `);
    }
    return res.send({ status: 400, message: "Missing Parameters..." });
  } catch (error) {
    return res.send(`Something Went Wrong ${error.message}`);
  }
});
// Register Users
app.post("/register", (req, res) => {
  const { email, password, firstName, lastName, address } = req.body;
  try {
    if (!email || !password || !firstName || !address) {
      return res.send({ status: 400, message: "Missing Parameters..." });
    }
    if (!registerUser.length) {
      registerUser.push({
        Name: lastName ? firstName + " " + lastName : firstName,
        Email: email,
        Address: address,
      });
      return res.send({ status: 200, message: "User Register SuccessFully " });
    }
    let users = {};
    registerUser.forEach((user) => {
      if (user.Email == email) {
        users = user;
      }
    });
    if (users && users.Email) {
      return res.send({
        status: 404,
        message: "User Already Register",
      });
    }
    registerUser.push({
      Name: lastName ? firstName + " " + lastName : firstName,
      Email: email,
      Address: address,
    });
    return res.send({ status: 200, message: "User Register SuccessFully " });
  } catch (error) {
    return res.send({
      status: 500,
      message: `Something Went Wrong ${error.message}`,
    });
  }
});
// Get ALL Users
app.get("/users", (req, res) => {
  try {
    if (!registerUser.length) {
      return res.send({ status: 404, message: "No User found" });
    }
    // const message =
    return res.send({
      status: "200",
      message: "User Found SuccessFully",
      response: registerUser,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: `Something Went Wrong ${error.message}`,
    });
  }
});
// User Login API
app.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send({ status: 400, message: "Missing Parameters..." });
    }
    if (!registerUser.length) {
      return res.send({ status: 400, message: "User Not Register Yet..." });
    }
    let users = {};
    registerUser.forEach((user) => {
      if (user.Email == email) {
        users = user;
      }
    });
    if (users && users.Email) {
      return res.send({
        status: 200,
        message: "Login Successfully",
        response: users,
        // token:
      });
    }
    return res.send({
      status: 404,
      message: "User not Register yet .."
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: `Something Went Wrong ${error.message}`
    });
  }
});

app.get("/weather",async (req,res)=>{
  try {
    // get Weather api key from Config file
    let weather_API_key = '1b63bb63c92a040eaadb998c8617438d';
    let params = {
      lat : req.body.lat || 25.2744,
      long : req.body.long || 133.7751,
      weather_API_key : weather_API_key
    }
    console.log(params)
    let response = await getWeatherAPICall(params);
    console.log("response",response);
    if(response){
      return res.send({
        status: 200,
        message: "Get Weather Successfully",
        response: response,
      });
    }else{
      return res.send({
        status: 404,
        message: "Something went wrong ..",
        response: response
      });
    }
  } catch (error) {
    console.log("Error in weather api",error)
    return res.send({
      status: 500,
      message: `Something Went Wrong ${error.message}`,
    });
  }


});

// URL not Found Api
app.get("**", (req, res) => {
  return res.send({ status: 503, message: `Page Not Found` });
});

// Server Port Listen
app.listen(8080, () => {
  const portListenUrl = `http://localhost:8080`;
  console.log("app listen on this port = ", portListenUrl);
});


async function getWeatherAPICall(params){
  let url  = `https://api.openweathermap.org/data/2.5/onecall?lat=${params.lat}&lon=${params.long}&appid=${params.weather_API_key}`;
  try {
    const response = await fetch(url);
    let resposeJSON = response.json()
    return resposeJSON;
  } catch (error) {
   console.log("error",error) 
   return error;
  }
}

/* 
madasi5317
madasi5317@shbiso.com
tempEmail@10
https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

1b63bb63c92a040eaadb998c8617438d
https://api.openweathermap.org/data/2.5/onecall?lat=25.2744&lon=133.7751&appid=406f949369cfb2a50a8098ea9829108b
 */