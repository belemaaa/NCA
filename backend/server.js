const http = require('http')
const app = require('./app')
const cors = require('cors')

app.use(cors());

const server = http.createServer(app)
const { Server } = require('socket.io')

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})

// establish socket connection
io.on("connection", (socket) => {
    try{
        console.log(`Client connected: ${socket.id}`)

        socket.on("join_room", (room) => {
            socket.join(room)
        })

        socket.on("disconnect", () => {
            console.log("user disconnected", socket.id)
        })
    } catch(error){
        console.error("Error during socket connection: ", error)
    }
    
})
    
const port = process.env.PORT || 3001
server.listen(port, () => {
    console.log('Server is running on port ' + port)
})

module.exports = server;