window.onload = async ()=>{
    let response = await axios({
        method: 'post',
        url: "http://localhost:3000/check_authen",
        headers: {
            "Access-Control-Allow-Origin":"*",
            "Content-type":"application/json",
            "Authorization":"Bearer "+ localStorage.getItem("access_token")
        }
    });
    console.log(response.data)
    if (response.data != false){

    }else{
        location.href = "http://localhost:3000/login"
    }

}