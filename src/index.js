const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const { default: helmet } = require('helmet');
const compression = require('compression');

const http = require('http');
const { Server } = require('socket.io');

const app = express();

dotenv.config();

// init middleware
app.use(morgan('dev'));
app.use(helmet());
// app.use(express.json());
app.use(
    express.json({
        verify: (req, res, buf) => {
            if (req.originalUrl.startsWith('/api/v1/stripe/webhook')) {
                req.rawBody = buf.toString();
            }
        },
    })
);
app.use(compression());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(cors());

// socket
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('sendMessage', (data) => {
        console.log('Received sendMessage with data:', data.message);
        // Emit back to the client or other clients
        socket.broadcast.emit('receivedMessage', { message: data.message });
    });
});

// init routes
app.use('/', require('./routes'));

// handling error
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        stack: error.stack,
        message: error.message || 'Internal Server Error',
    });
});

module.exports = server;
