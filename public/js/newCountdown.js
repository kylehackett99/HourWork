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
    const days = Math.floor((total / 1000 * 60 * 60));

    return {
        total, days, hours, minutes, seconds
    };
}


function setTimer() {
   // This is where I grab the dueDate from session storage
   var dueDate = sessionStorage.getItem('due-date');

   var x = getTimeRemaining(dueDate);
   var timerString = "";

   if ( dueDate == null ){
    timerString = "invalid date" ;

   } else if ( days >= 1){
         timerString = x.days + ":" + x.hours ;

    } else if( days < 1 && hours >= 1){

        timerString = x.hours + ":" + x.minutes;
    } else if( days < 1 && hours < 1){

    timerString = x.minutes + ":" + x.seconds;
}
   


   //temporary, change fill timerString with the calculated countdown string
   timerString = dueDate;

    // HTML LINE
    document.getElementById('countdown').innerHTML = timerString;
    setTimer();



}