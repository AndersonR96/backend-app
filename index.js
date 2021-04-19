const express = require("express");

const {TOKEN, TOKEN_NOT_FOUND} = require('./constants');

const PORT = process.env.PORT || 3001;

const app = express();

const weather = require("./weather.json")

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  next();
});

app.get("/weather", (req, res)=>{
    const auth = req.headers.authorization 
    if(auth === TOKEN){return res.json(weather)}
    return res.json(TOKEN_NOT_FOUND)  
})

app.get("/*", (req, res)=>{
  res.status(302)
  return(res.redirect("/weather"))
})

app.listen(PORT, () => {
  console.log("server on")
});