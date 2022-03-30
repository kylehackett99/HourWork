class Graph {
    
    constructor() {
        this.nodes = new Map();
        this.size = 0;
    }

    addEdge(source, destination) {
        const sourceNode = this.addVertex(source);
        const destinationNode = this.addVertex(destination);
      
        sourceNode.addAdjacent(destinationNode);
        destinationNode.addAdjacent(sourceNode);
        
        return true;
    }
    removeEdge(source, destination) {
        const sourceNode = this.nodes.get(source);
        const destinationNode = this.nodes.get(destination);
      
        if(sourceNode && destinationNode) {
          sourceNode.removeAdjacent(destinationNode);
          destinationNode.removeAdjacent(sourceNode);
          
        }
      
        return true;
    }

    addVertex(card) {
        if(this.nodes.has(card)) {
          return this.nodes.get(card);
        } else {
          const vertex = new Node(card);
          this.nodes.set(card, vertex);
          return vertex;
        }
    }
    removeVertex(card) {
        const current = this.nodes.get(card);
        if(current) {
          for (const node of this.nodes.values()) {
            node.removeAdjacent(current);
          }
        }
        return this.nodes.delete(card);
    }

    
    

}
