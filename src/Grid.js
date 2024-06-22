import React from 'react'
import Node from './Node';
import './node.css'
const Grid = ({grid,onNodeClick}) => {

  return (
    <div className='grid'>
        {grid.map((row,rowIndex)=>(
            <div key={rowIndex} className='row'>
            {row.map((node,nodeIndex)=>(
                <Node key={nodeIndex} node={node} onNodeClick={onNodeClick}> </Node>
            ))}
            </div>
        ))}
    </div>
  )
}
export default Grid;
