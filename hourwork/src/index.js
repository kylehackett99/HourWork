import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Mindmap} from './ReactComponents/MindmapComponent.js';

// Imports for Object JS classes
import {Card} from './js/Card';
import {Node} from './js/Node'
import {MindmapObj} from './js/MindmapObj';


const App = () => {

  // retrieve nestedArray and title from localStorage
  var retrievedData = localStorage.getItem("file-array");
  var nestedArray = JSON.parse(retrievedData);
  var title = localStorage.getItem("file-name");
  
  // initialize our graph
  var appController = new MindmapObj();

  // If the nested array is null -> then it wont parse the data in local storage
  if(nestedArray != null){
    // title card
    var titleCard = new Node(0, new Card(title));
    appController.setTitle(titleCard.getLabel());

    //sets dueDate for the MindMap
    appController.setDueDate(localStorage.getItem("due-date"));

    // empty array for the parent nodes
    var parents = [];
    // counter for the node id #'s
    var id_counter = 0;
    // temp variable for each child node
    var child;

    /* loop through the top layer of the nested array and fill in the parent
    * nodes */
    for (var i = 0; i < nestedArray.length; i++) {
      id_counter++;
      parents[i] = new Node(id_counter, new Card(nestedArray[i][0], nestedArray[i][1]));
    }

    /* make the titleCard the vertex, then loop through and make each parent
    * node an edge to that card */
    appController.addNode(titleCard);
    for (var i = 0; i < nestedArray.length; i++) {
      appController.addNode(parents[i]);
      appController.addEdge(titleCard, parents[i]);
    }

    /* go through the children and add them as edges to their parent nodes */
    for (var i = 0; i < nestedArray.length; i++) {
      for (var j = 2; j < nestedArray[i].length; j++) {
        id_counter++;
        child = new Node(id_counter, new Card(nestedArray[i][j][0], nestedArray[i][j][1]));
        appController.addEdge(parents[i], child);
      }
    }

    // Generates deck of cards from the Mindmap
    appController.generateDeck();
  }

  console.log(appController);

  // Handles Logic for when buttons are pressed
  function handleNext(e) {
    e.preventDefault();
    appController.nextCard();
    //console.log(appController);
    // Delete this line once Flashcard React Component is implemented
    document.getElementById('temp').innerHTML = tempCurrentCardString();
  }
  function handlePrevious(e) {
    e.preventDefault();
    appController.previousCard();
    //console.log(appController);
    // Delete this line once Flashcard React Component is implemented
    document.getElementById('temp').innerHTML = tempCurrentCardString();
  }

  
  // Delete this line once Flashcard React Component is implemented
  function tempCurrentCardString(){
    var c = appController.getCurrentCard();
    if(c == null){
      return;
    }
    return c.getFrontText();
  }



  // Renders MindMap from the MindMapComponent
  function MindMap() {
    // allows for callback from MindmapComponent js file
    const [node, setNode] = useState('No Node Selected');
    // Updates Current Card with the callback node ID
    var clickedCard = appController.getCardByNodeID(node[0]);
    if(clickedCard.getFrontText() != "card not found"){
      appController.setCurrentCard(clickedCard);
      // Delete this line once Flashcard React Component is implemented
      document.getElementById('temp').innerHTML = appController.getCurrentCard().getFrontText();
    }
    // returns formatted React Component
    return (
      <div>
        <Mindmap nodes={appController.getNodes()} adjacent={appController.getEdges()} sendBackNode={node => setNode(node)}/>
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


  // This is what gets rendered
  return (
    <div>
      <div>
        <button onClick={handlePrevious}>Prev</button>
        <Flashcard/>
        <h4 id="temp"></h4>
        <button onClick={handleNext}>Next</button> 
      </div>
      <div>
        <MindMap/>
      </div>
      
    </div>
  );
}

/**********************************************
 * Renders the Application "App" Defined Above
 **********************************************/
const root = createRoot(document.getElementById("root"));
root.render(<App />);

