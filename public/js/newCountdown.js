
// Calculates the Time in Days.hours.minutes.seconds until desired due date
function getTimeRemaining (dueDate) {
    const total = new Date(dueDate) - new Date();
    const seconds = Math.floor( (total/1000) % 60 );
    const minutes = Math.floor( (total/1000/60) % 60 );
    const hours = Math.floor( (total/(1000*60*60)) % 24 );
    const days = Math.floor( total/(1000*60*60*24));

    return {
        total, days, hours, minutes, seconds
    };
}


var intervalID = 0;
function updateTime(){
 setTimer();
}


// gets due Date from the session storage and updates the display according to the time retrieved
function setTimer() {
    console.log(1);
    // This is where I grab the dueDate from session storage
    var dueDate = sessionStorage.getItem('due-date');

    var timerString = "";

    if ( dueDate == "" || dueDate === "undefined"){
        document.getElementById("countdown").innerHTML = "countdown to due date:<br>invalid date provided!";
        return;
    }

    var x = getTimeRemaining(dueDate);

    // Determines display based on remaining time
    if ( x.days >= 1){
        timerString = x.days + ' days '  + x.hours + ' hours';
    } else if( x.hours >= 1){
        timerString = x.hours + ' hours '  + x.minutes + ' minutes';
    } else if( x.minutes >= 1){
        timerString = x.minutes + ' minutes ' + x.seconds + ' seconds';
    } else if( x.seconds >= 1){
        timerString = x.seconds + ' seconds';
    } else {
        document.getElementById("countdown").innerHTML = "countdown to due date:<br/> file is past due!";
        return;
    }
   
    // HTML LINE
    document.getElementById('countdown').innerHTML = "countdown to due date:<br>" +  timerString;
}

/* MAINTAIN COUNTDOWN AFTER REFRESH */
if (sessionStorage.getItem("due-date")) {
    intervalID = setInterval(updateTime, 1000,);
} else {
    document.getElementById('countdown').innerHTML = "countdown to due date:<br> upload to get started!";
}

