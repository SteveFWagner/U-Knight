require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const socket = require('socket.io')
const massive = require('massive')
const session = require('express-session')

const pg = require('pg')
const pgSession = require('connect-pg-simple')(session)


const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY  } = process.env

const app = express();

const pgPool = new pg.Pool({
    connectionString: CONNECTION_STRING
})

app.use(bodyParser.json())
app.use(session({
    store: new pgSession({
        pool: pgPool
    }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 100000
    }
}))


massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('Database connected')
})

//Sockets

const io = socket(app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`)))

io.on('connection', function(socket){
    socket.on('joinRoom', async (roomName) => {
        const db = app.get('db')
        socket.join(roomName)
        let event_id = roomName
        let messages = await db.Sockets.get_message_history({event_id})
        socket.emit('sendMsg', messages)
    })
    socket.on('leaveRoom', function(roomName){
        socket.leave(roomName)
    })
    socket.on('sendMsg', async (data) => {
        const { user_id, message, event_id, username } = data
        const db = app.get('db')
        await db.Sockets.create_message({user_id, message, event_id , username})
        let messages = await db.Sockets.get_message_history({event_id})
        io.to(data.event_id).emit('sendMsg', messages)
    })
    socket.on('username', async (username) => {
        const db = app.get('db')
        let takenUsername = await db.Auth.check_username({ username })
        takenUsername = takenUsername[0]
        if (takenUsername) {
            return socket.emit('username', true)
        } else {
            return socket.emit('username', false)
        }
    })
})


//Sockets

//Controllers
const eCt = require('./controllers/eventController')
const ctrlUser = require('./controllers/authController')


//ENDPOINTS
//Auth
    app.post('/auth/register', ctrlUser.register);
    app.post('/auth/login', ctrlUser.login);
    app.get('/auth/checkuser', ctrlUser.getUser);
    app.post('/auth/logout', ctrlUser.Logout);
    app.get('/api/account/:id', ctrlUser.account);
    app.get('/api/hosted/:id', ctrlUser.hosted);
    app.get('/api/attended/:id', ctrlUser.attended);
    app.put('/api/user/:id', ctrlUser.updateProfile);

//Events
    app.get('/api/events',eCt.getEvents)
    app.post('/api/submitForm',eCt.submitForm)
    app.get('/api/event/:id', eCt.getEvent)
    app.get('/api/event/host/:id', eCt.getEventHost)
    app.post('/api/event/signup', eCt.signup)
    app.get('/api/event/attending/:id', eCt.attendingUsers)

//Messages

// Dropzone

app.get('/api/signs3', eCt.s3Upload)
