"use client";                                                                                                                                                                   
                                                                                                                                                                                
import { useState } from "react";                                                                                                                                               
import { startProcessing } from "@/lib/workers";                                                                                                                                
                                                                                                                                                                                
export default function UploadButton() {                                                                                                                                        
  const [file, setFile] = useState<File | null>(null);                                                                                                                          
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {                                                                                                            
    if (e.target.files?.[0]) setFile(e.target.files[0]);                                                                                                                        
  };                                                                                                                                                                            
  const handleStart = async () => {                                                                                                                                             
    if (file) await startProcessing(file);                                                                                                                                      
  };                                                                                                                                                                            
  return (                                                                                                                                                                      
    <div>                                                                                                                                                                       
      <input type="file" accept=".csv" onChange={handleChange} />                                                                                                               
      <button disabled={!file} onClick={handleStart}>Procesar</button>                                                                                                          
    </div>                                                                                                                                                                      
  );                                                                                                                                                                            
} 