let timeFormat = localStorage.getItem("timeFormat") || "24";

switchTimeFormat(timeFormat)

function updateClock(){
    const now = new Date();
    let hours = now.getHours().toString().padStart(2,0);
    const minutes = now.getMinutes().toString().padStart(2,0);
    const seconds = now.getSeconds().toString().padStart(2,0);

    if (timeFormat === "12"){
        hours = hours % 12 || 12;
    }
    const horario = `${hours.toString().padStart(2, '0')}:${minutes}:${seconds}`;
    document.getElementById("clock").textContent = horario;
    

    
    highlightStage(now.getHours())
    highlightCurrentDay(now)
}

function highlightCurrentDay(now){
    const dayIndex = now.getDay()

    document.querySelectorAll(".day").forEach(day => {
        day.classList.remove("active")
    })
    const dayIds = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    document.getElementById(dayIds[dayIndex]).classList.add("active");
}

function highlightStage(hours){
    const amElement = document.querySelector(".stage:nth-child(1)");
    const pmElement = document.querySelector(".stage:nth-child(2)");
    
    amElement.classList.remove("active")
    pmElement.classList.remove("active")

    if (hours < 12){
        amElement.classList.add("active");
    }else{
        pmElement.classList.add("active")
    }
}

function switchTimeFormat(format){
    timeFormat = format

    localStorage.setItem("timeFormat", timeFormat)

    document.querySelectorAll(".typeOfTime").forEach(button => {
        button.classList.remove("active")
    })
    if (format === "24"){
        document.getElementById("military").classList.add("active");
        document.getElementById("stage-container").style.display = "none";
    } else{
        document.getElementById("normal").classList.add("active");
        document.getElementById("stage-container").style.display = "block";
    }
    updateClock()
}


updateClock();
setInterval(updateClock,1000);

