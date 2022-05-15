// Implement a Count Down Timer feature
// Timer will count down the amount of time that is left to upload file

// Export function - mindMapcompenent.js 126
// due date would be prop

// index.js 142 - how to put it in the file
// Testing - throw it in the index.js file 
// grab date from home.js file


    
    
const getTimeRemaining = (myDate) => {
    const total = Date.parse(dueDate) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 * 60 * 60) % 24);

    return {
        total, hours, minutes, seconds
    };
}

const startTimer = (myDate) => {
    let { total, hours, minutes, seconds } 
                = getTimeRemaining(myDate);
    if (total >= 0) {

        // update the timer
        // check if less than 10 then we need to 
        // add '0' at the begining of the variable
        setTimer(
            (hours > 9 ? hours : '0' + hours) + ':' +
            (minutes > 9 ? minutes : '0' + minutes) + ':'
            + (seconds > 9 ? seconds : '0' + seconds)
        )
    }
}

const clearTimer = (myDate) => {
  
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next    
    setTimer('00:00:10');

    // If you try to remove this line the 
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
        startTimer(e);
    }, 1000)
    Ref.current = id;
}

const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if 
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + 10);
    return deadline;
}

const calcCountDown = () => {
    var calcString = "";

    hours = deadline.getTimeRemaining.hours;



    calcString = hours;

    return calcString;

}

 



function setTimer() {
   // This is where I grab the dueDate from session storage
   var dueDate = sessionStorage.getItem('due-date');

   var timerString = "";

   //temporary, change fill timerString with the calculated countdown string
   timerString = dueDate;

    // HTML LINE
    document.getElementById('countdown').innerHTML = timerString;
    setTimer();
}