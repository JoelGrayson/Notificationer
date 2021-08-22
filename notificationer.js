let xDirection; //left or right for closing direction
let packageUrl='https://w.joelgrayson.com/notificationer';
let notificationNum=1;

export function config(direction='bottom-right') {
    //Add in header: <link rel='stylesheet' href='./notificationer.css'>
    let linkEl=document.createElement('link');
    linkEl.rel='stylesheet';
    linkEl.href=`${packageUrl}/notificationer.css`;
    document.head.appendChild(linkEl);
    let directionLinkEl=document.createElement('link');
    directionLinkEl.rel='stylesheet';
    directionLinkEl.href=`${packageUrl}/direction/${direction}.css`;
    document.head.appendChild(directionLinkEl);

    /* Creates in body:
    <div id='notifications-container'>
        <!-- ... -->
    </div>*/
    let notificationsContainerEl=document.createElement('div');
    notificationsContainerEl.id='notifications-container';
    document.body.appendChild(notificationsContainerEl);

    xDirection=direction.match(/\w+-(\w+)/)[1];
}
export function notify(content, color='yellow') {
    const notificationEl=document.createElement('div');
    let id=`notification-${notificationNum}`
    notificationEl.id=id;
    notificationNum++; //ensures each notification has unique id
    notificationEl.classList.add('notification');
    notificationEl.classList.add(`notification-${color}`); //notification color
    
    let closeIcon=document.createElement('button');
    closeIcon.innerHTML='X';
    closeIcon.classList.add('icon-close');
    closeIcon.addEventListener('click', ()=>{
        close(id);
        clearTimeout(autoClose); //stops timeout() from auto-closing after user already closed
    });
    let autoClose=setTimeout(()=>{
        close(id);
    }, 6000);
    notificationEl.appendChild(closeIcon);

    const notificationContentEl=document.createElement('span');
    notificationContentEl.classList.add('notification-content');
    notificationContentEl.innerHTML=content;
    notificationEl.appendChild(notificationContentEl);

    document.getElementById('notifications-container').appendChild(notificationEl);
    return id;
}
export function close(id) {
    const notificationEl=document.getElementById(id);

    if (xDirection==='left')
        notificationEl.style.left='-320px';
    else if (xDirection==='right')
        notificationEl.style.right='-320px';

    setTimeout(()=>{
        notificationEl.parentNode.removeChild(notificationEl);
    }, 500); //remove after transition
}
export function closeAll() {
    let notifications=document.getElementsByClassName('notification');
    for (let i=0; i<notifications.length; i++) {
        close(notifications[i].id);
    }
}