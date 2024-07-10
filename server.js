const app = require("./src/index");

const PORT = process.env.PORT || 5001;

const server = app.listen( PORT, () => {
    console.log(`Start with ${PORT}`)
})

process.on('SIGINT', () => {
    server.close(() => {
        console.log('Exit server express');
    })
})