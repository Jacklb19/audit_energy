"use client";                                                                                                                                                                   
                                                                                                                                                                                
import { useEffect, useState } from "react";                                                                                                                                    
                                                                                                                                                                                
export default function ProgressBar() {                                                                                                                                         
  const [progress, setProgress] = useState(0);                                                                                                                                  
  useEffect(() => {                                                                                                                                                             
    const onProg = (e: CustomEvent) => setProgress(e.detail);                                                                                                                   
    window.addEventListener("procProgress", onProg as EventListener);                                                                                                           
    return () => window.removeEventListener("procProgress", onProg as EventListener);                                                                                           
  }, []);                                                                                                                                                                       
  return (                                                                                                                                                                      
    <div style={{ width: "100%", background: "#eee", height: "20px" }}>                                                                                                         
      <div style={{ width: `${progress}%`, background: "#4caf50", height: "100%" }} />                                                                                          
    </div>                                                                                                                                                                      
  );                                                                                                                                                                            
}   