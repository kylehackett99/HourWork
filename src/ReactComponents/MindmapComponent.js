import React, {useState} from 'react';
import Graph from 'react-graph-vis';

// options for the Mindmap
const options = {
  autoResize: true,
  layout: {
    hierarchical: false
  },
  edges: {
    color: "#000000"
  },
  nodes: {
    shape: "box",
    font: {
      color: "#000000",
      size: 22,
    },
  },
};

// generates a Hex color for a node in the mindmap
function randomColor() {
  const color1 = '#007BFF';
  const color2 = '#226fce';
  const color3 = '#2097eF';
  const color4 = '#5c8be3';
  const color5 = '#2fc0ff';
  const color6 = '#7b9ef3';
  const color7 = '#b2d7ff';
  const color8 = '#409cff';
  const color9 = '#4da1e2';
  const color10 = '#4db3e2';

  var choice = Math.floor(Math.random() * 10);
  switch(choice){
    case 0:
      return color1;
    case 1:
      return color2;
    case 2:
      return color3;
    case 3:
      return color4;
    case 4:
      return color5;
    case 5:
      return color6;
    case 6:
      return color7;
    case 7:
      return color8;
    case 8:
      return color9;
    case 9:
      return color10;
    default:
      return '#ecf0f4';
  }
}

// formats the set of nodes from a graph and reformats it for the mindmap api
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

// formats the map of edges from a graph and reformats it for the mindmap api
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

    // interactible events
    events: {
      select: ({ nodes, edges }) => {
        /* call back to main with ID of the selected node, do this so that
         * the ID can be taken in by the flashcard view upon selection */
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
