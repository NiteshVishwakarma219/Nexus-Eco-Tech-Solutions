
const API = "http://localhost:5000";

/* ================= SECTION SWITCH ================= */

function showSection(section, element){

    /* HIDE ALL */

    document.getElementById("dashboardSection").style.display = "none";
    document.getElementById("messagesSection").style.display = "none";
    document.getElementById("subscribersSection").style.display = "none";

    /* REMOVE ACTIVE */

    document.querySelectorAll(".menu-item").forEach(item=>{

        item.classList.remove("active");

    });

    /* ACTIVE MENU */

    element.classList.add("active");

    /* SHOW SECTION */

    if(section === "dashboard"){

        document.getElementById("dashboardSection").style.display = "block";

        document.getElementById("pageTitle").innerText = "Dashboard";

    }

    if(section === "messages"){

        document.getElementById("messagesSection").style.display = "block";

        document.getElementById("pageTitle").innerText = "Messages";

    }

    if(section === "subscribers"){

        document.getElementById("subscribersSection").style.display = "block";

        document.getElementById("pageTitle").innerText = "Subscribers";

    }

}

/* ================= LOAD CONTACTS ================= */

async function loadContacts(){

    try{

        const response = await fetch(`${API}/contacts`);

        const data = await response.json();

        document.getElementById("messageCount").innerText = data.length;

        const table = document.getElementById("contactTable");

        table.innerHTML = "";

        data.forEach(contact=>{

            table.innerHTML += `

                <tr>

                    <td>${contact.name}</td>

                    <td>${contact.email}</td>

                    <td>${contact.service}</td>

                    <td>${contact.message}</td>

                    <td>

                        <button class="delete-btn"
                        onclick="deleteContact('${contact._id}')">

                        Delete

                        </button>

                    </td>

                </tr>

            `;

        });

    }catch(error){

        console.log(error);

    }

}

/* ================= LOAD SUBSCRIBERS ================= */

async function loadSubscribers(){

    try{

        const response = await fetch(`${API}/subscribers`);

        const data = await response.json();

        document.getElementById("subscriberCount").innerText = data.length;

        const table = document.getElementById("subscriberTable");

        table.innerHTML = "";

        data.forEach(subscriber=>{

            table.innerHTML += `

                <tr>

                    <td>${subscriber.email}</td>

                </tr>

            `;

        });

    }catch(error){

        console.log(error);

    }

}

/* ================= DELETE CONTACT ================= */

async function deleteContact(id){

    await fetch(`${API}/contact/${id}`,{

        method:"DELETE"

    });

    loadContacts();

}

/* ================= INIT ================= */

loadContacts();

loadSubscribers();

/* ================= AUTH ================= */

const token = localStorage.getItem("token");

if(!token){

    window.location.href = "login.html";

}
/* ================= LOGOUT ================= */

function logout(){

    localStorage.removeItem("token");

    window.location.href = "login.html";

}
/* ================= CONTACT CHART ================= */

const contactCtx =
document.getElementById("contactChart");

new Chart(contactCtx,{

    type:"line",

    data:{

        labels:[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun"
        ],

        datasets:[{

            label:"Contacts",

            data:[12,19,9,25,32,45],

            borderWidth:3,

            tension:0.4

        }]

    }

});

/* ================= SUBSCRIBER CHART ================= */

const subscriberCtx =
document.getElementById("subscriberChart");

new Chart(subscriberCtx,{

    type:"bar",

    data:{

        labels:[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun"
        ],

        datasets:[{

            label:"Subscribers",

            data:[5,12,18,22,30,40],

            borderWidth:2

        }]

    }

});
/* ================= PROJECT CMS ================= */

const projectForm =
document.getElementById("projectForm");

/* ADD PROJECT */

projectForm.addEventListener("submit", async(e)=>{

    e.preventDefault();

    const title = projectForm[0].value;

    const description = projectForm[1].value;

    const image = projectForm[2].value;

    await fetch(`${API}/projects`,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body: JSON.stringify({

            title,
            description,
            image

        })

    });

    alert("Project Added");

    projectForm.reset();

    loadProjects();

});

/* LOAD PROJECTS */

async function loadProjects(){

    const response =
    await fetch(`${API}/projects`);

    const data = await response.json();

    const table =
    document.getElementById("projectTable");

    table.innerHTML = "";

    data.forEach(project=>{

        table.innerHTML += `

        <tr>

            <td>
                <img
                src="${project.image}"
                class="project-image">
            </td>

            <td>${project.title}</td>

            <td>${project.description}</td>

            <td>

                <button
                class="delete-btn"

                onclick="deleteProject('${project._id}')">

                Delete

                </button>

            </td>

        </tr>

        `;

    });

}

/* DELETE PROJECT */

async function deleteProject(id){

    await fetch(`${API}/projects/${id}`,{

        method:"DELETE"

    });

    loadProjects();

}

loadProjects();