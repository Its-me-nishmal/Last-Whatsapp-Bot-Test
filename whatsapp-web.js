const express = require('express');
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const server = express();

const client = new Client();

// Event emitted when the QR code is ready
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

// Event emitted when the client is ready
client.on('ready', () => {
    console.log('WhatsApp bot is ready!');
});

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
