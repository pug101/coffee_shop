const jwt = require("jsonwebtoken");
const tokenData = require("../config/token_data.json");
class TokenManager{
    static getGenerateAccressToken(payload){
        return jwt.sign(payload,tokenData["secret_key"], {"expiresIn":"1d"});

    }
    static checkAuthentication(request){
        try{
            let accressToken = request.headers.authorization.split(" ")[1];
            let jwtResponse = jwt.verify(String(accressToken),tokenData["secret_key"]);
            return jwtResponse;
        }catch(error){
            return false;
        }
    }

    static getSecert(){
        return require("crypto").randomBytes(64).toString("hex");

    }
}

module.exports = TokenManager;