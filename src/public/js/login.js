const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');
const submitLogin = document.getElementById('submit-login')


registerLink.addEventListener('click', ()=>{
    wrapper.classList.add('active');
})


loginLink.addEventListener('click', ()=>{
    wrapper.classList.remove('active');
})


btnPopup.addEventListener('click', ()=>{
    wrapper.classList.add('active-popup');
})

iconClose.addEventListener('click', ()=>{
    wrapper.classList.remove('active-popup');
})

submitLogin.addEventListener('click', login)

async function login(){
    let data = {"email": document.getElementById("email-login").value,
                "password": document.getElementById("password-login").value}
    console.log(data)
    let response = await axios({
        method: "post",
        url: "http://localhost:3000/login",
        headers: {
            "Access-Control-Allow-Origin":"*",
            "Content-type":"application/json"
        },
        data:JSON.stringify(data)
    });
    if (response.data.status=="0"){
        alert("Not found username")
    }else if(response.data.status=="1"){
        localStorage.setItem("access_token", response.data.access_token);
        location.href="http://localhost:3000/";
    }
}