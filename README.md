# Notificationer
> An easy-to-use lightweight notification UI for client-side JavaScript.

### Using Notificationer
Notificationer can be used in client-side javascript. Make sure to set the script with `type='module'`.

```html
<script type='module'>
	import * as nf from 'https://w.joelgrayson.com/notificationer/notificationer.js'; //Import notificationer
	nf.config('bottom-right'); //Configure with a corner (top-left, top-right, bottom-left, bottom-right)
	nf.notify('Hello world');
	nf.notify('Success', 'green');
	nf.notify('Confirmation required <button>confirm</button>', 'red');
</script>
```

### Full Documentation
`nf.config(direction: string)` sets the direction and can only be called once.
`nf.notify(contentHTML: string, color?: string)` displays the HTML string. The notification's color is yellow by default.

### Demo
Try the code sandbox at https://w.joelgrayson.com/notificationer/sandbox.html.

<iframe  src='https://w.joelgrayson.com/notificationer/sandbox.html'  width='800px'  height='500px'></iframe>