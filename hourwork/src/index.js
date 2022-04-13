import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Mindmap} from './MindmapComponent.js';
import './style/style.css';

// Imports for Object JS classes
import {Card} from './js/Card';
import {Node} from './js/Node'
import {Graph} from './js/Graph';

// START IDs from 0
var g = new Graph();
var card1 = new Node(0, new Card("Capital", "Place in a State where the government is housed"));
var card2 = new Node(1, new Card("Capital of MA", "Boston"));
var card3 = new Node(2, new Card("Capital of RI", "Providence"));
var card4 = new Node(3, new Card("Capital of CT", "Hartford"));
var card5 = new Node(4, new Card("Capital of VT", "Burlington"));

// connects cards to the capital card
var cards = [card1, card2, card3, card4, card5];
for(var i = 0; i < 6; i++){
    g.addVertex(cards[i]);
    if(i > 0) g.addEdge(card1, cards[i]);
}

// adds a random edge from capital of MA
g.addEdge(card2, new Node(5, new Card("Population", "500")));



const App = () => {
  

  // Renders MindMap from the MindMapComponent
  function MindMap(){
    // allows for callback from MindmapComponent js file
    const [node, setNode] = useState('No Node Selected')
    
    // returns formatted React
    return (
      <div>
        <Mindmap nodes={g.getNodes()} adjacent={g.getEdges()} sendBackNode={node => setNode(node)}  />
        <h4>{node}</h4>
      </div>
    );

  }
 
  function Flashcard(){
    // React formatting
    return (
      <div>
        <h1>Flashcard</h1>
      </div>
    );
  
  }


  return (
    <div>
      <div>
        <MindMap />
      </div>
      
    </div>
  );
}


const root = createRoot(document.getElementById("root"));
root.render(<App />);


