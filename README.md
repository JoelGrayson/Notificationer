# Notificationer
> Easily notify your users from client-side JavaScript. It's as simple as calling the function `notify()`.

## Quick Start
Add the following script to your HTML file **before** your own script tag(s):
```html
<script src='https://w.joelgrayson.com/notificationer/notificationer.js'></script>
```
Start with `config()`. Then, `notify()` as many times as you want. Check out the full documentation for more details.
```html
<script src='https://w.joelgrayson.com/notificationer/notificationer.js'></script>
<script>
	config(); //check full documentation for config() options
	notify('Hello world');
	notify('Success', 'green');
	notify('Confirmation required <button>confirm</button>', 'red');
</script>
```
Result: <img alt='result' src='https://w.joelgrayson.com/image/quick%20start.jpg' height='100px'>

## Full Documentation
* `config(options?)` configures the notification space and can only be called once. Below is the options object format. If you leave out a property, and it will be set to its default.
	```typescript
	{
		direction:string='bottom-right', //one of the four corners (top-left, top-right, bottom-left, bottom-right)
		autoclose:boolean=true, //false stops notifications from closing automatically after some time
		autocloseDuration:number=6000, //seconds before notification closes by itself
	}
	```
* `notify(contentHTML: string, color?: string)`
	* contentHTML is the notification's content.
	* color is 'yellow' by default. Color can be 'red', 'blue', 'green', or 'yellow'.
	* returns the notification's id for future referencing
* `close(id: string)` closes the notification with the passed-in id (example in demos section)
* `closeAll()` closes all the notifications.

<details>
<summary><b>Deprecated Features</b></summary>

### Legacy Start (Module)
Prior to version 2.0, the only way to use notificationer was by importing it with `type='module'`.
```html
<script type='module'>
	import * as nf from 'https://w.joelgrayson.com/notificationer/module.js'; //Import notificationer
	nf.config(); //check full documentation for config() options
	nf.notify('Hello world');
	nf.notify('Success', 'green');
	nf.notify('Confirmation required <button>confirm</button>', 'red');
</script>
```
Result: <img alt='result' src='https://w.joelgrayson.com/image/quick%20start.jpg' height='100px'>
</details>

## Interactive Sandbox
Try the code sandbox at https://w.joelgrayson.com/notificationer/sandbox.

<iframe src='https://w.joelgrayson.com/notificationer/sandbox' width='800px' height='450px'></iframe>

## Examples
### Notify() & Close()
```javascript
let errorNotificationId=nf.notify('Error', 'red'); //store notification id
nf.close(errorNotificationId); //close notification
```