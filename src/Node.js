class Node {
    constructor(id = 0, card = null) {
        // Data 
        this.card = card;
        
        this.id = id;
        this.label = card.getFrontText();
        this.color = this.generateColor();
    }
    
    
    getCard(){
        return this.card;
    }
    setCard(c){
        this.card = c;
    }

    getID(){
        return this.id;
    }

    getLabel(){
        return this.label;
    }

    getColor(){
        return this.color;
    }

    generateColor(){
        const red = '#AD2337';
        const green = '#34AD24';
        const blue = '#2F48AD';
        return red;
    }
    
}
