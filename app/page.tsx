"use client"                                                                                                                                                                    
                                                                                                                                                                                
import UploadButton from "./components/UploadButton"                                                                                                                            
import ProgressBar from "./components/ProgressBar"                                                                                                      
import VirtualTable from "./components/VirtualTable"                                                                                                                            
import MapTree from "./components/MapTree"                                                                                                                                      
                                                                                                                                                                                
export default function Home() {                                                                                                                                                
  return (                                                                                                                                                                      
    <main style={{ padding: "1rem", maxWidth: 1200, margin: "auto" }}>                                                                                                          
      <h1>Auditoría de pérdidas de energía</h1>                                                                                                                                 
                                                                                                                                                                                
      <UploadButton />                                                                                                                                                          
                                                                                                                                                                                                                                                                                    
      <ProgressBar percent={0} label="Cargando lecturas…" />                                                                                                                    
                                                                                                                                                                                                                                                                                                                
      <section style={{ marginTop: 24 }}>                                                                                                                                       
        <h2>Jerarquía de la red</h2>                                                                                                                                            
        <MapTree root={{                                                                                                                                                        
          id: "SUB-NORTE",                                                                                                                                                      
          name: "Subestación Norte",                                                                                                                                            
          children: []                                                                                                                                                          
        }}/>                                                                                                                                                                    
      </section>                                                                                                                                                                
                                                                                                                                                                                                                                                                                                             
      <section style={{ marginTop: 24 }}>                                                                                                                                       
        <h2>Lista de clientes</h2>                                                                                                                                              
        <VirtualTable />                                                                                                                                                        
      </section>                                                                                                                                                                
    </main>                                                                                                                                                                     
  )                                                                                                                                                                             
}   