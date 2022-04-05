var g = new Graph();


var card1 = new Node(0, new Card("Capital", "Place in a State where the government is housed"));
var card2 = new Node(1, new Card("Capital of MA", "Boston"));
var card3 = new Node(2, new Card("Capital of RI", "Providence"));
var card4 = new Node(3, new Card("Capital of CT", "Hartford"));
var card5 = new Node(4, new Card("Capital of VT", "Burlington"));

var cards = [card1, card2, card3, card4, card5];


for(var i = 0; i < 6; i++){
    g.addVertex(cards[i]);
    if(i > 0) g.addEdge(card1, cards[i]);
}