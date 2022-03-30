class Mindmap {
    constructor(title = "", dateDue = new Date) {
       this.title = title;
       this.graph = new Graph();
       // Goal Date for End of Studies
       this.dateDue = dateDue;
       // Array of Nodes with the highest weight/priority
       this.topNodes = [];
       // Structure to hold the deck of cards organized using weights/priority
       this.deck = [];
       this.nearestDueDate = dateDue;
    }
   
    getTitle(){
        return this.title;
    }
    setTitle(title){
        this.title = title;
    }

    getSize(){
        return this.graph.getSize();
    }
    isEmpty(){
        return this.size == 0;
    }

   

}
