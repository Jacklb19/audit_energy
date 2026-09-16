"use client"                                                                                                                                                                    
import { useState, useEffect } from "react"                                                                                                                                     
                                                                                                                                                                                
type Node = {                                                                                                                                                                   
  id: string                                                                                                                                                                    
  name: string                                                                                                                                                                  
  children?: Node[]                                                                                                                                                             
}                                                                                                                                                                               
                                                                                                                                                                                
export default function MapTree({ root }: { root: Node }) {                                                                                                                     
  const [expanded, setExpanded] = useState<Set<string>>(new Set())                                                                                                              
                                                                                                                                                                                
  const toggle = (id: string) => {                                                                                                                                              
    setExpanded((prev) => {                                                                                                                                                     
      const next = new Set(prev)                                                                                                                                                
      if (next.has(id)) next.delete(id)                                                                                                                                         
      else next.add(id)                                                                                                                                                         
      return next                                                                                                                                                               
    })                                                                                                                                                                          
  }                                                                                                                                                                             
                                                                                                                                                                                
  const render = (node: Node) => (                                                                                                                                              
    <li key={node.id}>                                                                                                                                                          
      <div onClick={() => toggle(node.id)} style={{ cursor: "pointer" }}>                                                                                                       
        {node.children?.length ? (expanded.has(node.id) ? "▼" : "▶") : "•"} {node.name}                                                                                         
      </div>                                                                                                                                                                    
      {node.children && expanded.has(node.id) && (                                                                                                                              
        <ul style={{ marginLeft: 20 }}>{node.children.map(render)}</ul>                                                                                                         
      )}                                                                                                                                                                        
    </li>                                                                                                                                                                       
  )                                                                                                                                                                             
                                                                                                                                                                                
  return <ul>{render(root)}</ul>                                                                                                                                                
}      