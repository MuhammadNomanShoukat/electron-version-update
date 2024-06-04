const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electronAPI", {
    simpleCall: ()=>"Hello renderer...",
    renderToMainOneWay: (value)=>ipcRenderer.send("setWindowlable", value),
    renderToMainTwoWay: ()=>ipcRenderer.invoke("open:dailog"),
    counterHandler: (callback)=>ipcRenderer.on("counter-handler", (_event, data)=>callback(data)),
    counterValue: (value)=>ipcRenderer.send("counter-value", value)
})