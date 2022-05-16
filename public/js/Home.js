/* file upload button */
const fileUploadButton = document.getElementById('file-upload');
/* file chosen text */
const fileChosen = document.getElementById('file-chosen');
/* output text */
const output = document.getElementById('output');

fileChosen.addEventListener('mouseover', function handleMouseOver() {
    fileChosen.style.color = '#1c45a8';
    fileChosen.style.cursor = 'pointer';
  });
  
fileChosen.addEventListener('mouseout', function handleMouseOut() {
    fileChosen.style.color = 'black';
    fileChosen.style.cursor = 'default';
  });

/* interval var for countdown */
var interval;

/* countdown -- helper function that creates a countdown using the due date */
function countdown(dueDate) {
    var endDate = new Date(dueDate).getTime();
    var currDate = new Date().getTime();
    var distance = endDate - currDate;

    // if date object is valid, start countdown
    if (!isNaN(endDate)) {
        if (distance < 0) {
            clearInterval(interval);
            document.getElementById("countdown").innerHTML = "countdown to due date:<br>0d 0h 0m";
        } else {
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            document.getElementById("countdown").innerHTML = "countdown to due date:<br>" + days + "d " + hours + "h " + minutes + "m";
        }
    // otherwise, return an error message to the countdown component
    } else {
        document.getElementById("countdown").innerHTML = "countdown to due date:<br>invalid date provided!";
    }
}

fileUploadButton.addEventListener('change', function() {

    /* get file */
    var file = this.files[0];

    /* once a file is added, change the file chosen text to reflect the name of 
       the file uploaded */
    fileChosen.textContent = file.name;
    sessionStorage.setItem("uploaded-file-name", file.name)

    /* create a new FileReader */
    var fileReader = new FileReader();

    /* title and due date -- title will be at the center of the mindmap */
    var title;
    var dueDate;
    var parentArray = [];
    var headers = 0;
    const MAP_START_LINE = 2;

    /* uploads the contents of the file and displays them on the page */
    fileReader.onload = function() {
        output.textContent=this.result;
        sessionStorage.setItem("file-contents", this.result);

        /* read input line by line */
        var lines = this.result.split('\n');

        /* title and due date -- title will be at the center of the mindmap */
        title = lines[0];
        dueDate = lines[1];

        /* SET COUNTDOWN */
        interval = setInterval(countdown(dueDate), 1000);
       
        for (var line = MAP_START_LINE; line < lines.length-1; line++) {
            /* Gets the leading heading
             * Relies on: empty line before, no tabs at index & index+1 */
            if (lines[line - 1] === "" 
                && lines[line].indexOf('\t')==-1 
                && lines[line + 1].indexOf('\t') == -1
                &&  (line + 2 == lines.length || lines[line + 2].indexOf('\t') == -1) ) //tab or last line in file
                {
                /// if empty line or last line of File 
                if (lines[line + 2] == "" || line + 2 == lines.length){
                    parentArray[headers] = { front: lines[line], 
                                         back: lines[line+1], 
                                         children: [], 
                                         weight: 0};
                    headers++;
                } else {
                    parentArray[headers] = { front: lines[line], 
                                             back: lines[line+1], 
                                             children: [], 
                                             weight: parseFloat(lines[line + 2])};
                    headers++;
                }

            /* Checks for nested values
             * Relies on: empty line before & \t at the beginning of the line */
            } else if (lines[line-1] == "" && lines[line].indexOf('\t')!=-1 ) {
                var index = 0;
                var tabCounter = 0;

                /* counts # of tabs
                 * STRETCH GOAL: extend this to support \t\t */
                while (lines[line].charAt(index) === "\t") {
                    tabCounter++;
                    index++;
                }

                /* single tab -- \t */
                if (tabCounter == 1) {

                    /// if empty Line or last line of File
                    if (lines[line + 2] == "" ||  line + 2 == lines.length){
                        
                        /* remove tab from beginning of line prior to inserting
                        * a node and it's child into the array */
                        lines[line] = lines[line].replace("\t", ""); 
                        lines[line + 1] = lines[line + 1].replace("\t", ""); 
                        
                        parentArray[headers-1].children.push({front: lines[line], 
                                                              back: lines[line+1], 
                                                              children: [], 
                                                              weight: 0 });
                    } else {
                       /* remove tab from beginning of line prior to inserting
                       * a node and it's child into the array */
                       lines[line] = lines[line].replace("\t", ""); 
                       lines[line + 1] = lines[line + 1].replace("\t", ""); 
                       lines[line + 2] = lines[line + 2].replace("\t", "");
                       
                       parentArray[headers-1].children.push({front: lines[line], 
                                                             back: lines[line+1], 
                                                             children: [], 
                                                             weight: parseFloat(lines[line + 2])});
                    }
                }
            }
        }

        //Attatch the headers to the head node
        var headNode = {
            front: lines[0], 
            back: "", 
            children: [], 
            weight: 0 };
        for (var i = 0; i < headers; i++){     
            headNode.children.push(parentArray[i]);
        }
    
        // add title, dueDate, headNode to localStorage
        sessionStorage.setItem("file-name", title);
        sessionStorage.setItem("due-date", dueDate);
        sessionStorage.setItem("head-node", JSON.stringify(headNode));
    

        var event = new Event('newFileUploaded');

        document.dispatchEvent(event);
        setTimer();

    }
    fileReader.readAsText(file);
})

/* MAINTAIN COUNTDOWN AFTER REFRESH */
if (sessionStorage.getItem("due-date")) {
    interval = setInterval(countdown(sessionStorage.getItem("due-date")), 1000);
}

/* MAINTAIN FILE CONTENTS AFTER REFRESH */
if (sessionStorage.getItem("file-contents")) {
    output.textContent = sessionStorage.getItem("file-contents");
}

/* MAINTAIN FILE NAME AFTER REFRESH */
if (sessionStorage.getItem("uploaded-file-name")) {
    fileChosen.textContent = sessionStorage.getItem("uploaded-file-name")
}