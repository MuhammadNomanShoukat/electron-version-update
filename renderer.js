// that file will render the functions

// all selector will create here
const testingSelector = document.getElementById("testing-label")
const testBtnSelectron = document.getElementById("btn-test-render")
const btnSelector = document.getElementById("btn-load-label")
const labelSelector = document.getElementById("label-field")
const btnUploadFilePath = document.getElementById("btn-dialog")
const labelUploadFilePath = document.getElementById("file-path")
const inptSelectror = document.getElementById("")
const countSelecton = document.getElementById("count-value")


// all selectron events will handle here
testBtnSelectron.addEventListener("click", (event)=>{
    const value = window.electronAPI.simpleCall()
    console.log(value)
})

btnSelector.addEventListener("click", (event)=>{
    const label = labelSelector.value
    window.electronAPI.renderToMainOneWay(label)
})

btnUploadFilePath.addEventListener("click", async (event)=>{
    const response = await window.electronAPI.renderToMainTwoWay()
    labelUploadFilePath.innerText = response
})


window.electronAPI.counterHandler((value)=>{
    const oldValue = Number(countSelecton.innerText)
    const newValue = value + oldValue
    countSelecton.innerText = newValue.toString()
    window.electronAPI.counterValue(newValue)
})
