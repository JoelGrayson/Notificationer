# Notificationer V3
> Easily notify your users from client-side JavaScript. It's as simple as calling the function `notify()`.

## Quick Start
Add the following script to your HTML file **before** your own script tag(s):
```html
<script src='https://w.joelgrayson.com/notificationer/notificationer-v3.js'></script>
```
Notificationer is now imported in the object `notificationer`, shortened to `nf`. To notify, call `nf.notify()` as many times as you want. Check out the full documentation for more details.
```html
<script src='https://w.joelgrayson.com/notificationer/notificationer-v3.js'></script>
<script>
	nf.notify('Hello world');
	nf.notify('Success', 'green');
	nf.notify('Confirmation required <button>confirm</button>', 'red');
</script>
```
Result: <img alt='result' src='https://w.joelgrayson.com/image/quick%20start.jpg' height='100px'>

## Full Documentation
* `notify(contentHTML: string, color?: string)`
	* contentHTML is the notification's content.
	* color is 'yellow' by default. Color can be 'red', 'blue', 'green', or 'yellow'.
	* returns the notification's id for future referencing
* `close(id: string)` closes the notification with the passed-in id (example in demos section)
* `closeAll()` closes all the notifications.

<details>
<summary><b>Deprecated Features</b></summary>

### Legacy Versions


## Interactive Sandbox
Try the code sandbox at https://w.joelgrayson.com/notificationer/sandbox.

<iframe src='https://w.joelgrayson.com/notificationer/sandbox' width='800px' height='450px'></iframe>

## Examples
### Notify() & Close()
```javascript
let errorNotificationId=nf.notify('Error', 'red'); //store notification id
nf.close(errorNotificationId); //close notification
```