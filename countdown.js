let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const completeMission = document.querySelector('.mission_complete');
const alarm = new Audio("QI Klaxon Sound Effect.mp3")


function timer(seconds) {

    clearInterval(countdown);


    const now = Date.now();
    const then = now + seconds * 1000;
    //runs displayTimeLeft once immediately
    displayTimeLeft(seconds);
    displayMissionComplete(then);
    
    countdown = setInterval(() => {
       const secondsLeft = Math.round((then - Date.now()) / 1000);
       if(secondsLeft < 0) {
           clearInterval(countdown);
           document.title = "Alert On!"
           timerDisplay.textContent = "Count Over!";
           alarm.loop = true
           alarm.volume = 0.1
           alarm.play();
           return;
       }
       displayTimeLeft(secondsLeft);
    }, 1000);
}
    //running it again. The first time above was to prevent the one second
    //delay that would happen if just ran it here
function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = display;
    console.log(display);
}

function displayMissionComplete(timestamp) {
    const done = new Date(timestamp);
    const hour = done.getHours();
    const adjustHr = hour > 12 ? hour - 12 : hour;
    const minutes = done.getMinutes();
   // completeMission.textContent = `Complete Level By ${adjustHr}:${minutes < 10 ? '0' : ''}${minutes}!!`;
}


function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

//clears the timer as well as shutting the alarm
function clearing() {
    timerDisplay.textContent = " ";
    completeMission.textContent = " ";
    document.title = "Countdown Timer";
    alarm.pause();
    clearInterval(countdown);
}

document.getElementById('reset_button').addEventListener('click', function (e) {
    e.preventDefault();
    clearing();
});
document.getElementById('start_button').addEventListener('click', startTimer);
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
});