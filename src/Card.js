class Card {
    constructor(frontText = "", backText = "", weight = 0, dueDate = new Date) {
        this.frontText = frontText;
        this.backText = backText;

        this.weight = this.weight;
        this.dueDate = dueDate;
        this.nextStudyDate = this.calcNextStudyDate();

    }
    getFrontText() {
        return this.frontText;
    }
    setFrontText(str) {
        this.frontText = str;
    }
    getBackText() {
        return this.backText;
    }
    setBackText(str) {
        this.backText = str;
    }

    getWeight(){
        return this.weight;
    }
    setWeight(w){
        this.weight = w;
    }

    getNextStudyDate(){
        return this.nextStudyDate;
    }
    setNextStudyDate(){
        this.nextStudyDate = this.calcNextStudyDate();
    }
    calcNextStudyDate(){
        // calculate next study date based on dueDate and weight
        const [month, day, year] = 
            [this.dueDate.getMonth(), this.dueDate.getDate(), this.dueDate.getFullYear()];

        return new Date();
    }


    
    toString() {
        console.log(this.frontText + '\n' + this.backText);
        return this.frontText + '\n' + this.backText;
    }

}
