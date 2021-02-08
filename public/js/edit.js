const converter = new showdown.Converter
const inputTextarea = document.querySelector('#inputTextarea')
const outputTextarea = document.querySelector('#outputTextarea')
const htmlOutput = document.querySelector('#htmlOutput')
const btnCLear = document.querySelector('#btnClear')
showdown.setFlavor('github')

btnCLear.addEventListener('click', () => {
    inputTextarea.value = ''
    md2html()
})

inputTextarea.addEventListener('keydown', (event) => {
    if (event.key == "Enter") {
        return false
    }
})

inputTextarea.addEventListener('keyup', () => {
    md2html()
})

function md2html() {
    const output = converter.makeHtml(inputTextarea.value)
    htmlOutput.innerHTML = output
    outputTextarea.value = output
}

md2html()