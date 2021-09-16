let editor=ace.edit('editor');
editor.setTheme('ace/theme/monokai');
editor.session.setMode('ace/mode/html');

let aceEditor=window.ace.edit(document.getElementById('editor'));
let defaultHead;
setTimeout(()=>{
    defaultHead=document.head.innerHTML;
}, 400); //1 second delay for ace editor scripts to load


// const codeEditorTextarea=document.getElementById('codeEditor');
const runBtn=document.getElementById('runBtn');
let runBtns=document.getElementsByClassName('runBtn');
for (let i=0; i<runBtns.length; i++)
    runBtns[i].addEventListener('click', run);

function run() {
    if (!!document.body.querySelector('#notifications-container')) //notifications container exists
        document.body.removeChild(document.getElementById('notifications-container')); //remove notifications container (to reset)
    document.head.innerHTML=defaultHead;
    let editorVal=editor.getValue();
    let startingIndex=editorVal.indexOf('<script>', 2)+'<script>'.length; //exclude `<script>` by adding .length
    let endingIndex=editorVal.length-'</script>'.length;
    let codeToRun=editorVal.substring(startingIndex, endingIndex); //second occurence of `</script>` EOF
    eval(codeToRun);
}