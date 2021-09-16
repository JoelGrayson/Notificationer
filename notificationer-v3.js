let notificationer={
    xDirection: undefined, //left or right for closing direction
    packageUrl: 'https://w.joelgrayson.com/notificationer',
    notificationNum: 1, //ensures each notification has unique id
    autoclose: true,
    autocloseDuration: 6, //seconds
    configSetup: false, //can be found out using `this.configLinks().length===2`
    
    //Properties
    set direction(newDirection) {
        if (!this.configSetup) //not set up, so set up
            this.reconfig();

        this.xDirection=newDirection.match(/\w+-(\w+)/)[1];
        if (this.configSetup) { //remove all direction css files
            document.querySelectorAll(`link[href*='${this.packageUrl}/direction-v3/'`).forEach(el=>{
                el.parentNode.removeChild(el);
            });
        }
        //Add in head: <link rel='stylesheet' href='./bottom-left.css'>
        let directionLinkEl=document.createElement('link');
        directionLinkEl.rel='stylesheet';
        directionLinkEl.href=`${this.packageUrl}/direction-v3/${newDirection}.css`;
        document.head.appendChild(directionLinkEl);
    },

    //Methods
    config: function(options={}) { //not called directly by user, but by program
        if (this.configSetup)
            this.resetConfig(); //removes prior config() for resetting

        this.configSetup=true;

        options.direction??='bottom-right'; //if options.direction is null (not set), default to 'bottom-right'
        options.autoclose??=true;
        options.autocloseDuration??=6;
        
        this.direction=options.direction;
        this.autoclose=options.autoclose;
        this.autocloseDuration=options.autocloseDuration;
    
        //Add in head: <link rel='stylesheet' href='./notificationer-v3.css'>
        let linkEl=document.createElement('link');
        linkEl.rel='stylesheet';
        linkEl.href=`${this.packageUrl}/notificationer-v3.css`;
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
        let script=document.querySelector(`script[src*='${this.packageUrl}/notificationer']`)
        script.parentNode.removeChild(script);
    },
    configLinks: function() {
        return document.querySelectorAll(`link[href*='${this.packageUrl}/']`);
    },
    notify(content, color='#ffc23e') {
        if (this.configSetup) {
            this.notificationNum++;

            const notificationEl=document.createElement('div');
            let id=`notification-${this.notificationNum}`;
            notificationEl.id=id;
            notificationEl.classList.add('notification');
            notificationEl.style.backgroundColor=color; //custom color
            notificationEl.style.border=`1px solid ${color}`; //custom color
            
            let closeIcon=document.createElement('button');
            closeIcon.innerHTML='X';
            closeIcon.classList.add('icon-close');

            let autocloseTimeout;
            if (this.autoclose) {
                autocloseTimeout=setTimeout(()=>{
                    this.close(id);
                }, this.autocloseDuration*1000);
            }
            closeIcon.addEventListener('click', ()=>{
                this.close(id);
                if (this.autoclose)
                    clearTimeout(autocloseTimeout); //stops timeout() from auto-closing after user already closed
            });
            
            const notificationContentEl=document.createElement('span');
            notificationContentEl.classList.add('notification-content');
            notificationContentEl.innerHTML=content;
            notificationEl.appendChild(notificationContentEl);
            notificationEl.appendChild(closeIcon);
        
            document.getElementById('notifications-container').appendChild(notificationEl);
            return id;
        } else { //if config does not exist yet, call config and re-run the function
            this.reconfig();
            this.notify(content, color);
        }
    },
    reconfig() { //reloads config using data from prior config. If no data from prior, uses defualt vals
        this.config({
            direction: this.direction,
            autoclose: this.autoclose,
            autocloseDuration: this.autocloseDuration
        });
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