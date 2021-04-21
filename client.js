const ws = require('ws');

const client = new ws('ws://localhost:3000');

client.on('open', () => {
  // Causes the server to print "Hello"
  setInterval(() => {client.send('Hello');}, 500)
  
});

client.on('message', message => console.log(message));