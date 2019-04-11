const bcrypt = require('bcryptjs') 

module.exports = {
    register: async (req, res) => {
        const { email, password, username } = req.body;
        const { session } = req;
        const db = req.app.get('db');
        let takenEmail = await db.Auth.check_email({email})
        

        takenEmail = takenEmail[0]

        if(takenEmail) {
            return res.sendStatus(409)
        }
        // let salt = bcrypt.genSaltSync();
        // let hash = bcrypt.hashSync(password ,salt);
        console.log({password})
        let user = await db.Auth.register({ email, password, username})
        user = user[0]
        session.user = user
        res.status(200).send(session.user)
    },
    login: async ( req, res ) => {
        const { email, password } = req.body
        const { session } = req
        const db = req.app.get('db')
        
        let user = await db.Auth.login({email})
        
        
        user = user[0]
        if(!user) {
           return res.sendStatus(401)
        }
        let authenticated = bcrypt.compareSync( password, user.password )
        if(authenticated){
            delete user.password
            session.user = user
            res.status(200).send(session.user)
        } else {
           return res.status(401).send('Incorrect password')
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