/* file upload button */
const fileUploadButton = document.getElementById('file-upload');
/* file chosen text */
const fileChosen = document.getElementById('file-chosen');
/* output text */
const output = document.getElementById('output');

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
    var nestedArray = new Array();

    var headers = 0;
    var nest = 0;
    var currHeader;

    /* uploads the contents of the file and displays them on the page */
    fileReader.onload = function() {
        output.textContent=this.result;
        sessionStorage.setItem("file-contents", this.result);

        /* read input line by line */
        var lines = this.result.split('\n');

        /* title and due date -- title will be at the center of the mindmap */
        title = lines[0];
        dueDate = lines[1];

        for (var line = 2; line < lines.length-1; line++) {
            /* Gets the leading heading
             * Relies on: empty line before, no tabs at index & index+1 */
            if (lines[line-1] === "" && lines[line].indexOf('\t')==-1 &&
                    lines[line+1].indexOf('\t')==-1) {
                currHeader = lines[line];
                nestedArray[headers] = new Array (currHeader, lines[line+1]);
                headers++;
                nest = 2;
            /* Checks for nested values
             * Relies on: empty line before & \t at the beginning of the line */
            } else if (lines[line-1] == "" && lines[line].indexOf('\t')!=-1) {
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
                    /* remove tab from beginning of line prior to inserting
                     * a node and it's child into the array */
                    lines[line] = lines[line].replace("\t", "");
                    lines[line+1] = lines[line+1].replace("\t", "");
                    nestedArray[headers-1][nest] =
                        new Array (lines[line], lines[line+1]);
                    nest++;
                }
            }
        }
        // console.log(nestedArray); <-- used for testing

        // add title, dueDate, and nestedArray to localStorage
        sessionStorage.setItem("file-name", title);
        sessionStorage.setItem("due-date", dueDate);
        sessionStorage.setItem("file-array", JSON.stringify(nestedArray));
    }
    fileReader.readAsText(file);
})

// maintains file on screen after refresh
if (sessionStorage.getItem("file-contents") != null) {
    output.textContent = sessionStorage.getItem("file-contents");
}

// maintains file name on screen after refresh
if (sessionStorage.getItem("uploaded-file-name") != null) {
    fileChosen.textContent = sessionStorage.getItem("uploaded-file-name")
}