
export class Graph {
  
  constructor(){
    this.vertices = new Set();
    this.adjacentList = new Map();
    this.size = 0;
  }

  getSize(){
    return this.size;
  }
    
  // Returns Array of All verticies in Graph
  getVertices() {
    return Array.from(this.vertices)
  }
    
  // Returns adjacency list of all verticies
  getAdjacentList() {
    var list = [];
      
    this.adjacentList.forEach((value, key) => {
      list[key] = Array.from(value)
    })
    return list;
  }
   /*Returns adjacencies as array represented as 
      adjacency objects ({ id:, adj[] }) */
  getAdjacentArray(){
    // get all the vertices
    var get_keys = this.adjacentList.keys();
    var adjacentArray = [];
    // iterate over the vertices
    var i_num = 0;
    for (var i of get_keys) {
        // get the corresponding adjacency list
        // for the vertex
        var get_values = this.adjacentList.get(i);
        // iterate over the adjacency list
        // push the values 
        adjacentArray.push({id: i.getID(), adj:[] });
        var j_num = 0;
        for (var j of get_values) {
            adjacentArray[i_num].adj.push(j.getID());
            j_num++;
        }
        i_num++;
    }
    //console.log(adjacentArray);
    return adjacentArray;
  }
  // returns Map representation of adjacency list
  getAdjacentListAsMap(){
    return this.adjacentList;
  }
  // Gets edges to work with MindMap API
  getEdges(){
    return this.adjacentList;
  }
  // gets nodes to work with Mindmap API
  getNodes(){
    return this.vertices;
  }
  // Adds a vertex to the graph
  addVertex(vertex = null) {
    if( !this.vertices.has(vertex) && vertex !== null && vertex !== undefined) {
      this.vertices.add(vertex);
      this.adjacentList.set(vertex, new Set());
      this.size++;
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
      this.size--;
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
          //this.adjacentList.get(vertex2).add(vertex1);
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
          //this.adjacentList.get(vertex2).delete(vertex1);
          return true;
        }
    return false;
  }
  toJSON() {
    return {
      vertices: [...this.vertices],
      adjacentList: [...this.adjacentList.entries()],
      size: this.size
    }
  }
}

