"use client"                                                                                                                                                                    
                                                                                                                                                                                
type Props = {                                                                                                                                                                  
  percent: number            // 0‑100                                                                                                                                           
  label?: string                                                                                                                                                                
}                                                                                                                                                                               
                                                                                                                                                                                
export default function ProgressBar({ percent, label }: Props) {                                                                                                                
  const safe = Math.min(100, Math.max(0, percent))                                                                                                                              
                                                                                                                                                                                
  return (                                                                                                                                                                      
    <div style={{ width: "100%", padding: "4px 0" }}>                                                                                                                           
      {label && (                                                                                                                                                               
        <div style={{ marginBottom: 4, fontSize: "0.85rem", color: "#555" }}>                                                                                                   
          {label}                                                                                                                                                               
        </div>                                                                                                                                                                  
      )}                                                                                                                                                                        
      <div                                                                                                                                                                      
        role="progressbar"                                                                                                                                                      
        aria-valuenow={safe}                                                                                                                                                    
        aria-valuemin={0}                                                                                                                                                       
        aria-valuemax={100}                                                                                                                                                     
        style={{                                                                                                                                                                
          height: 12,                                                                                                                                                           
          background: "#e0e0e0",                                                                                                                                                
          borderRadius: 6,                                                                                                                                                      
          overflow: "hidden",                                                                                                                                                   
        }}                                                                                                                                                                      
      >                                                                                                                                                                         
        <div                                                                                                                                                                    
          style={{                                                                                                                                                              
            width: `${safe}%`,                                                                                                                                                  
            height: "100%",                                                                                                                                                     
            background: "#3b82f6",                                                                                                                                              
            transition: "width 0.2s ease",                                                                                                                                      
          }}                                                                                                                                                                    
        />                                                                                                                                                                      
      </div>                                                                                                                                                                    
      <div                                                                                                                                                                      
        style={{                                                                                                                                                                
          marginTop: 4,                                                                                                                                                         
          fontSize: "0.75rem",                                                                                                                                                  
          textAlign: "right",                                                                                                                                                   
          color: "#333",                                                                                                                                                        
        }}                                                                                                                                                                      
      >                                                                                                                                                                         
        {safe.toFixed(1)} %                                                                                                                                                     
      </div>                                                                                                                                                                    
    </div>                                                                                                                                                                      
  )                                                                                                                                                                             
}  