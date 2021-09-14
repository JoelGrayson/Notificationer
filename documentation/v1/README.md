# Notificationer V1
> Notificationer non-intrusively notifies users from client-side JavaScript.

## Quick Start
Make sure to set the script with `type='module'`.

```html
<script type='module'>
	import * as nf from 'https://w.joelgrayson.com/notificationer/notificationer.js'; //Import notificationer
	nf.config(); //check full documentation's for config() options
	nf.notify('Hello world');
	nf.notify('Success', 'green');
	nf.notify('Confirmation required <button>confirm</button>', 'red');
</script>
```
Result: <img alt='result' src='https://w.joelgrayson.com/image/quick%20start.jpg' height='100px'>

## Full Documentation
* `nf.config(options?)` configures the notification space and can only be called once. Below is the options object format:
	```typescript
	{
		direction:string='bottom-right', //one of the four corners (top-left, top-right, bottom-left, bottom-right)
		autoclose:boolean=true, //false stops notifications from closing automatically after some time
		autocloseDuration:number=6000, //seconds before notification closes by itself
	}
	```
* `nf.notify(contentHTML: string, color?: string)`
	* contentHTML is the notification's content.
	* color is 'yellow' by default. Color can be 'red', 'blue', 'green', or 'yellow'.
	* returns the notification's id
* `nf.close(id: string)` closes the notification with the passed-in id (example below)
* `nf.closeAll()` removes all the notifications.
* `nf.autoclose(onOff: boolean)` sets whether a notification will close automatically or not
* `nf.autocloseDuration(seconds: number)` sets time before a notification closes automatically (default: 6)

## Demos
#### Interactive Sandbox
Try the code sandbox at https://w.joelgrayson.com/notificationer/sandbox.

<iframe src='https://w.joelgrayson.com/notificationer/sandbox' width='800px' height='500px'></iframe>

#### Example: Notify() & Close()
```javascript
let errorNotificationId=nf.notify('Error', 'red'); //store notification id
nf.close(errorNotificationId); //close notification
```