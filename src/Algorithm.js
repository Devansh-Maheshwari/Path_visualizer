//dijkstra
export const dijkstra=(grid,startNode,endNode)=>{
    // if (!startNode || !endNode) {
    //     console.error('Start or end node is undefined.');
    //     return;}
    const visitedNodesInOrder=[];
    startNode.distance=0;
    const unvisitedNodes=getAllNodess(grid);
        while (!!unvisitedNodes.length) {
            sortNodesByDistance(unvisitedNodes);
            const closestNode = unvisitedNodes.shift();
        
            if (closestNode.isWall) continue;
            if (closestNode.distance === Infinity) return visitedNodesInOrder;
        
            closestNode.isVisited = true;
            visitedNodesInOrder.push(closestNode);
        
            if (closestNode === endNode) return visitedNodesInOrder;
            updateUnvisitedNeighbors(closestNode, grid);
          }
          return visitedNodesInOrder;
}

const getAllNodess=(grid)=>{
    const nodes=[];
    for(const row of grid){
        for (const node of row){
            nodes.push(node);
        }
    }
    return nodes;
}
const sortNodesByDistance=(unvisitedNodes)=>{
    unvisitedNodes.sort((nodeA,nodeB)=>nodeA.distance-nodeB.distance);
}

const updateUnvisitedNeighbors=(node,grid)=>{
    const unvisitedNeighbors=getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
      } 
}
const getUnvisitedNeighbors=(node,grid)=>{
    const neighbors = [];
    const { row, col } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

//a* algorithm
export const astar = (grid, startNode, endNode) => {
    console.log(grid);
    
    const openSet = [];
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    startNode.totalDistance = heuristic(startNode, endNode);
    openSet.push(startNode);
  
    while (!!openSet.length) {
      sortNodesByTotalDistance(openSet);
      const currentNode = openSet.shift();
  
      if (currentNode.isWall) continue;
      if (currentNode.distance === Infinity) return visitedNodesInOrder;
  
      currentNode.isVisited = true;
      visitedNodesInOrder.push(currentNode);
  
      if (currentNode === endNode) return visitedNodesInOrder;
      updateUnvisitedNeighborsAstar(currentNode, grid, endNode, openSet);
    }
    return visitedNodesInOrder;
  };
  
  const updateUnvisitedNeighborsAstar = (node, grid, endNode, openSet) => {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      const tentativeDistance = node.distance + 1;
      if (tentativeDistance < neighbor.distance) {
        neighbor.distance = tentativeDistance;
        neighbor.totalDistance = tentativeDistance + heuristic(neighbor, endNode);
        neighbor.previousNode = node;
        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }
  };
  
const heuristic = (node, endNode) => {
    return Math.abs(node.row - endNode.row) + Math.abs(node.col - endNode.col);
  };
  
  const sortNodesByTotalDistance = (unvisitedNodes) => {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.totalDistance - nodeB.totalDistance);
  };
//bfs algo
export const bfs=(grid,startNode,endNode)=>{
    const queue=[startNode];
    const visitedNodesInOrder=[]
    startNode.isVisited=true;
    while(queue.length){
        const currentNode=queue.shift();
        visitedNodesInOrder.push(currentNode);
        if(currentNode===endNode)return visitedNodesInOrder;
        const unvisitedNeighbors=getUnvisitedNeighbors(currentNode,grid);
        for (const neighbor of unvisitedNeighbors) {
            if (!neighbor.isWall && !neighbor.isVisited) {
              neighbor.isVisited = true;
              neighbor.previousNode = currentNode;
              queue.push(neighbor);
            }
          }
    }
    return visitedNodesInOrder;
}
// dfs algo
export const dfs=(grid,startNode,endNode)=>{
    const stack=[startNode];
    const visitedNodesInOrder=[]
    startNode.isVisited=true;
    while(stack.length){
        const currentNode=stack.pop();
        visitedNodesInOrder.push(currentNode);
        if(currentNode===endNode)return visitedNodesInOrder;
        const unvisitedNeighbors=getUnvisitedNeighbors(currentNode,grid);
        for (const neighbor of unvisitedNeighbors) {
            if (!neighbor.isWall && !neighbor.isVisited) {
              neighbor.isVisited = true;
              neighbor.previousNode = currentNode;
              stack.push(neighbor);
            }
          }
    }
    return visitedNodesInOrder;
}

