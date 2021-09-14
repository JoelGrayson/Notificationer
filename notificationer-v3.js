let notificationer={
    xDirection: undefined, //left or right for closing direction
    packageUrl: 'https://w.joelgrayson.com/notificationer',
    notificationNum: 1, //ensures each notification has unique id
    autoclose: true,
    autocloseDurationMillis: 6000,
    configSetup: false, //can be found out using this.configLinks().length===2
    
    config: function(options={}) {
        if (this.configSetup)
            this.resetConfig(); //removes prior config() for resetting

        this.configSetup=true;

        options.direction??='bottom-right'; //if options.direction is null (not set), default to 'bottom-right'
        options.autoclose??=true;
        options.autocloseDuration??=6;
        
        this.direction=options.direction;
        this.autoclose=options.autoclose;
        this.autocloseDuration=options.autocloseDuration*1000;
    
        //Add in head: <link rel='stylesheet' href='./notificationer.css'>
        let linkEl=document.createElement('link');
        linkEl.rel='stylesheet';
        linkEl.href=`${this.packageUrl}/notificationer.css`;
        document.head.appendChild(linkEl);
        
        /* Creates in body:
        <div id='notifications-container'>
        <!-- ... -->
        </div>*/
        let notificationsContainerEl=document.createElement('div');
        notificationsContainerEl.id='notifications-container';
        document.body.appendChild(notificationsContainerEl);
    },
    resetConfig: function() { //undoes config()
        this.configLinks().forEach(el=>{ //remove all config <link>s
            el.parentNode.removeChild(el);
        });
        let notificationsContainerEl=document.getElementById('notifications-container');
        notificationsContainerEl.parentNode.removeChild(notificationsContainerEl);
        this.configSetup=false;
    },
    destroy: function() {
        this.resetConfig();
        let script=document.querySelectorAll(`script[src*='${packageUrl}/notificationer.js']`)
        script.parentNode.removeChild(script);
    },
    set direction(newDirection) {
        this.xDirection=newDirection.match(/\w+-(\w+)/)[1];
        //Add in head: <link rel='stylesheet' href='./bottom-left.css'>
        if (this.configSetup) {
            document.querySelectorAll(`link[href*='${this.packageUrl}/direction/'`).forEach(el=>{
                el.parentNode.removeChild(el);
            });
        }
        let directionLinkEl=document.createElement('link');
        directionLinkEl.rel='stylesheet';
        directionLinkEl.href=`${this.packageUrl}/direction/${newDirection}.css`;
        document.head.appendChild(directionLinkEl);
    },
    configLinks: function() {
        return document.querySelectorAll(`link[href*='${this.packageUrl}/']`);
    },
    notify(content, color='yellow') {
        if (this.configSetup) {
            const notificationEl=document.createElement('div');
            let id=`notification-${this.notificationNum}`;
            notificationEl.id=id;
            this.notificationNum++;
            notificationEl.classList.add('notification');
            notificationEl.classList.add(`notification-${color}`); //notification color
            
            let closeIcon=document.createElement('button');
            closeIcon.innerHTML='X';
            closeIcon.classList.add('icon-close');

            let autocloseTimeout;
            if (this.autoclose) {
                autocloseTimeout=setTimeout(()=>{
                    this.close(id);
                }, this.autocloseDurationMillis);
            }
            closeIcon.addEventListener('click', ()=>{
                this.close(id);
                if (this.autoclose)
                    clearTimeout(autocloseTimeout); //stops timeout() from auto-closing after user already closed
            });
            notificationEl.appendChild(closeIcon);
        
            const notificationContentEl=document.createElement('span');
            notificationContentEl.classList.add('notification-content');
            notificationContentEl.innerHTML=content;
            notificationEl.appendChild(notificationContentEl);
        
            document.getElementById('notifications-container').appendChild(notificationEl);
            return id;
        } else { //if config does not exist yet, call config and re-run the function
            this.config({
                direction: this.direction,
                autoclose: this.autoclose,
                autocloseDuration: this.autocloseDurationMillis/1000
            }); //call empty default config()
            this.notify(content, color);
        }
    },
    close: function(id) {
        const notificationEl=document.getElementById(id);
    
        if (this.xDirection==='left')
            notificationEl.style.left='-320px';
        else if (this.xDirection==='right')
            notificationEl.style.right='-320px';
    
        setTimeout(()=>{
            notificationEl.parentNode.removeChild(notificationEl);
        }, 500); //remove after transition
    },
    closeAll: function() {
        let notifications=document.getElementsByClassName('notification');
        for (let i=0; i<notifications.length; i++) {
            this.close(notifications[i].id);
        }
    }
};
let nf=notificationer; //shorthand alias