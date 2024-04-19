const { app, BrowserWindow, ipcRenderer, ipcMain } = require('electron')


app.whenReady().then(() => {

    const myWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        autoHideMenuBar: true,
        resizable: false,
    });

    myWindow.loadFile('./page/html/index.html')
})

ipcMain.on('calculateBMI',function(event, weight, height) {
    const heightConverted = height/100
    const BMI = Math.round(weight / Math.pow(heightConverted,2))
    let BMIndex = ".."
    let color = ".."

    console.log(BMI)

    if (BMI < 19) {
        BMIndex = "Underweight"
        color = "yellow"
    }

    if (BMI >= 19 && BMI <= 24) {
        BMIndex = "Normal"
        color = "green"
    }

    if (BMI >= 25 && BMI <=  29) {
        BMIndex = "Overweight"
        color = "yellow"
    }

    if (BMI >= 30 && BMI <= 39) {
        BMIndex = "Obese"
        color = "orange"
    }

    if (BMI >= 40 && BMI <= 54) {
        BMIndex = "Extermely Obese"
        color = "red"
    }

    if (BMI > 54) {
        BMIndex = "Probably going to die.."
        color = "darkred"
    }

    event.sender.send('updateResult', BMIndex, color, BMI)
 
})

