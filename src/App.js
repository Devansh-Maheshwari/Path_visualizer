import React, { useState ,useEffect} from 'react';
import { dijkstra, bfs, dfs, astar } from './Algorithm';

import  Grid  from './Grid';




const createNode=(row,col)=>{
  return {
    row,
    col,
    isStart:false,
    isEnd:false,
    isWall:false,
    distance:Infinity,
    totalDistance:Infinity,
    previousNode:null,
    isVisited:false,
  }
}
const createGrid=(rows,cols)=>{
  const grid=[];
  for(let row=0;row<rows;row++){
    const currentRow=[];
    for(let col=0;col<cols;col++){
      currentRow.push(createNode(row,col));
    }
    grid.push(currentRow);
  }
  return grid;
}
function App() {
  const [grid,setGrid]=useState(createGrid(20,50));
  const [isStartSelected,setIsStartSelected]=useState(false);
  const [isEndSelected,setIsEndSelected]=useState(false);
  const [algorithm,setAlgorithm]=useState("dijkstra");
  const [speed,setSpeed]=useState(10);
  const [shortestPathLength,setShortestPathLength]=useState(0);
  const[nodesVisited,setNodesVisited]=useState(0);
  
  const resetGrid = (preserveStartEnd = false) => {
    const newGrid = grid.map(row =>
      row.map(node => ({
        ...node,
        distance: Infinity,
        totalDistance: Infinity,
        previousNode: null,
        isStart: preserveStartEnd ? node.isStart : false,
        isEnd: preserveStartEnd ? node.isEnd : false,
        isWall:  preserveStartEnd ? node.isWall : false,
        isVisited:false,
      }))
    );
    return newGrid;
  };
  const handleNodeClick=(row,col)=>{
    const newGrid=grid.slice();
    const node = newGrid[row][col]; 
    console.log(row,col);
    if (!isStartSelected && !isEndSelected) {
      // Mark as start node
      node.isStart = true;
      setIsStartSelected(true);
    } else if (isStartSelected && !isEndSelected) {
      // Mark as end node
      node.isEnd = true;
      setIsEndSelected(true);
    } else {
      // Toggle wall state if neither start nor end node
      node.isWall = !node.isWall;
    }
    
    setGrid(newGrid);
    // console.log("line 72",grid);
  }
  useEffect(() => {
    // Reset grid when algorithm changes
    const newGrid = resetGrid(grid);
    setGrid(newGrid);
    setShortestPathLength(0);
    setNodesVisited(0);
   
    
    const element = document.getElementsByClassName('node-visited');
    console.log(element);
    Array.from(element).forEach(node => {
      node.classList.remove('node-visited');})
      const elements = document.getElementsByClassName('node-shortest-path');
      console.log(elements);
    Array.from(elements).forEach(node => {
      node.classList.remove('node-shortest-path');
    });
   
  }, [algorithm])

 
  const visualizeAlgorithm=()=>{
    const startNode=grid.flat().find(node=>node.isStart);
    const endNode=grid.flat().find(node=>node.isEnd);
    let visitedNodesInOrder;
    switch (algorithm) {
      case 'dijkstra':
        visitedNodesInOrder = dijkstra(grid, startNode, endNode);
        break;
      case 'bfs':
        visitedNodesInOrder = bfs(grid, startNode, endNode);
        break;
      case 'dfs':
        visitedNodesInOrder = dfs(grid, startNode, endNode);
        break;
      case 'astar':
        visitedNodesInOrder = astar(grid, startNode, endNode);
        break;
      default:
        return;
    }
    setNodesVisited(visitedNodesInOrder.length);
    animateAlgorithm(visitedNodesInOrder, startNode, endNode);
  }
  const animateAlgorithm=(nodeInOrder,startNode,endNode)=>{
    for(let i=0;i<nodeInOrder.length;i++){
      setTimeout(()=>{
        const node=nodeInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).classList.add('node-visited');
      },speed*i);
    }
    setTimeout(() => {
      const shortestPathNodes=getNodesInShortestPathOrder(endNode);
      setShortestPathLength(shortestPathNodes.length);
      animateShortestPath(shortestPathNodes);
    }, speed*nodeInOrder.length);
  }
  const animateShortestPath=(nodesInShortestPathOrder)=>{
    for(let i=0;i<nodesInShortestPathOrder.length;i++){
      setTimeout(()=>{
        const node=nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).classList.add('node-shortest-path')
      },50*i);
    }
  };
  const getNodesInShortestPathOrder=(endNode)=>{
  const nodesInShortestPathOrder=[];
  let currentNode=endNode;
  while(currentNode!==null){
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode=currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
  }
  return (
    <div className='App'>
          <h1>Path Visualiser</h1>
          <div className='controls'>
            <select value={algorithm} onChange={(e)=>setAlgorithm(e.target.value)}>
              <option value="dijkstra">Dijkstra</option>
              <option value="astar">A*</option>
              <option value="bfs">BFS</option>
              <option value="dfs">DFS</option>
            </select>
            <button onClick={visualizeAlgorithm}>Visulalize {algorithm}</button>
            <label>
              speed:
              <input type="range" min="1" max="100" value={speed} onChange={(e)=>{setSpeed(Number(e.target.value))}}></input>
            </label>
            <div>Nodes visited: {nodesVisited}</div>
            <div>shortest Path Length:{shortestPathLength}</div>
          </div>
          <Grid grid={grid} onNodeClick={handleNodeClick}></Grid>
    </div>
  );
}

export default App;
