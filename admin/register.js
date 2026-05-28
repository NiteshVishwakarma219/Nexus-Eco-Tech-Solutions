<<<<<<< HEAD
const API = "http://localhost:5000";

const registerForm =
document.getElementById("registerForm");

registerForm.addEventListener("submit", async(e)=>{

    e.preventDefault();

    const email = registerForm[0].value;

    const password = registerForm[1].value;

    const response = await fetch(`${API}/admin/register`,{

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

    alert(data.message);

    if(data.message === "Registration Successful"){

        window.location.href = "login.html";

    }

=======
const API = "http://localhost:5000";

const registerForm =
document.getElementById("registerForm");

registerForm.addEventListener("submit", async(e)=>{

    e.preventDefault();

    const email = registerForm[0].value;

    const password = registerForm[1].value;

    const response = await fetch(`${API}/admin/register`,{

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

    alert(data.message);

    if(data.message === "Registration Successful"){

        window.location.href = "login.html";

    }

>>>>>>> 6fcea545ca070d6e929133370808f9c141e4b77c
});