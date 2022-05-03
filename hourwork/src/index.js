import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Mindmap} from './ReactComponents/MindmapComponent.js';

// Imports for Object JS classNamees
import {Card} from './js/Card';
import {Node} from './js/Node'
import {MindmapObj} from './js/MindmapObj';
import './flash.css'


// Defines where the App gets rendered in the DOM
const root = createRoot(document.getElementById("root"));
// initial definition of the  application controller
var appController = new MindmapObj();

const fileChosen = document.getElementById('file-chosen');



//** Reads in data from session storage and updates the application data structure **/
function updateStructure(){
  // retrieve headNode and title from localStorage
  var headNode = JSON.parse(sessionStorage.getItem("head-node"));

  // initialize our graph
  appController = new MindmapObj();

  // If the nested array is null -> then it wont parse the data in local storage
  if (headNode != null) {
    // title card
    var titleCard = new Node(0, new Card(headNode.front));
    appController.setTitle(titleCard.getLabel());

    //sets dueDate for the MindMap
    appController.setDueDate(sessionStorage.getItem("due-date"));

    // empty array for the parent nodes
    var parents = [];
    // counter for the node id #'s
    var id_counter = 0;
    // flashcardText variable for each child node
    var child;

    /* loop through the top layer of the nested array and fill in the parent
    * nodes */
    for (var i = 0; i < headNode.children.length; i++){
      id_counter++;
      parents[i] = new Node(id_counter, 
                            new Card(headNode.children[i].front,
                                     headNode.children[i].back,  
                                     headNode.children[i].weight)); 
    }

    /* make the titleCard the vertex, then loop through and make each parent
    * node an edge to that card */
    appController.addNode(titleCard);
    for (var i = 0; i < headNode.children.length; i++) {
      appController.addNode(parents[i]);
      appController.addEdge(titleCard, parents[i]);
    }
  
    // go through the children and add them as edges to their parent nodes 
     for (var i = 0; i < headNode.children.length; i++) { 
       for (var j = 0; j < headNode.children[i].children.length; j++) {
        id_counter++;
        child = new Node(id_counter, 
                         new Card(headNode.children[i].children[j].front, 
                                  headNode.children[i].children[j].back, 
                                  headNode.children[i].children[j].weight));
        appController.addEdge(parents[i], child); 
      } 
    }  

    // Generates deck of cards from the Mindmap
    appController.generateDeck();
  }
}

function weightChanger(id, num) {
  var weight = appController.getCardWeight(id);
  var newWeight = weight + num;
  appController.setCardWeight(id,newWeight);  
  appController.store();
  const output = document.getElementById('output');
  output.textContent = appController.toText();
}

fileChosen.addEventListener("click", function(){

  let text = appController.toText();
  const currentFile = document.getElementById('file-chosen');
  var fileName = currentFile.textContent;
  const textToBLOB = new Blob([text], { type: 'text/plain' });
  let newLink = document.createElement("a");
        newLink.download = fileName;

        if (window.webkitURL != null) {
            newLink.href = window.webkitURL.createObjectURL(textToBLOB);
        }
        else {
            newLink.href = window.URL.createObjectURL(textToBLOB);
            newLink.style.display = "none";
            document.body.appendChild(newLink);
        }

        newLink.click();
})


// Function definition for when the user uploads a file
var uploadHandler = function(e) {
  root.render(<App/>);
};
// defines the listener for the file upload, and then executes the function to rerender
document.addEventListener("newFileUploaded", uploadHandler, false);

