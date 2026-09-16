export class MeterIndex {                                                                                                                                                       
  private keys: Uint8Array;                                                                                                                                                     
  private ids: Int32Array;                                                                                                                                                      
  private size: number;                                                                                                                                                         
  private count = 0;                                                                                                                                                            
  private mask: number;                                                                                                                                                         
  constructor(expected: number = 2_000_000) {                                                                                                                                   
    this.size = 1 << Math.ceil(Math.log2(expected / 0.7));                                                                                                                      
    this.mask = this.size - 1;                                                                                                                                                  
    this.keys = new Uint8Array(this.size * 12);                                                                                                                                 
    this.ids = new Int32Array(this.size);                                                                                                                                       
    this.ids.fill(-1);                                                                                                                                                          
  }                                                                                                                                                                             
  private static strToBytes(s: string): Uint8Array {                                                                                                                            
    const out = new Uint8Array(12);                                                                                                                                             
    for (let i = 0; i < 12; i++) out[i] = parseInt(s.substr(i, 2), 16);                                                                                                         
    return out;                                                                                                                                                                 
  }                                                                                                                                                                             
  getOrAdd(meter: string): number {                                                                                                                                             
    const bytes = MeterIndex.strToBytes(meter);                                                                                                                                 
    let h = 0;                                                                                                                                                                  
    for (let i = 0; i < 12; i++) h = (h * 31 + bytes[i]) >>> 0;                                                                                                                 
    let pos = h & this.mask;                                                                                                                                                    
    while (true) {                                                                                                                                                              
      const stored = this.ids[pos];                                                                                                                                             
      if (stored === -1) {                                                                                                                                                      
        this.ids[pos] = this.count;                                                                                                                                             
        this.keys.set(bytes, pos * 12);                                                                                                                                         
        return this.count++;                                                                                                                                                    
      }                                                                                                                                                                         
      const off = pos * 12;                                                                                                                                                     
      let eq = true;                                                                                                                                                            
      for (let i = 0; i < 12; i++) if (this.keys[off + i] !== bytes[i]) { eq = false; break; }                                                                                  
      if (eq) return stored;                                                                                                                                                    
      pos = (pos + 1) & this.mask;                                                                                                                                              
    }                                                                                                                                                                           
  }                                                                                                                                                                             
  get(meter: string): number {                                                                                                                                                  
    const bytes = MeterIndex.strToBytes(meter);                                                                                                                                 
    let h = 0;                                                                                                                                                                  
    for (let i = 0; i < 12; i++) h = (h * 31 + bytes[i]) >>> 0;                                                                                                                 
    let pos = h & this.mask;                                                                                                                                                    
    while (true) {                                                                                                                                                              
      const stored = this.ids[pos];                                                                                                                                             
      if (stored === -1) return -1;                                                                                                                                             
      const off = pos * 12;                                                                                                                                                     
      let eq = true;                                                                                                                                                            
      for (let i = 0; i < 12; i++) if (this.keys[off + i] !== bytes[i]) { eq = false; break; }                                                                                  
      if (eq) return stored;                                                                                                                                                    
      pos = (pos + 1) & this.mask;                                                                                                                                              
    }                                                                                                                                                                           
  }                                                                                                                                                                             
  dump(): Record<number, string> {                                                                                                                                              
    const out: Record<number, string> = {};                                                                                                                                     
    for (let i = 0; i < this.size; i++) {                                                                                                                                       
      const id = this.ids[i];                                                                                                                                                   
      if (id !== -1) {                                                                                                                                                          
        const off = i * 12;                                                                                                                                                     
        let hex = "";                                                                                                                                                           
        for (let j = 0; j < 12; j++) hex += this.keys[off + j].toString(16).padStart(2, "0");                                                                                   
        out[id] = hex;                                                                                                                                                          
      }                                                                                                                                                                         
    }                                                                                                                                                                           
    return out;                                                                                                                                                                 
  }                                                                                                                                                                             
}  