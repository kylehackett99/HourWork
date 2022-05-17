export class Node {
    constructor(id = 0, card = null) {
        // data
        this.card = card;
        this.id = id;
        this.label = "";
        if(card != null){
            this.label = card.getFrontText();
        }
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

    printNode(){
        this.card.logger();
    }
    toJSON(){
        return {
            card: this.card,
            id: this.id,
            label: this.label
        }
    }
}
