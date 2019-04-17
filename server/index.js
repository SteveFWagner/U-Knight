require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
const session = require('express-session')
const socket = require('socket.io')

const pg = require('pg')
const pgSession = require('connect-pg-simple')(session)

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env

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
        maxAge: 1800000
    }
}))


massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('Database connected')

    const io = socket(app.listen(SERVER_PORT, () => console.log(`listening on ${SERVER_PORT}`)))
    io.on('connection', (client) => {
        client.on('joinRoom', (roomName) => {
            console.log(roomName)
            client.join(roomName)
        })
        client.on('leaveRoom', (roomName) => {
            client.leave(roomName)
        })
    })
})


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
// app.put('/api/user/:id', ctrlUser.updateProfile);

//Events
app.get('/api/events', eCt.getEvents)
app.post('/api/submitForm', eCt.submitForm)
app.get('/api/event/:id', eCt.getEvent)
app.get('/api/event/host/:id', eCt.getEventHost)

//Messages

// Dropzone

app.get('/api/signs3', eCt.s3Upload)

// Sockets





// app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`))