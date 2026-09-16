import * as fs from "fs"                                                                                                                                                        
import * as path from "path"                                                                                                                                                    
                                                                                                                                                                                
const NUM_METERS = 2000                                                                                                                                                         
const HOURS = 720                                                                                                                                                               
const START_EPOCH = 1764547200 // arbitrary start hour                                                                                                                          
const VERSION_RATE = 0.02                                                                                                                                                       
const GAP_RATE = 0.07                                                                                                                                                           
const NEGATIVE_RATE = 0.01                                                                                                                                                      
const MOVED_METERS = 300                                                                                                                                                        
const NEW_METERS = 180                                                                                                                                                          
                                                                                                                                                                                
function randInt(max: number) {                                                                                                                                                 
  return Math.floor(Math.random() * max)                                                                                                                                        
}                                                                                                                                                                               
                                                                                                                                                                                
function padHex(num: number) {                                                                                                                                                  
  return num.toString(16).padStart(12, "0")                                                                                                                                     
}                                                                                                                                                                               
                                                                                                                                                                                
function writeCsv(file: string, header: string, rows: string[]) {                                                                                                               
  const stream = fs.createWriteStream(file)                                                                                                                                     
  stream.write(header + "\n")                                                                                                                                                   
  rows.forEach((r) => stream.write(r + "\n"))                                                                                                                                   
  stream.end()                                                                                                                                                                  
}                                                                                                                                                                               
                                                                                                                                                                                
// generate topology                                                                                                                                                            
const topologyRows: string[] = []                                                                                                                                               
for (let i = 0; i < NUM_METERS; i++) {                                                                                                                                          
  const meterId = padHex(i)                                                                                                                                                     
  const trafo = `TR-${(i % 200).toString().padStart(4, "0")}`                                                                                                                   
  topologyRows.push(                                                                                                                                                            
    `${meterId},MEDIDOR,${trafo},${START_EPOCH},${START_EPOCH + HOURS * 3600}`                                                                                                  
  )                                                                                                                                                                             
}                                                                                                                                                                               
for (let i = 0; i < 200; i++) {                                                                                                                                                 
  const trafo = `TR-${i.toString().padStart(4, "0")}`                                                                                                                           
  const circuito = `CIR-${(i % 50).toString().padStart(2, "0")}`                                                                                                                
  topologyRows.push(`${trafo},TRAFO,${circuito},${START_EPOCH},${4102444800}`)                                                                                                  
}                                                                                                                                                                               
for (let i = 0; i < 50; i++) {                                                                                                                                                  
  const circuito = `CIR-${i.toString().padStart(2, "0")}`                                                                                                                       
  topologyRows.push(`${circuito},CIRCUITO,SUB-NORTE,${START_EPOCH},${4102444800}`)                                                                                              
}                                                                                                                                                                               
topologyRows.push(`SUB-NORTE,SUBESTACION,,${START_EPOCH},${4102444800}`)                                                                                                        
                                                                                                                                                                                
writeCsv(                                                                                                                                                                       
  path.join(__dirname, "topologia.csv"),                                                                                                                                        
  "nodo_id,tipo,padre_id,desde,hasta",                                                                                                                                          
  topologyRows                                                                                                                                                                  
)                                                                                                                                                                               
                                                                                                                                                                                
// generate readings                                                                                                                                                            
const readingRows: string[] = []                                                                                                                                                
for (let m = 0; m < NUM_METERS; m++) {                                                                                                                                          
  const meterId = padHex(m)                                                                                                                                                     
  for (let h = 0; h < HOURS; h++) {                                                                                                                                             
    const ts = START_EPOCH + h * 3600                                                                                                                                           
    if (Math.random() < GAP_RATE) {                                                                                                                                             
      readingRows.push(`${meterId},${ts},,1,2`)                                                                                                                                 
      continue                                                                                                                                                                  
    }                                                                                                                                                                           
    const base = (Math.sin((h / 24) * Math.PI * 2) + 1) * 0.5 * 2                                                                                                               
    const kwh = base + (Math.random() - 0.5) * 0.1                                                                                                                              
    const version = Math.random() < VERSION_RATE ? 2 : 1                                                                                                                        
    const flags = Math.random() < NEGATIVE_RATE ? 4 : 0                                                                                                                         
    readingRows.push(`${meterId},${ts},${kwh.toFixed(3)},${version},${flags}`)                                                                                                  
  }                                                                                                                                                                             
}                                                                                                                                                                               
writeCsv(                                                                                                                                                                       
  path.join(__dirname, "lecturas_mes.csv"),                                                                                                                                     
  "meter_id,ts,kwh,version,flags",                                                                                                                                              
  readingRows                                                                                                                                                                   
)                                                                                                                                                                               
                                                                                                                                                                                
console.log("Synthetic files generated")    