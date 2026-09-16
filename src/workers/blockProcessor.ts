import { MeterIndex } from "@/lib/indexer";                                                                                                                                     
                                                                                                                                                                                
self.onmessage = async (e: MessageEvent) => {                                                                                                                                   
  const { block, sab, indexSab, rowCountPtr } = e.data as any;                                                                                                                  
  const maxRows = sab.byteLength / (8 + 8 + 1 + 1);                                                                                                                             
  const cols = {                                                                                                                                                                
    ts: new BigInt64Array(sab, 0, maxRows),                                                                                                                                     
    kwh: new Float64Array(sab, 8 * maxRows, maxRows),                                                                                                                           
    version: new Uint8Array(sab, 16 * maxRows, maxRows),                                                                                                                        
    flags: new Uint8Array(sab, 16 * maxRows + maxRows, maxRows)                                                                                                                 
  };                                                                                                                                                                            
  const index = new MeterIndex();                                                                                                                                               
  const text = new TextDecoder().decode(block);                                                                                                                                 
  const lines = text.split("\n");                                                                                                                                               
  for (const line of lines) {                                                                                                                                                   
    if (!line) continue;                                                                                                                                                        
    const [meter_id, tsStr, kwhStr, verStr, flStr] = line.split(",");                                                                                                           
    const row = Atomics.add(rowCountPtr, 0, 1);                                                                                                                                 
    const dense = index.getOrAdd(meter_id);                                                                                                                                     
    cols.ts[row] = BigInt(Number(tsStr));                                                                                                                                       
    cols.kwh[row] = kwhStr ? Number(kwhStr) : NaN;                                                                                                                              
    cols.version[row] = Number(verStr);                                                                                                                                         
    cols.flags[row] = Number(flStr);                                                                                                                                            
  }                                                                                                                                                                             
  self.postMessage({ done: true });                                                                                                                                             
}; 