class Node {
    constructor(id, pid, card) {
        // Graph Data 
        this.adjacents = [];

        // Data 
        this.card = card;
    }
    
    getID(){
        return this.id;
    }

    getParentID(){
        return this.parentID;
    }
    setParentID(pid){
        this.parentID = pid;
    }
    
    getAdjacents() {
        return this.adjacents;
    }
    addAdjacent(node) {
        this.adjacents.push(node);
    }
    removeAdjacent(node) {
        const index = this.adjacents.indexOf(node);
        if(index > -1) {
          this.adjacents.splice(index, 1);
          return node;
        }
    }
    isAdjacent(node) {
        return this.adjacents.indexOf(node) > -1;
    }

    
    getCard(){
        return this.card;
    }
    setCard(c){
        this.card = c;
    }

    
}
