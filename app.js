const express = require("express");
const https = require("https"); 

const app = express();

app.use(express.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res){

    ////////////////////////
    const query = req.body.cityName;
    const apiKey = "aac1f4bcc3f08cf0fa3a191188866a2d";
    const units = "metric";

    const url ="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&APPID=" + apiKey + "&units="+units+"";
    
    /////////////////////////////////
    https.get(url, function(response){

        // get data from API response for JSON format
        response.on("data", function(data){

            //convert API data into JSON
            const weatherData = JSON.parse(data);

            // getting tempreture from the JSON
            const temp = weatherData.main.temp;

            // get weather description from the JSON
            const weatherDescr = weatherData.weather[0].description;

            //get weather icon and put it in a url to get the image.
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            
            res.write("<p> The weather is currently " + weatherDescr + "</p>")
            res.write("<h1>The temperature in "+ query + " is " + temp + " degree Celecius.</h1>")
            res.write("<img src=" + imageURL + ">")

            res.send();
        })
    })
})



app.listen(3000, function(){
    console.log("server is running on port 3000.");
})



    