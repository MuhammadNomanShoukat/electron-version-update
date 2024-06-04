const { app, BrowserWindow, dialog, ipcMain, Menu } = require("electron")
const path = require("node:path")

require('update-electron-app')({
    repo: 'your-github-username/your-repo', // Replace with your GitHub repo
    updateInterval: '1 hour',
    logger: require('electron-log')
});

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        height: 500,
        width: 800,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    })

    const customMenu = Menu.buildFromTemplate([
        {
            label: app.name,
            submenu: [
                {
                    click: ()=>mainWindow.webContents.send("counter-handler", 1),
                    label: "Increament"
                },
                {
                    click: ()=>mainWindow.webContents.send("counter-handler", -1),
                    label: "Decreament"
                }
            ]
        }
    ])

    Menu.setApplicationMenu(customMenu)

    mainWindow.loadFile("index.html")
}

app.whenReady().then(()=>{
    ipcMain.handle("open:dailog", createDialog)
    createWindow()
    app.on("activate", ()=>{
        if(BrowserWindow.getAllWindows.length === 0){
            createWindow()
        }
    })  
})

app.on("window-all-closed", ()=>{
    if(process.platform !== "darwin"){
        app.quit()
    }
})

ipcMain.on("setWindowlable", (event, data)=>{
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(data)
})

ipcMain.on("counter-value", (event, data)=>{
    console.log(data)
})

const createDialog = async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog()
    if(!canceled){
        return filePaths[0]
    }
}



