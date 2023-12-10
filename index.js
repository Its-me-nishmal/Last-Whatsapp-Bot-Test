const { keepAlive, client } = require('./whatsapp-web');

// Start the Express server
keepAlive();

// Connect the WhatsApp bot
client.initialize();
