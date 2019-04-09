const bcrypt = require('bcryptjs') 

module.exports = {
    register: async (req, res) => {
        const { email, password, username, image } = req.body;
        const { session } = req;
        const db = req.app.get('db');
        let takenEmail = await db.check_email({email})
        
        takenEmail = takenEmail[0]

        let takenUserName = await db.check_username({username})

        takenUserName = takenUserName[0]

        if(takenEmail) {
            return res.status(409).send("Email is already in use")
        }

        if(takenUserName){
            return res.status(409).send("Username has already been taken")
        }

        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password ,salt);
        let user = await db.register({ email, password: hash, username, image })
        user = user[0]
        session.user = user
        res.status(200).send(session.user)
    },
    login: async ( req, res ) => {
        const { email, password } = req.body
        const { session } = req
        const db = req.app.get('db')
        
        let user = await db.login({email})

        user = user[0]
        
        if(!user) {
            res.status(401).send('There is no user found with the email submitted.')
        }
        
        let authenticated = bcrypt.compareSync( password, user.password )
        if(authenticated){
            delete user.password
            session.user = user
            res.status(200).send(session.user)
        } else {
            res.status(401).send('Incorrect password')
        }
    },
    getUser: async ( req, res ) => {
        const { user } = req.session
        if(user){
            res.status(200).send(user)
        } else {
            res.sendStatus(409)
        }
    },
    Logout: ( req, res ) => {
        req.session.destroy(function() {
            res.sendStatus(200)
        });
    }
}