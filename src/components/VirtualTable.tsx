"use client";                                                                                                                                                                   
                                                                                                                                                                                
import { useEffect, useState } from "react";                                                                                                                                    
import { useVirtual } from "@tanstack/react-virtual";                                                                                                                           
                                                                                                                                                                                
export default function VirtualTable() {                                                                                                                                        
  const [rows, setRows] = useState<string[][]>([]);                                                                                                                             
  useEffect(() => {                                                                                                                                                             
    const handler = (e: CustomEvent) => setRows(e.detail);                                                                                                                      
    window.addEventListener("tableData", handler as EventListener);                                                                                                             
    return () => window.removeEventListener("tableData", handler as EventListener);                                                                                             
  }, []);                                                                                                                                                                       
  const parentRef = useRef<HTMLDivElement>(null);                                                                                                                               
  const rowVirtualizer = useVirtual({                                                                                                                                           
    size: rows.length,                                                                                                                                                          
    parentRef,                                                                                                                                                                  
    estimateSize: () => 30,                                                                                                                                                     
    overscan: 10                                                                                                                                                                
  });                                                                                                                                                                           
  return (                                                                                                                                                                      
    <div ref={parentRef} style={{ height: "400px", overflow: "auto" }}>                                                                                                         
      <div style={{ height: `${rowVirtualizer.totalSize}px`, position: "relative" }}>                                                                                           
        {rowVirtualizer.virtualItems.map(virtualRow => (                                                                                                                        
          <div                                                                                                                                                                  
            key={virtualRow.index}                                                                                                                                              
            ref={virtualRow.measureRef}                                                                                                                                         
            style={{                                                                                                                                                            
              position: "absolute",                                                                                                                                             
              top: 0,                                                                                                                                                           
              left: 0,                                                                                                                                                          
              width: "100%",                                                                                                                                                    
              height: `${virtualRow.size}px`,                                                                                                                                   
              transform: `translateY(${virtualRow.start}px)`                                                                                                                    
            }}                                                                                                                                                                  
          >                                                                                                                                                                     
            {rows[virtualRow.index].join(" | ")}                                                                                                                                
          </div>                                                                                                                                                                
        ))}                                                                                                                                                                     
      </div>                                                                                                                                                                    
    </div>                                                                                                                                                                      
  );                                                                                                                                                                            
}     