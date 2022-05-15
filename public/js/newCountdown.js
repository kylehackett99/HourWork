// Implement a Count Down Timer feature
// Timer will count down the amount of time that is left to upload file

// Export function - mindMapcompenent.js 126
// due date would be prop

// index.js 142 - how to put it in the file
// Testing - throw it in the index.js file 
// grab date from home.js file

    
function getTimeRemaining (dueDate) {
    const total = new Date(dueDate) - new Date();
    const seconds = Math.ceil( (total/1000) % 60 );
    const minutes = Math.ceil( (total/1000/60) % 60 );
    const hours = Math.ceil( (total/(1000*60*60)) % 24 );
    const days = Math.ceil( total/(1000*60*60*24) );

    return {
        total, days, hours, minutes, seconds
    };
}


function setTimer() {
   // This is where I grab the dueDate from session storage
   var dueDate = sessionStorage.getItem('due-date');

   var x = getTimeRemaining(dueDate);
   var timerString = "";

   if ( x.days < 0 && x.hours < 0 && x.minutes < 0 && x.seconds < 0 ){

    timerString = "Past Due" ;

   }else if ( dueDate == null ){
    timerString = "invalid date" ;

   } else if ( x.days >= 1){
         timerString = x.days  + x.hours ;

    } else if( x.days < 1 && x.hours >= 1){

        timerString = x.hours  + x.minutes;

    } else if( x.days < 1 && x.hours < 1){

    timerString = x.minutes + x.seconds;

}
   


   //temporary, change fill timerString with the calculated countdown string
    //timerString = dueDate;

    // HTML LINE
    document.getElementById('countdown').innerHTML = timerString;
}


setTimer();