import React, {useState} from 'react'; 
import Graph from 'react-graph-vis';

// Options for the Mindmap
const options = {
  layout: {
    hierarchical: false
  },
  edges: {
    color: "#000000"
  }
};

// Generates a Hex color for a node in the mindmap
function randomColor() {
  const red = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  const green = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  const blue = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  return `#${red}${green}${blue}`;
}

//Formats the set of nodes from a graph and reformats it for the mindmap api
function formatNodes(nodeSet) {
  
  var formatted = new Array();

  nodeSet.forEach(element => {

    var id = element.id;
    var label = element.label;
    var color = randomColor();

    formatted.push({id:id,label,color})
  });

  return formatted;
}

//Formats the map of edges from a graph and reformats it for the mindmap api
function formatEdges(adjacencyMap) {

  var formatted = new Array();
  
  var i = 0;
  adjacencyMap.forEach(element => {
    element.forEach (function(value, key) {
      var from = i;
      var to = value.id;
      formatted.push({from:from, to:to})
    })
    i++;
  });
  
  return formatted;
}



export function Mindmap(props) {

  const [state, setState] = useState({
    counter: 5,
    graph: {

      nodes: formatNodes(props.nodes) ,
      edges: formatEdges(props.adjacent),

    },

    // Interactible events
    events: {
      select: ({ nodes, edges }) => {
        // call back to main with id of the selected node
          // do this so that the id can be taken in by the flashcard view upon selection
         
        props.sendBackNode(nodes)

      }, 
    }
  })

  const { graph, events } = state;


  return (
      <div>
         <Graph graph={graph} options={options} events={events} style={{ height: "500px" }} />
      </div>
  )
}
