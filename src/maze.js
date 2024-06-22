
  
  // mazeUtils.js

export const generateMaze = (grid) => {
    const newGrid = [...grid]; // Create a copy of the grid
    const startRow = 1;
    const startCol = 1;
    const endRow = grid.length - 2;
    const endCol = grid[0].length - 2;
    
    // Initialize walls around the edges
    for (let row = 0; row < newGrid.length; row++) {
      for (let col = 0; col < newGrid[0].length; col++) {
        if (row === 0 || col === 0 || row === newGrid.length - 1 || col === newGrid[0].length - 1) {
          newGrid[row][col].isWall = true;
        }
      }
    }
    
    // Randomized Prim's Algorithm
    const walls = [];
    newGrid[startRow][startCol].isWall = false; // Make the starting node a passage
    addWalls(walls, newGrid, startRow, startCol);
    
    while (walls.length > 0) {
      const randomIndex = Math.floor(Math.random() * walls.length);
      const { row, col } = walls[randomIndex];
      walls.splice(randomIndex, 1);
      
      if (newGrid[row][col].isWall) {
        const neighbors = [];
        if (row > 1 && !newGrid[row - 2][col].isWall) {
          neighbors.push({ row: row - 2, col });
        }
        if (row < newGrid.length - 2 && !newGrid[row + 2][col].isWall) {
          neighbors.push({ row: row + 2, col });
        }
        if (col > 1 && !newGrid[row][col - 2].isWall) {
          neighbors.push({ row, col: col - 2 });
        }
        if (col < newGrid[0].length - 2 && !newGrid[row][col + 2].isWall) {
          neighbors.push({ row, col: col + 2 });
        }
        
        if (neighbors.length > 0) {
          const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
          const { row: neighborRow, col: neighborCol } = randomNeighbor;
          
          newGrid[row][col].isWall = false; // Make the current cell a passage
          newGrid[neighborRow][neighborCol].isWall = false; // Make the chosen neighbor a passage
          
          addWalls(walls, newGrid, row, col);
          addWalls(walls, newGrid, neighborRow, neighborCol);
        }
      }
    }
    
    return newGrid;
  };
  
  const addWalls = (walls, grid, row, col) => {
    if (row > 1 && grid[row - 2][col].isWall) {
      walls.push({ row: row - 2, col });
    }
    if (row < grid.length - 2 && grid[row + 2][col].isWall) {
      walls.push({ row: row + 2, col });
    }
    if (col > 1 && grid[row][col - 2].isWall) {
      walls.push({ row, col: col - 2 });
    }
    if (col < grid[0].length - 2 && grid[row][col + 2].isWall) {
      walls.push({ row, col: col + 2 });
    }
  };
  