import jobs from './data.js';

function showJobs(jobsToShow) {
    const jobList = document.getElementById("jobList");
    jobList.innerHTML = "";

    if (jobsToShow.length === 0) {
        document.getElementById("noJobsMessage").style.display = "block";
    } else {
        document.getElementById("noJobsMessage").style.display = "none";
    }

    jobsToShow.forEach(job => {
        const jobElement = document.createElement("div");
        jobElement.className = "job";
        const datePosted = job.datePosted;
        const formattedDate = `${datePosted.getDate()} de ${getMonthName(datePosted.getMonth())} de ${datePosted.getFullYear()}`;
        jobElement.innerHTML = `
            <h3>${job.title}</h3> 
            <p><strong>Descripción:</strong> ${job.description}</p>
            <p><strong>Inglés requerido:</strong> ${job.englishRequired ? "Sí" : "No"}</p>
            <p><strong>Lenguaje:</strong> ${job.language}</p>
            <p><strong>Experiencia:</strong> ${job.seniority}</p>
            <p><strong>💰</strong> ${job.annualSalary} (anual)</p>
            <p>${formattedDate}</p>
            <button class="apply-button">Aplicar</button>
        `;
        jobList.appendChild(jobElement);
    });

    const applyButtons = document.querySelectorAll(".apply-button");
    applyButtons.forEach(button => {
        button.addEventListener("click", showApplicationForm);
    });
}

function showApplicationForm() {
    const modal = document.createElement("div");
    modal.className = "modal";
    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    modal.appendChild(modalContent);

    const close = document.createElement("span");
    close.className = "close";
    close.innerHTML = "&times;";
    modalContent.appendChild(close);

    const applicationForm = document.createElement("form");
    applicationForm.id = "applicationForm";

    const emailLabel = document.createElement("label");
    emailLabel.textContent = "Correo electrónico:";
    const emailInput = document.createElement("input");
    emailInput.id = "email";
    emailInput.type = "email";
    emailInput.required = true;
    emailLabel.appendChild(emailInput);

    const cvLabel = document.createElement("label");
    cvLabel.textContent = "Cargar CV:";
    const cvInput = document.createElement("input");
    cvInput.id = "cv";
    cvInput.type = "file";
    cvInput.accept = ".pdf";
    cvInput.required = true;
    cvLabel.appendChild(cvInput);

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Enviar postulación";

    applicationForm.appendChild(emailLabel);
    applicationForm.appendChild(cvLabel);
    applicationForm.appendChild(submitButton);

    modalContent.appendChild(applicationForm);

    document.body.appendChild(modal);

    close.addEventListener("click", () => {
        modal.style.display = "none";
    });

    modal.style.display = "block";

    applicationForm.addEventListener("submit", event => {
        event.preventDefault(); 

        alert("¡Gracias por postularte para este puesto! Revisaremos tu perfil y nos pondremos en contacto lo antes posible.");
        modal.style.display = "none";
    });
}

function getMonthName(month) {
    const monthNames = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    return monthNames[month];
}

let jobsShown = 6;


function loadMoreJobs() {
    jobsShown += 6; 
    showJobs(jobs.slice(0, jobsShown)); 
    if (jobsShown >= jobs.length) {
        document.getElementById("loadMoreButton").style.display = "none";
    }
}

function filterAndSortJobs() {
    const selectedLanguage = document.getElementById("languageFilter").value;
    const selectedSeniority = document.getElementById("seniorityFilter").value;
    const englishRequired = document.getElementById("englishFilter").checked;
    const selectedDate = document.getElementById("dateFilter").value;
    const selectedSort = document.getElementById("sortFilter").value;

    let filteredJobs = jobs;

    if (selectedLanguage !== "all") {
        filteredJobs = filteredJobs.filter(job => job.language === selectedLanguage);
    }

    if (selectedSeniority !== "all") {
        filteredJobs = filteredJobs.filter(job => job.seniority === selectedSeniority);
    }

    if (englishRequired) {
        filteredJobs = filteredJobs.filter(job => job.englishRequired);
    }

    if (selectedDate !== "all") {
        const currentDate = new Date();
        const filterDate = new Date(currentDate);

        if (selectedDate === "last7days") {
            filterDate.setDate(currentDate.getDate() - 7);
        } else if (selectedDate === "last30days") {
            filterDate.setMonth(currentDate.getMonth() - 1);
        }

        filteredJobs = filteredJobs.filter(job => job.datePosted >= filterDate);
    }

    if (selectedSort === "newest") {
        filteredJobs.sort((a, b) => b.datePosted - a.datePosted);
    } else if (selectedSort === "oldest") {
        filteredJobs.sort((a, b) => a.datePosted - b.datePosted);
    }

    jobsShown = 8; 
    showJobs(filteredJobs);
    if (filteredJobs.length <= jobsShown) {
        document.getElementById("loadMoreButton").style.display = "none";
    } else {
        document.getElementById("loadMoreButton").style.display = "block";
    }
}

document.getElementById("loadMoreButton").addEventListener("click", loadMoreJobs);

document.getElementById("languageFilter").addEventListener("change", filterAndSortJobs);
document.getElementById("seniorityFilter").addEventListener("change", filterAndSortJobs);
document.getElementById("englishFilter").addEventListener("change", filterAndSortJobs);
document.getElementById("dateFilter").addEventListener("change", filterAndSortJobs);
document.getElementById("sortFilter").addEventListener("change", filterAndSortJobs);

showJobs(jobs.slice(0, jobsShown));

function showImportantMessage() {
    const importantMessage = document.getElementById("importantMessage");
    importantMessage.style.display = "block";
}

showImportantMessage();