// Structures the React Parent Component
const App = () => {
  // Updates the structure with values from browser storage
  updateStructure();
  
  // Handler for Next Card Button Press
  function handleNext(e) {
    e.preventDefault();
    appController.nextCard();
    var frontString, backString;
    var c = appController.getCurrentCard();
    if(c == null){
      frontString = "";
      backString = "";
    } else {
      frontString = c.getFrontText();
      backString = c.getBackText();
    }
    document.getElementById('flashcardText').innerHTML = frontString;
    //document.getElementById('flashcardBackText').innerHTML = backString;
  }
   // Handler for Previous Card Button Press
  function handlePrevious(e) {
    e.preventDefault();
    appController.previousCard();
    var frontString, backString;
    var c = appController.getCurrentCard();
    if(c == null){
      frontString = "";
      backString = "";
    } else {
      frontString = c.getFrontText();
      backString = c.getBackText();
    }
    document.getElementById('flashcardText').innerHTML = frontString;
    //document.getElementById('flashcardBackText').innerHTML = backString;
  }

  function handleHard(e) {
    e.preventDefault();
    var c = appController.getCurrentCard();
    if(c != null){
      var currentCard = appController.getCurrentCard();
      var id = appController.getNodeByCard(currentCard).getID();
      weightChanger(id, 1 );
    }  
  }

  function handleMedium(e) {
    e.preventDefault();
    var c = appController.getCurrentCard();
    if(c != null){
      var currentCard = appController.getCurrentCard();
      var id = appController.getNodeByCard(currentCard).getID();
      weightChanger(id, .5 );
    }  
  }
  function handleEasy(e) {
    e.preventDefault();
    var c = appController.getCurrentCard();
    if(c != null) {
      var currentCard = appController.getCurrentCard();
      var weight = currentCard.getWeight();
      if (weight > 0) { /// assuming we dont wont negative weights
        if (weight == .5) { //catching half weights 
          var id = appController.getNodeByCard(currentCard).getID();
          weightChanger(id, - .5);
        }  
        else {
          var id = appController.getNodeByCard(currentCard).getID();
          weightChanger(id, - 1);
        }
      }
    }
  }




  // Flips flashcard
  function flipCard(e) {
    e.preventDefault();
    var currCard = appController.getCurrentCard();
    var currText = document.getElementById('flashcardText').innerHTML;

    if (currText == currCard.getFrontText()) {
      document.getElementById('flashcardText').innerHTML = appController.getCurrentCard().getBackText();
    } else if (currText == currCard.getBackText()) {
      document.getElementById('flashcardText').innerHTML = appController.getCurrentCard().getFrontText();
    }
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
      document.getElementById('flashcardText').innerHTML = appController.getCurrentCard().getFrontText();
      //document.getElementById('flashcardBackText').innerHTML = appController.getCurrentCard().getBackText();
    }

    // returns formatted React Component
    return (
      <div>
        <Mindmap nodes={appController.getNodes()} adjacent={appController.getEdges()} sendBackNode={node => setNode(node)}/>
      </div>
    );
  }
 
  function Flashcard(){

    // FOR FLIP ANIMATION
     /* const [flip, setFlip] = useState(false)
    return (
      <div  className={`card ${flip ? 'flip' : ''}`} onClick={() => setFlip(!flip)}>
          <div className="front" id="flashcardText"> </div>
          <div className="back" id="flashcardBackText"></div>
      </div>
  );  */
    return (
      <div>
        <div id="flashcardText" className="u-align-center u-text-2" onClick={flipCard}>Start of "{appController.getTitle()}" Deck</div>
      </div>
    );


    }


  // This is what gets rendered
  return (
    <div>
      <div className="u-clearfix u-expanded-width u-layout-wrap u-layout-wrap-2">
          <div className="u-layout">
            <div className="u-layout-row">

      {/** LEFT SIDE **/ }
            {/** JSX for the Flashcard view **/}
              <div className="u-container-style u-layout-cell u-shape-rectangle u-size-30 u-layout-cell-2">
                <div className="u-border-1 u-border-custom-color-1 u-border-no-bottom u-border-no-left u-border-no-top u-container-layout u-container-layout-3">
                  <div className="u-border-1 u-border-custom-color-1 u-container-style u-group u-radius-5 u-shape-round u-group-2">
                    {/**  change this ^^^ to below to remove original flashcard field **/ }
                  {/* <div className="u-container-style u-group u-radius-5 u-shape-round u-group-2"> */}
                    <div className="u-container-layout u-container-layout-4">
                      <Flashcard/>
                    </div>
                  </div>

                  {/** Previous Button **/ }
                  <div className="u-shape u-shape-svg u-text-custom-color-3 u-shape-1">
                    <button id="next-button" className="u-svg-link" onClick={handleNext} style={{background: "transparent", border: "none", cursor: "pointer" }}>
                      <svg className="u-svg-link" preserveAspectRatio="none" viewBox="0 0 160 100" ><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#svg-8406"></use></svg>
                      <svg className="u-svg-content" viewBox="0 0 160 100" x="0px" y="0px" id="svg-8406" ><g><path d="M109.2,99.9L160,50L109.2,0H75.6l38.7,38H0v24.2h114L75.6,100L109.2,99.9z"></path></g></svg>
                    </button>
                  </div>

                  {/** Next Button **/ }
                  <div className="u-flip-horizontal u-shape u-shape-svg u-text-custom-color-3 u-shape-2">
                    <button id="prev-button" className="u-svg-link" onClick={handlePrevious} style={{background: "transparent", border: "none", cursor: "pointer" }}>
                      <svg className="u-svg-link" preserveAspectRatio="none" viewBox="0 0 160 100" ><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#svg-a94c"></use></svg>
                      <svg className="u-svg-content" viewBox="0 0 160 100" x="0px" y="0px" id="svg-a94c" ><g><path d="M109.2,99.9L160,50L109.2,0H75.6l38.7,38H0v24.2h114L75.6,100L109.2,99.9z"></path></g></svg>
                    </button>
                  </div>

                  {/** easy, medium, and hard buttons **/}
                  <div className="u-container-layout u-container-layout-6">
                    <button id="easy-button" className="u-border-none u-btn u-btn-round u-button-style u-custom-color-3 u-custom-font u-hover-custom-color-2 u-radius-50 u-btn-2"
                     onClick={handleEasy}>
                      easy
                    </button>
                    <button id="medium-button" className="u-border-none u-btn u-btn-round u-button-style u-custom-color-3 u-custom-font u-hover-custom-color-2 u-radius-50 u-btn-2"
                    onClick={handleMedium}>
                      medium
                    </button>
                    <button id="hard-button" className="u-border-none u-btn u-btn-round u-button-style u-custom-color-3 u-custom-font u-hover-custom-color-2 u-radius-50 u-btn-2"
                    onClick={handleHard}>
                      hard
                    </button>
                  </div>

                </div>
              </div>

      {/** RIGHT SIDE **/ }
            {/** JSX for the Mindmap view **/}
              <div className="u-container-style u-layout-cell u-size-30 u-layout-cell-3">
                <div className="u-container-layout u-container-layout-5">
                  <div>
                    <MindMap/>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
    </div>
  );
}

// In Charge of Initial Render
root.render(<App/>);