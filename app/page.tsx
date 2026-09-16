"use client";                                                                                                                                                                   
                                                                                                                                                                                
import UploadButton from "@/components/UploadButton";                                                                                                                           
import ProgressBar from "@/components/ProgressBar";                                                                                                                             
import VirtualTable from "@/components/VirtualTable";                                                                                                                           
                                                                                                                                                                                
export default function Home() {                                                                                                                                                
  return (                                                                                                                                                                      
    <main>                                                                                                                                                                      
      <h1>Auditoría de pérdidas</h1>                                                                                                                                            
      <UploadButton />                                                                                                                                                          
      <ProgressBar />                                                                                                                                                           
      <VirtualTable />                                                                                                                                                          
    </main>                                                                                                                                                                     
  );                                                                                                                                                                            
}    