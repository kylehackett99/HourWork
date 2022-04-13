/* file upload button */
const fileUploadButton = document.getElementById('file-upload');
/* file chosen text */
const fileChosen = document.getElementById('file-chosen');
/* output text */
const output = document.getElementById('output');

fileUploadButton.addEventListener('change', function() {

    /* once a file is added, change the file chosen text to reflect the name of 
       the file uploaded */
    fileChosen.textContent = this.files[0].name;

    /* uploads the contents of the file and displays them on the page */
    var fileReader = new FileReader();
    fileReader.onload = function() {
        output.textContent=fileReader.result;
    }

    fileReader.readAsText(this.files[0]);
})