import {Card} from './Card';
import {Node} from './Node';
import {Graph} from './Graph';

export class MindmapObj {
    constructor() {
        /**************************************************************************
        *    Structure to store Core Data of the Application.
        *       - title: title of the dataset -> user defined
        *       - graph: stores the relationship of the data presented by the user
        *       - dateDue: stores the target date the user needs to know their
        *           study material by
        ***************************************************************************/
        this.title = "";
        this.graph = new Graph();
        this.dateDue = new Date();

        /**************************************************************************
        *    Structure to hold the deck of cards organized using weights/priority. 
        *       - deck: holds all but the top card in the deck at a given moment 
        *       - topCard: holds the card on the top of the deck
        *       - currentCard: Stores the card currently being looked at in the
        *           flashcard render
        *       - moveHistory: stores a living history of what cards the user
        *           studied. Allows for previous to work
        ***************************************************************************/
        this.deck = [];
        this.topCard = null;
        this.currentCard = null;
        this.moveHistory = []; // for previous button 
    }

    getTitle(){
        return this.title;
    }
    setTitle(title){
        this.title = title;
    }

    getDueDate(){
        return this.dateDue;
    }
    setDueDate(date){
        this.dateDue = date;
    }

    getSize(){
        return this.graph.getSize();
    }
    isEmpty(){
        return this.size == 0;
    }

    // add nodes to graph (+ remove)
    addNode(node){
        this.graph.addVertex(node);
    }
    removeNode(node){
        this.graph.removeVertex(node);
    }
    // add edges b/w nodes (+ remove)
    addEdge(parent, child){
        this.graph.addEdge(parent,child);
    }

    // Gets edges to work with MindMap API
    getEdges(){
        return this.graph.getEdges();
    }
    // gets nodes to work with Mindmap API
    getNodes(){
        return this.graph.getNodes();
    }
    // If given an ID, the card belonging to node with id of x will be returned
    getCardByNodeID(id){
        var card = new Card("card not found");
        (this.getNodes()).forEach(element => {
            if(element.id === id){
                card = element.getCard();
            }
        });
        return card;
    }

    // Generate deck from graph
    generateDeck(){
        // Clears the deck
        this.deck = this.deck.splice(0,this.deck.length);
        (this.getNodes()).forEach(element => {
            this.putInDeck(element.getCard());
        });

        this.pullTopCard(); // removes title card from the deck
        this.currentCard = this.topCard;
    }

    // Put card back in deck
    putInDeck(card){
        // var position = 0; // calc using date and weight and current size of deck
        // var leftSide = this.deck.splice(0, position);
        // var rightSide = this.deck;
        // standard deck, need to modify to make it more specialized for learning repititions
        this.deck.push(card);
        // combine left and right sides
    }

    // Deque top card from deck
    pullTopCard(){
        this.topCard = this.deck.shift();
    }
    getTopCard(){
        return this.topCard;
    }

    // Retrieves the card currently being targeted 
    getCurrentCard(){
        return this.currentCard;
    }
    // Takes in a card, and sets the current card to be the card passed in
    setCurrentCard(card){
        this.currentCard = card;
    }

    addToHistory(card){
        this.moveHistory.push(card);
        // decreases the size of the history to ensure its never larger than number of cards
        while(this.moveHistory.length > this.getSize()){
            this.moveHistory.shift();
        }
    }

    nextCard(){
        /**If the current card does not match the top card that means the user selected a card
         *  from the Mindmap. This allows the user to get that topCard back in view
         **/ 
        if(this.currentCard != this.topCard){
            this.currentCard = this.topCard;
        } else {
            // puts previous top card into history and back into the deck
            //this.moveHistory.push(this.topCard);
            this.addToHistory(this.topCard);
            this.putInDeck(this.topCard);
            // updates the currentCard and moves 
            this.pullTopCard();
            this.currentCard = this.topCard;
        }
    }

    previousCard(){
        if(this.currentCard == null || this.moveHistory.length == 0){
            return;
        } else {
            this.currentCard = this.moveHistory.pop();
        }
    }
   

}