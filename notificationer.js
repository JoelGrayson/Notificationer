function config() {
    /* Creates in body:
    <div id='notifications-container'>
        <!-- ... -->
    </div>*/
    let notificationsContainerEl=document.createElement('div');
    notificationsContainerEl.id='notifications-container';
    document.body.appendChild(notificationsContainerEl);
}
function notification(content, color='yellow') {
    const notificationEl=document.createElement('div');
    let id='notification-'+new Date().getTime().toString().slice(-6); //time makes notification's id unique
    notificationEl.id=id;
    notificationEl.classList.add('notification');
    notificationEl.classList.add(`notification-${color}`); //notification color
    notificationEl.style.right='15px';
    
    let closeIcon=document.createElement('button');
    closeIcon.innerHTML='X';
    closeIcon.classList.add('icon-close');
    closeIcon.addEventListener('click', ()=>{
        closeNotification(notificationEl);
        clearTimeout(autoClose); //stops timeout() from auto-closing after user already closed
    });
    let autoClose=setTimeout(()=>{
        closeNotification(notificationEl);
    }, 6000);
    notificationEl.appendChild(closeIcon);

    const notificationContentEl=document.createElement('span');
    notificationContentEl.classList.add('notification-content');
    notificationContentEl.innerHTML=content;
    notificationEl.appendChild(notificationContentEl);
    
    document.getElementById('insert-notifications').appendChild(notificationEl);
}
function closeNotification(notificationEl) {
    notificationEl.style.right='-500px';
    setTimeout(()=>{
        notificationEl.parentNode.removeChild(notificationEl);
    }, 1000); //remove after transition
}