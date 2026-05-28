// ================= HEADER SCROLL EFFECT =================

window.addEventListener("scroll", () => {

    const header = document.querySelector(".header");

    if(window.scrollY > 50){

        header.style.boxShadow = "0 10px 30px rgba(0,0,0,0.15)";
        header.style.background = "rgba(255,255,255,0.95)";

    }

    else{

        header.style.boxShadow = "none";
        header.style.background = "rgba(255,255,255,0.92)";

    }

});

// Portfolio Filter System

const buttons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".project-card");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {

        // remove active
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");

        cards.forEach(card => {

            if(filter === "all"){
                card.style.display = "block";
            }
            else{
                if(card.classList.contains(filter)){
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            }

        });

    });
});

/* ================= CONTACT FORM ================= */

const contactForm = document.getElementById("contactForm");

if(contactForm){

    contactForm.addEventListener("submit", async function(e){

        e.preventDefault();

        const submitBtn = document.querySelector(".submit-btn");

        /* BUTTON LOADING */

        submitBtn.innerText = "Sending...";
        submitBtn.disabled = true;

        const formData = {

            name: document.querySelector('input[type="text"]').value,

            email: document.querySelector('input[type="email"]').value,

            service: document.querySelector('select').value,

            message: document.querySelector('textarea').value

        };

        /* SHOW SUCCESS IMMEDIATELY */

        alert("Message Submitted Successfully!");

        /* AUTO CLEAR */

        contactForm.reset();

        /* RESET BUTTON */

        submitBtn.innerText = "Send Message";
        submitBtn.disabled = false;

        /* SEND DATA IN BACKGROUND */

        try{

            await fetch("http://localhost:5000/contact",{

                method: "POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body: JSON.stringify(formData)

            });

        }catch(error){

            console.log(error);

        }

    });

}
const menuBtn = document.getElementById("menuBtn");

const navbar = document.getElementById("navbar");

/* MENU CLICK */

menuBtn.addEventListener("click", ()=>{

    navbar.classList.toggle("active");

});
/* ================= LOAD PORTFOLIO PROJECTS ================= */

const API = "http://localhost:5000";

async function loadPortfolio(){

    const grid = document.getElementById("portfolioGrid");

    if(!grid) return;

    const response = await fetch(`${API}/projects`);

    const data = await response.json();

    grid.innerHTML = "";

    data.forEach(project => {

        grid.innerHTML += `
        
        <div class="project-card">

            <img src="${project.image}" alt="project">

            <div class="project-content">

                <h3>${project.title}</h3>

                <p>${project.description.substring(0,100)}...</p>

                <a href="project.html?id=${project._id}" class="view-btn">
                    View Details
                </a>

            </div>

        </div>

        `;

    });

}

loadPortfolio();
