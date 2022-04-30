import {Card} from './Card';
import {Node} from './Node';
import {Graph} from './Graph';
import _ from 'lodash';

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
        this.worstFive = [];
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

    getGraph(){
        return this.graph;
    }

    setGraph(graph){
        this.graph = graph;
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
    // add edges b/w nodes (+ remove)
    removeEdge(parent, child){
        this.graph.removeEdge(parent,child);
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

    setCardWeight(id,weight){
        var card = new Card("card not found");
        (this.getNodes()).forEach(element => {
            if(element.id === id){
                card = element.getCard();
                card.setWeight(weight);
            }
        });
    }
    getCardWeight(id){
        var card = new Card("card not found");
        var weight = 0;
        (this.getNodes()).forEach(element => {
            if(element.id === id){
                card = element.getCard();
                weight = card.getWeight();
            }
        });
        return weight;
    }


    getNodeByCard(card){
        var node = new Node();
        (this.getNodes()).forEach(element => {
            if(_.isEqual(card,element.getCard())){
                node = element;
            }
        });
        return node;
    }

    printCard(id){
        var card = new Card("card not found");
        (this.getNodes()).forEach(element => {
            if(element.id === id){
                card = element.getCard();
                card.logger();
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
        var arr = this.deck; // makes copy of the deck

        /** 
         * Calculates the position where the card should be placed 
         *  Integral for creating randomness as well as repetition
         *  based on a card's difficulty
        **/ 
        var position = this.calcPosition(card.getWeight());

        // Slices deck into halves based on the calculated position
        var leftSide = arr.slice(0, position);
        var rightSide = arr.slice(position, arr.length);
        
        // appends card to the left side
        leftSide.push(card);

        // combines modified left side and the rightside
        this.deck = leftSide.concat(rightSide);
    }
    calcPosition(weight){
        const maxPos = this.deck.length;
        
        weight /= maxPos;

        // If the user has never gotten it wrong, add it to the end of the deck 
        if(weight == 0 || maxPos == 0) return maxPos;

        // Calculates number of days until dueDate
        const timeToDate = new Date(this.dateDue) - new Date();
        const numDaysRemaining = Math.ceil(timeToDate / (1000 * 60 * 60 * 24)); 
        
        // Determines the multiplier rate based on the date
        var multiplier;
        if(numDaysRemaining >= 365){        // 1 Year
            multiplier = 1;
        } else if(numDaysRemaining >= 180){ // ~ 6 months
            multiplier = 1.2;
        } else if(numDaysRemaining >= 90){  // ~ 3 months
            multiplier = 1.4
        } else if(numDaysRemaining >= 30){  // ~ 1 month
            multiplier = 1.8;
        } else if(numDaysRemaining >= 14){  // 2 weeks
            multiplier = 2;
        } else if(numDaysRemaining >= 7){   // 1 week
            multiplier = 2.2;
        } else if(numDaysRemaining >= 3){   //  3 Days
            multiplier = 2.6;
        } else if(numDaysRemaining >= 1){   //  1 Days
            multiplier = 3;
        } else if(numDaysRemaining >= 0){   //  0 Days
            multiplier = 4;
        } else {                            // Deadline has Passed
            multiplier = 1;
        }

        // determines the importance of the card due to difficulty and due date
        var importance = weight * multiplier;

        // Constraints for placement
        const firstQuarter = Math.floor((maxPos / 4));
        const firstThird = Math.floor((maxPos / 3));
        const firstHalf = Math.floor((maxPos / 2));
        const firstThreeQuarters = Math.floor((maxPos * (3/4)));

        /**  
         * Calculates random position within a constraint depending on the
         *  card's importance
         **/
        var position;
        if(importance > maxPos){
            position = (Math.random() * firstQuarter) + 1;
        } else if(importance > maxPos / firstThreeQuarters){
            position = Math.random() * (firstThird - firstQuarter) + firstQuarter;
        } else if(importance > maxPos / firstHalf){
            position = Math.random() * (firstHalf - firstThird) + firstThird;
        } else if(importance > maxPos / firstThird){
            position = Math.random() * (firstThreeQuarters - firstHalf) + firstHalf;
        } else {
            position = Math.random() * (maxPos - firstThreeQuarters) + firstThreeQuarters;
        } 
        
        // Returns the ceiling + ensures the position given is not out of bounds
        return Math.min(Math.ceil(position), maxPos);
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

    getWorstFive(){
        return this.worstFive;
    }
    generateWorstFive(){
        // Gets all cards in the graph
        (this.getNodes()).forEach(element => {
            this.worstFive.push(element.getCard());
        });

        // Sorts array according to weight
        this.worstFive.sort(function (first, second) {
            if(first.getWeight() > second.getWeight()) {
               return -1;
            }
            if(first.getWeight() < second.getWeight()) {
               return 1;
            }
            return 0;
        });

        // Only keeps worst 5 cards according to their weight
        this.worstFive = this.worstFive.slice(0, 4);
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

    logDeck(){
        var card = new Card("card not found");
        (this.getNodes()).forEach(element => {
            card = element.getCard();
            card.logger();
        });
    }
    
    printGraph(){
        var adj_list_map = this.graph.getAdjacentListAsMap();
        for (let [key, value] of adj_list_map) {
            console.log(key,value);
            //key.printNode();
        }
    }


    
    store(){

        var adjacentArray = this.graph.getAdjacentArray();
        var nodes = Array.from(this.graph.getNodes());

        console.log(adjacentArray);
        //console.log("-------------");

    
        var headNode = {
            front: nodes[0].getCard().getFrontText(), 
            back:  "", 
            children: [], 
            weight: 0 
        };

        for (var i = 1; i < adjacentArray.length; i++) { 
            //Parent Nodes
            if (adjacentArray[0].adj.includes(i)) {
                headNode.children.push({ front: nodes[i].getCard().getFrontText(), 
                                         back: nodes[i].getCard().getBackText(), 
                                         children: [], 
                                         weight: nodes[i].getCard().getWeight()})
            }  
            // Child Nodes
            else{    
                adjacentArray.forEach( n => {
                    if ( n.adj.includes(i)){
                         //console.log(n.id + "->" + i);
                         headNode.children[n.id - 1].children.push({ 
                             front: nodes[i].getCard().getFrontText(), 
                              back: nodes[i].getCard().getBackText(), 
                              children: [], 
                              weight: nodes[i].getCard().getWeight()}) 
                    } //end else                    
                })  // end forEach         
            } 
        } 
        //console.log(headNode);
        sessionStorage.setItem("head-node", JSON.stringify(headNode));  
    }
}