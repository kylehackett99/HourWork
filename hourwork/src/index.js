import React, {useState} from 'react'; 
import {createRoot} from 'react-dom/client';
import Graph from 'react-graph-vis';
import './style/style.css';

const g = {
    nodes: [
      { id: 1, label: "Node 1", title: "node 1 tootip text" },
      { id: 2, label: "Node 2", title: "node 2 tootip text" },
      { id: 3, label: "Node 3", title: "node 3 tootip text" },
      { id: 4, label: "Node 4", title: "node 4 tootip text" },
      { id: 5, label: "Node 5", title: "node 5 tootip text" }
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 }
    ]
  };
  
  
  
  function App() {
    const graph = g;
  
    const options = {
      layout: {
        hierarchical: false
      },
      edges: {
        color: "#000000"
      },
      height: "500px"
    };
  
    const events = {
      select: function(event) {
        var { nodes, edges } = event;
        console.log(" on click listener " + nodes);
      }
    };
  
  
    return (
      <Graph
        graph={graph}
        options={options}
        events={events}
      />
    );
  }
  
  
  const root = createRoot(document.getElementById("root"));
  root.render(<App/>);