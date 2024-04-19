const electron = require('electron')
const ipc = electron.ipcRenderer

const calcBTN = document.getElementById('calcBtn')
const resultBox = document.getElementById('result')
const BMIBox = document.getElementById('bmi')

calcBTN.addEventListener('click', function() {
    
    let height = document.getElementById('height').value
    let weight = document.getElementById('weight').value

    ipc.send('calculateBMI',weight,height)
})

ipc.on('updateResult',function(event, BMIndex, Color, BMI) {
    resultBox.style.color = Color
    resultBox.textContent = ("You are " + BMIndex)
    BMIBox.textContent = ("BMI: " + BMI)


}) 