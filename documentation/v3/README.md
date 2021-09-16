# Notificationer V3
> Easily notify your users from client-side JavaScript. It's as simple as calling the function `nf.notify()`.

## Quick Start
Add the following script to your HTML file **before** your own script tag(s):
```html
<script src='https://w.joelgrayson.com/notificationer/notificationer-v3.js'></script>
```
Notificationer is now imported in the object `notificationer` or `nf` for short. To notify, call `nf.notify()` as many times as you want. Check out the full documentation for more functionality.
```html
<script src='https://w.joelgrayson.com/notificationer/notificationer-v3.js'></script>
<script>
	nf.notify('Hello world');
	nf.notify('Success', 'lightgreen');
	nf.notify('Confirmation required <button>confirm</button>', 'red');
</script>
```
Result: <img alt='result' src='https://w.joelgrayson.com/image/quick%20start%202.jpg' height='100px'>

## Full Documentation
### Properties
* `nf.direction: string` can be set to one of the four corners ('top-left', 'top-right', 'bottom-left', 'bottom-right'). If not set, the default is 'bottom-right'.
	```js
	nf.direction='top-left';
	nf.notify('I am in the top left');
	```
* `nf.autoclose: boolean` can be set to whether or not the notifications close on their own.
	```js
	nf.autoclose=false;
	nf.notify('I will not close unless someone clicks (x)');
	```
* `nf.autocloseDuration: float` can be set to  the duration before notifications close.
	```js
	nf.autocloseDuration=15;
	nf.notify('I close in 15 seconds');
	```

### Methods
* `nf.notify(contentHTML: string, color?: string)`
	* contentHTML is the notification's content.
	* color: string can be any css color (eg `'red'`, `'#ff0000'`, `'rgba(255, 0, 0)'`, or `'hsl(0, 100%, 50%)'`)
	* returns the notification's id for future referencing
* `nf.close(id: string)` closes the notification with the passed-in id (example in demos section)
	```js
	let errorNotificationId=nf.notify('Error', 'red'); //store notification id
	nf.close(errorNotificationId); //close notification
	```
* `nf.closeAll()` closes all the notifications
* `nf.destroy()` removes notificationer scripts and styles


## Interactive Sandbox
Try the code sandbox at https://w.joelgrayson.com/notificationer/sandbox.

<iframe src='https://w.joelgrayson.com/notificationer/sandbox' width='800px' height='450px'></iframe>