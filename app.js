let express = require("express");
let app = express();
let ejs = require("ejs");
let bodyParser = require("body-parser");
let request = require("request");
let apikey = `your apikey goes here`;


app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("search");
});

app.get("/search", function(req, res){
    let query = req.query.search;
    let url = `http://www.omdbapi.com/?s=${query}&apikey=${apikey}`;
    request(url, function (error, response, body) {
      if(!error && response.statusCode == 200){
          let data = JSON.parse(body);
          res.render("results", {data: data});
          
      }else{
          console.log("Something went wrong!")
      }
});

});

let port = process.env.PORT || 3000;
app.listen(port, process.env.IP, function(){
    console.log("app is running on port " + port);
});