const express = require('express');
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const server = express();
const client = new Client();

// Replace '1234567890' with the actual target phone number
const targetNumber = '917994107442';

// Event emitted when the QR code is ready
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

// Event emitted when the client is ready
client.on('ready', () => {
    console.log('WhatsApp bot is ready!');
});

// Event emitted when a message is received
client.on('message', (message) => {
    if (message.from === `${targetNumber}@c.us` && message.body.toLowerCase() === 'hello') {
        // Respond with "hi" only if the message is from the specified number and contains "hello"
        message.reply('hi');
    }
});

// Log "hi" every 5 seconds and send a message to the target number
setInterval(() => {
    console.log('hi');
    
    // Send "hi" to the target number
    client.sendMessage(`${targetNumber}@c.us`, 'working...');
}, 5000);

server.all('/qr', (req, res) => {
    // Retrieve the QR code for the client
    const qrCode = client.generateInviteCode();
    res.send(qrCode);
});

function keepAlive() {
    server.listen(3000, () => {
        console.log('24/7 Activation Complete');
    });
}

module.exports = { keepAlive, client };
