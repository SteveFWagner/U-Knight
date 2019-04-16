require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
const session = require('express-session')

const pg = require('pg')
const pgSession = require('connect-pg-simple')(session)


const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

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
    app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`))
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

//Events
    app.get('/api/events',eCt.getEvents)
    app.post('/api/submitForm',eCt.submitForm)
    app.get('/api/event/:id', eCt.getEvent)
    app.get('/api/event/host/:id', eCt.getEventHost)

//Messages


