
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

// gets due Date from the session storage and updates the display according to the time retrieved
function setTimer() {
    // This is where I grab the dueDate from session storage
    var dueDate = sessionStorage.getItem('due-date');

    var timerString = "";

    if ( dueDate == "" ){
        timerString = "invalid date" ;
    }

    var x = getTimeRemaining(dueDate);

    // Determines display based on remaining time
    if ( x.days >= 1){
        timerString = x.days + ' days '  + x.hours + ' hours';
    } else if( x.hours >= 1){
        timerString = x.hours + ' hours '  + x.minutes + ' minutes';
    } else if( x.minutes >= 1){
        timerString = x.minutes + ' minutes ' + x.seconds + ' seconds';
    } else {
        timerString = "Past Due" ;
    }
   
    // HTML LINE
    document.getElementById('countdown').innerHTML = timerString;
}


setTimer();
