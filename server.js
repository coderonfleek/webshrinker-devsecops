const express = require("express");
const path = require("path");
const app = express();
let bodyParser = require("body-parser");

let port = process.env.PORT || "5000";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.post("/sendinfo", (req, res) => {

    let email = req.body.email;

    if(!validEmail(email)){
        email = "Enter a Valid Email e.g test@company.com";
    }
    
    res.send({email});
});

function validEmail(mail) 
{
 return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
  
}


app.listen(port, () => {
    console.log(`App Running at http://localhost:${port}`);
})

