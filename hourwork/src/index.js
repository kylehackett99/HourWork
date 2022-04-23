import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Mindmap} from './ReactComponents/MindmapComponent.js';

// Imports for Object JS classNamees
import {Card} from './js/Card';
import {Node} from './js/Node'
import {MindmapObj} from './js/MindmapObj';


const App = () => {

  // retrieve nestedArray and title from localStorage
  var retrievedData = sessionStorage.getItem("file-array");
  var nestedArray = JSON.parse(retrievedData);
  var title = sessionStorage.getItem("file-name");
  
  // initialize our graph
  var appController = new MindmapObj();

  // If the nested array is null -> then it wont parse the data in local storage
  if (nestedArray != null) {
    // title card
    var titleCard = new Node(0, new Card(title));
    appController.setTitle(titleCard.getLabel());

    //sets dueDate for the MindMap
    appController.setDueDate(localStorage.getItem("due-date"));

    // empty array for the parent nodes
    var parents = [];
    // counter for the node id #'s
    var id_counter = 0;
    // flashcardText variable for each child node
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

  // Handles Logic for when buttons are pressed
  function handleNext(e) {
    e.preventDefault();
    appController.nextCard();
    document.getElementById('flashcardText').innerHTML = flashcardTextCurrentCardString();
  }
  function handlePrevious(e) {
    e.preventDefault();
    appController.previousCard();
    document.getElementById('flashcardText').innerHTML = flashcardTextCurrentCardString();
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


  function flashcardTextCurrentCardString(){
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
      document.getElementById('flashcardText').innerHTML = appController.getCurrentCard().getFrontText();
    }

    // returns formatted React Component
    return (
      <div>
        <Mindmap nodes={appController.getNodes()} adjacent={appController.getEdges()} sendBackNode={node => setNode(node)}/>
      </div>
    );
  }
 
  function Flashcard(){
    return (
      <div>
        <div id="flashcardText" className="u-align-center u-text-2" onClick={flipCard}></div>
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
                    <div className="u-container-layout u-container-layout-4">
                      <Flashcard/>
                    </div>
                  </div>

                  {/** Previous Button **/ }
                  <div className="u-shape u-shape-svg u-text-custom-color-3 u-shape-1">
                    <button id="next-button" className="u-svg-link" onClick={handleNext} style={{background: "transparent", border: "none" }}>
                      <svg className="u-svg-link" preserveAspectRatio="none" viewBox="0 0 160 100" ><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#svg-8406"></use></svg>
                      <svg className="u-svg-content" viewBox="0 0 160 100" x="0px" y="0px" id="svg-8406" ><g><path d="M109.2,99.9L160,50L109.2,0H75.6l38.7,38H0v24.2h114L75.6,100L109.2,99.9z"></path></g></svg>
                    </button>
                  </div>

                  {/** Next Button **/ }
                  <div className="u-flip-horizontal u-shape u-shape-svg u-text-custom-color-3 u-shape-2">
                    <button id="previous-button" className="u-svg-link" onClick={handlePrevious} style={{background: "transparent", border: "none" }}>
                      <svg className="u-svg-link" preserveAspectRatio="none" viewBox="0 0 160 100" ><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#svg-a94c"></use></svg>
                      <svg className="u-svg-content" viewBox="0 0 160 100" x="0px" y="0px" id="svg-a94c" ><g><path d="M109.2,99.9L160,50L109.2,0H75.6l38.7,38H0v24.2h114L75.6,100L109.2,99.9z"></path></g></svg>
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

/**********************************************
 * Renders the Application "App" Defined Above
 **********************************************/
const root = createRoot(document.getElementById("root"));
root.render(<App />);

