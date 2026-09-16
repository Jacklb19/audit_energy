import { MeterIndex } from "./indexer";                                                                                                                                         
import { createColumnBuffers } from "./columnStore";                                                                                                                            
                                                                                                                                                                                
const workers: Worker[] = [];                                                                                                                                                   
                                                                                                                                                                                
export async function startProcessing(file: File) {                                                                                                                             
  const CHUNK = 4 * 1024 * 1024;                                                                                                                                                
  const total = file.size;                                                                                                                                                      
  const totalRows = 20_000_000;                                                                                                                                                 
  const { sab, cols } = createColumnBuffers(totalRows);                                                                                                                         
  const index = new MeterIndex();                                                                                                                                               
  const indexSab = new SharedArrayBuffer(index["keys"].byteLength + index["ids"].byteLength);                                                                                   
  const rowCounter = new Int32Array(new SharedArrayBuffer(4));                                                                                                                  
  rowCounter[0] = 0;                                                                                                                                                            
  const concurrency = navigator.hardwareConcurrency || 4;                                                                                                                       
  for (let i = 0; i < concurrency; i++) {                                                                                                                                       
    const w = new Worker(new URL("../workers/blockProcessor.ts", import.meta.url), { type: "module" });                                                                         
    workers.push(w);                                                                                                                                                            
  }                                                                                                                                                                             
  let offset = 0;                                                                                                                                                               
  let blockId = 0;                                                                                                                                                              
  while (offset < total) {                                                                                                                                                      
    const sliceEnd = Math.min(offset + CHUNK, total);                                                                                                                           
    const blob = file.slice(offset, sliceEnd);                                                                                                                                  
    const buf = await blob.arrayBuffer();                                                                                                                                       
    const uint8 = new Uint8Array(buf);                                                                                                                                          
    let lastNL = uint8.lastIndexOf(10);                                                                                                                                         
    if (lastNL === -1) lastNL = uint8.length;                                                                                                                                   
    const block = uint8.subarray(0, lastNL + 1);                                                                                                                                
    const remainder = uint8.subarray(lastNL + 1);                                                                                                                               
    const worker = workers[blockId % concurrency];                                                                                                                              
    worker.postMessage(                                                                                                                                                         
      {                                                                                                                                                                         
        block,                                                                                                                                                                  
        startRow: 0,                                                                                                                                                            
        sab,                                                                                                                                                                    
        indexSab,                                                                                                                                                               
        rowCountPtr: rowCounter                                                                                                                                                 
      },                                                                                                                                                                        
      [sab, indexSab]                                                                                                                                                           
    );                                                                                                                                                                          
    offset += block.byteLength;                                                                                                                                                 
    blockId++;                                                                                                                                                                  
  }                                                                                                                                                                             
  await Promise.all(workers.map(w => new Promise(res => w.onmessage = () => res(null))));                                                                                       
  const progressEvent = new CustomEvent("procProgress", { detail: 100 });                                                                                                       
  window.dispatchEvent(progressEvent);                                                                                                                                          
  const tableEvent = new CustomEvent("tableData", { detail: [] });                                                                                                              
  window.dispatchEvent(tableEvent);                                                                                                                                             
}       