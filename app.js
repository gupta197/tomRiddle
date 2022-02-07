const express = require("express"),
  app = express(),
  bodyParser = require("body-parser");

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

console.log("Hello World");
app.get("/", (req, res) => {
  const value1 = 20;
  const value2 = 79;
  const sum = value1 + value2;
  console.log("Sum of 2 value = ", sum);
  return res.send("Welcome Tom Riddle");
});

app.get("**", (req, res) => {
  console.log("Unknown Url");
  return res.send("Page Not Found");
});
app.post("/sum", (req, res) => {
  try {
    console.log(req.body);
    const { value1, value2 } = req.body;
    if (
      value1 &&
      value2 &&
      typeof value1 == "number" &&
      typeof value2 == "number"
    ) {
      console.log(value1, value2, "Type of values", typeof value1);
      const total = value1 + value2;
      return res.send(`Your Answers
              ${value1} + ${value2} = ${total}
              `);
    }
    return res.send("Please Provide  Numbers");
  } catch (error) {
    res.send(`Something Went Wrong ${error.message}`);
  }
});
app.listen(8080, () => {
  const portListenUrl = `http://localhost:8080`;
  console.log("app listen on this port = ", portListenUrl);
});
