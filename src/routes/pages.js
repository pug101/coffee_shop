const TokenManager = require("../models/token_manager");

module.exports = app => {
    let user = [
        {id:"1", username: "josh_snow", email:"josh_snow@gmail.com", lname:"snow", password:"12345678"},
        {id:"2", username: "nany_snow", email:"nany_snow@gmail.com", lname:"snow", password:"12345678"}
    
    ]

    app.get("/", (req, res) => {
        res.render('index')
    });


    app.get("/login", (req, res) => {
        res.render('login')
    });

    app.post("/check_authen", (req, res) => {
        let jwtStatus = TokenManager.checkAuthentication(req);
        if (jwtStatus != false){
            res.send(jwtStatus);
        }else{
            res.send(false);
        }
    })

    app.post("/login",(req, res) => {
        let userData = req.body;
        let userLoginData = user.find((value)=> {return(value.email==userData.email&&value.password==userData.password)});
        if(userLoginData==undefined){
            res.send(JSON.stringify({status:"0"}));
        }else{
            let accressToken =TokenManager.getGenerateAccressToken({"email":userLoginData.email});
            res.send(JSON.stringify({status:"1", "access_token":accressToken}))
        }
    
    })

    app.post("/get_token/:email",(req, res) =>{
        res.send(TokenManager.getGenerateAccressToken({"email":req.params.email}))
    });
};