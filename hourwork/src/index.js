import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Mindmap} from './MindmapComponent.js';

// Imports for Object JS classes
import {Card} from './js/Card';
import {Node} from './js/Node'
import {Graph} from './js/Graph';

const App = () => {

  // retrieve nestedArray and title from localStorage
  var retrievedData = localStorage.getItem("file-array");
  var nestedArray = JSON.parse(retrievedData);
  var title = localStorage.getItem("file-name");

  // initialize our graph
  var graph = new Graph();

  // Renders MindMap from the MindMapComponent
  function MindMap() {

    // title card
    var titleCard = new Node(0, new Card(title));
    // empty array for the parent nodes
    var parents = [];

    /* loop through the top layer of the nested array and fill in the parent
     * nodes */
    for (var i = 0; i < nestedArray.length; i++) {
      parents[i] = new Node(i+1, new Card(nestedArray[i][0], nestedArray[i][1]));
    }

    /* make the titleCard the vertex, then loop through and make each parent
     * node an edge to that card */
    graph.addVertex(titleCard);
    for (var i = 0; i < nestedArray.length; i++) {
      graph.addVertex(parents[i]);
      graph.addEdge(titleCard, parents[i]);
    }

    // allows for callback from MindmapComponent js file
    const [node, setNode] = useState('No Node Selected');

    // returns formatted React
    return (
      <div>
        <Mindmap nodes={graph.getNodes()} adjacent={graph.getEdges()} sendBackNode={node => setNode(node)}/>
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
