let sab: SharedArrayBuffer | null = null;                                                                                                                                       
let indexSab: SharedArrayBuffer | null = null;                                                                                                                                  
let rowCounter: Int32Array | null = null;                                                                                                                                       
                                                                                                                                                                                
self.onconnect = (e: MessageEvent) => {                                                                                                                                         
  const port = e.ports[0];                                                                                                                                                      
  port.onmessage = (msg) => {                                                                                                                                                   
    const { type, data } = msg.data;                                                                                                                                            
    if (type === "init") {                                                                                                                                                      
      sab = data.sab;                                                                                                                                                           
      indexSab = data.indexSab;                                                                                                                                                 
      rowCounter = new Int32Array(data.rowCounter);                                                                                                                             
      port.postMessage({ status: "ready" });                                                                                                                                    
    } else if (type === "getBuffers") {                                                                                                                                         
      port.postMessage({ sab, indexSab, rowCounter });                                                                                                                          
    }                                                                                                                                                                           
  };                                                                                                                                                                            
};   