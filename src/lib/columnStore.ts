export interface ColumnBuffers {                                                                                                                                                
  ts: BigInt64Array;                                                                                                                                                            
  kwh: Float64Array;                                                                                                                                                            
  version: Uint8Array;                                                                                                                                                          
  flags: Uint8Array;                                                                                                                                                            
}                                                                                                                                                                               
export function createColumnBuffers(maxRows: number) {                                                                                                                          
  const rowSize = 8 + 8 + 1 + 1;                                                                                                                                                
  const sab = new SharedArrayBuffer(rowSize * maxRows);                                                                                                                         
  const ts = new BigInt64Array(sab, 0, maxRows);                                                                                                                                
  const kwh = new Float64Array(sab, 8 * maxRows, maxRows);                                                                                                                      
  const version = new Uint8Array(sab, 16 * maxRows, maxRows);                                                                                                                   
  const flags = new Uint8Array(sab, 16 * maxRows + maxRows, maxRows);                                                                                                           
  return { sab, cols: { ts, kwh, version, flags } };                                                                                                                            
}    