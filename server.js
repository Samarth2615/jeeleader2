const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// User credentials
const validUsers = [
    { formNumber: '16208', name: 'SAMARTH' },
    { formNumber: '1003635828', name: 'MANN AHLAWAT' },
    { formNumber: '1003628922', name: 'HARSHITA TYAGI' },
    { formNumber: '1003627068', name: 'CHIRAYU AGGARWAL' },
    { formNumber: '1003608081', name: 'NAVYA SINGLA' },
    { formNumber: '1003641586', name: 'DAKSHA MITTAL' },
    { formNumber: '1003621537', name: 'SARVKRITIKA SINGH' },
    { formNumber: '1003644405', name: 'JAYESH KUMAR' },
    { formNumber: '1003636144', name: 'SHUBHAM' },
    { formNumber: '1003635704', name: 'SHRIYANSH' },
    { formNumber: '1003635831', name: 'LAVANYA SHARMA' },
    { formNumber: '1003634157', name: 'KESHAV' },
    { formNumber: '1003636153', name: 'ANKUR' },
    { formNumber: '1003649448', name: 'SIDDHANT SONI' },
    { formNumber: '1003657104', name: 'CHARITRA' },
    { formNumber: '1003652856', name: 'TANISHQ' },
    { formNumber: '1003615078', name: 'SHRUTI' },
    { formNumber: '1003635333', name: 'HARSH' },
    { formNumber: '1003627589', name: 'SOUMYA DIXIT' },
    { formNumber: '1003582869', name: 'ARYAN' },
    { formNumber: '1003656019', name: 'HARSHIT' },
    { formNumber: '1003647434', name: 'ADARSH SINGH' },
    { formNumber: '1003658672', name: 'DHAIRYA BHARDWAJ' },
    { formNumber: '1003612490', name: 'SMRITI' },
    { formNumber: '1003659371', name: 'AVIKA KAUSHIK' },
    { formNumber: '1003652585', name: 'HARSH YADAV' },
    { formNumber: '1003649549', name: 'KRISHNA BANSAL' },
    { formNumber: '1003617805', name: 'DIVYANSH' },
    { formNumber: '1003651331', name: 'RUAAN SINGH' },
    { formNumber: '1003606078', name: 'HARSHIT CHAHAR' },
    { formNumber: '1003647443', name: 'ANURAG' },
    { formNumber: '1003633760', name: 'MANJEET KUMAR SETHIA' },
    { formNumber: '1003625277', name: 'ADITYA KUMAR' },
    { formNumber: '1003654262', name: 'MUDASSIR ALI' },
    { formNumber: '1003654544', name: 'KSHITIZ JHA' },
    { formNumber: '1003546128', name: 'PARTH' },
    { formNumber: '1003597073', name: 'HITESH SHARMA' },
    { formNumber: '1003613992', name: 'TANUJ PAL' },
    { formNumber: '1000000000', name: 'RUDRANSH' },
    { formNumber: '10', name: 'VISHAL' },
    { formNumber: '1001', name: 'MAHI' },
];

// Serve the static HTML files
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('userJoined', (credentials) => {
        const { formNumber, name } = credentials;
        const user = validUsers.find(user => user.formNumber === formNumber && user.name === name);

        if (user) {
            socket.emit('loginSuccess', user.name);
            socket.broadcast.emit('message', `${user.name} joined the chat`);
        } else {
            socket.emit('loginFailure', 'Invalid credentials');
        }
    });

    // Listen for chat messages
    socket.on('chatMessage', (msg) => {
        io.emit('message', msg);
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
