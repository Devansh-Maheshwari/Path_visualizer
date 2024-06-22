import React from 'react'
import './node.css'
 const Node = ({node ,onNodeClick}) => {
    const {row,col,isStart,isEnd,isWall}=node;
    const extraClassName=isStart?'node-start':isEnd?'node-end':isWall?'node-wall':"";
    
    return (
    <div   id={`node-${row}-${col}`} className={`${extraClassName} nodeWanted node` } onClick={() => onNodeClick(row, col)}>
    </div>
       
  )
}
export default Node;