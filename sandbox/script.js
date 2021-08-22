import * as nf from 'https://w.joelgrayson.com/notificationer/notificationer.js';

const defaultHead=document.head.innerHTML;
const codeEditorTextarea=document.getElementById('codeEditor');
const runBtn=document.getElementById('runBtn');
function run() {
    if (!!document.body.querySelector('#notifications-container')) //notifications container exists
        document.body.removeChild(document.getElementById('notifications-container')); //remove notifications container (to reset)
    document.head.innerHTML=defaultHead;
    eval(codeEditorTextarea.value);
}
let runBtns=document.getElementsByClassName('runBtn');
for (let i=0; i<runBtns.length; i++)
    runBtns[i].addEventListener('click', run);