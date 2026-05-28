
const API = "http://localhost:5000";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async(e)=>{

    e.preventDefault();

    const email = loginForm[0].value;

    const password = loginForm[1].value;

    const response = await fetch(`${API}/admin/login`,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body: JSON.stringify({
            email,
            password
        })

    });

    const data = await response.json();

    if(data.token){

        localStorage.setItem("token",data.token);

        alert("Login Successful");

        window.location.href = "index.html";

    }else{

        alert(data.message);

    }


});