class Graph {
  
  constructor(){
    this.vertices = new Set();
    this.adjacentList = new Map();
  }
    
  // Returns Array of All verticies in Graph
  getVertices() {
    return Array.from(this.vertices)
  }
    
  // Returns adjacency list of all verticies

  // FIX -> To work with The Node objects and their ids
  getAdjacentList() {
    const list = {};
      
    this.adjacentList.forEach((value, key) => {
      list[key] = Array.from(value)
    })
      
    return list;
  }

  // Adds a vertex to the graph
  addVertex(vertex = null) {
    if( !this.vertices.has(vertex) && vertex !== null && vertex !== undefined) {
      this.vertices.add(vertex);
      this.adjacentList.set(vertex, new Set());
      return true;
    }
    return false;
  }
  // Removes a vertex from the graph
  removeVertex(vertex = null){
    if( this.vertices.has(vertex) && vertex !== null && vertex !== undefined) {
      this.vertices.delete(vertex);
      this.adjacentList.delete(vertex);
      // Looks through adjacency list and removes the deleted vertex from all nodes
      this.adjacentList.forEach((value, key) => { 
        if(value.has(vertex)){
          value.delete(vertex);
        }
      });
      return true;    
    }
    return false;
  }


  // Adds an edge between two verticies, and creates them if they do not already exist
  addEdge(vertex1 = null, vertex2 = null) {
    if( vertex1 !== null && vertex1 !== undefined &&
        vertex2 !== null && vertex2 !== undefined && 
        vertex1 != vertex2
      ) {
          this.addVertex(vertex1);
          this.addVertex(vertex2);

          this.adjacentList.get(vertex1).add(vertex2);
          this.adjacentList.get(vertex2).add(vertex1);
          return true;
        }
    return false;
  }
  // Removes an edge between two verticies -- must remove verticies separately
  removeEdge(vertex1 = null, vertex2 = null) {
    if( vertex1 !== null && vertex1 !== undefined &&
        vertex2 !== null && vertex2 !== undefined && 
        vertex1 != vertex2
      ) {
          this.adjacentList.get(vertex1).delete(vertex2);
          this.adjacentList.get(vertex2).delete(vertex1);
          return true;
        }
    return false;
  }

  

    


}