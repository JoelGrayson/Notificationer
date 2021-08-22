# Notificationer
> An easy-to-use lightweight notification UI for client-side JavaScript.

### Getting Started
1. Install through node: `npm i notificationer`
2. Import the package into your JS code:
`import  *  as  nf  from  './notificationer.js';`
3. Pick a corner (top-left, top-right, bottom-left, bottom-right) for the notifications and run .config()
`nf.config('bottom-right')`
4. `notify(contentHTML: string, color?: string)` takes in HTML content and a color parameter (default is yellow).

### Demo
Try the code sandbox at https://w.joelgrayson.com/notificationer/sandbox.html.
<iframe src='https://w.joelgrayson.com/notificationer/sandbox.html' width='800px' height='500px'></iframe>