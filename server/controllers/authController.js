const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const { email, password, username, image } = req.body;
        const { session } = req;
        const db = req.app.get('db');
        let takenEmail = await db.Auth.check_email({ email })


        takenEmail = takenEmail[0]

        if (takenEmail) {
            return res.sendStatus(409)
        }

        let takenUsername = await db.Auth.check_username({ username })

        takenUsername = takenUsername[0]

        if (takenUsername) {
            return res.status(409).send('username is already in use')
        }
        let salt = bcrypt.genSaltSync();
        let hash = bcrypt.hashSync(password, salt);
        let user = await db.Auth.register({ email, password: hash, image, username })
        user = user[0]
        session.user = user
        res.status(200).send(session.user)
    },
    login: async (req, res) => {
        const { email, password } = req.body
        const { session } = req
        const db = req.app.get('db')

        let user = await db.Auth.login({ email })


        user = user[0]
        if (!user) {
            return res.sendStatus(401)
        }
        let authenticated = bcrypt.compareSync(password, user.password)
        if (authenticated) {
            delete user.password
            session.user = user
            res.status(200).send(session.user)
        } else {
            return res.status(401).send('Incorrect password')
        }
    },
    getUser: async (req, res) => {
        const { user } = req.session
        if (user) {
            res.status(200).send(user)
        } else {
            res.sendStatus(409)
        }
    },
    Logout: (req, res) => {
        req.session.destroy(function () {
            res.sendStatus(200)
        });
    },
    account: async (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params;
        let account = await db.Auth.get_account({ id })
        res.status(200).send(account)
    },
    hosted: async (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params
        let hosted = await db.Auth.hosted({ id })
        res.status(200).send(hosted)
    },
    attended: async (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params
        let attended = await db.Auth.events_attended({ id })
        res.status(200).send(attended)
    },
    updateProfile: async (req, res) => {
        const db = req.app.get('db')
        const { username, bio, image } = req.body
        const { id } = req.params

        let takenUsername = await db.Auth.check_username({ username })

        takenUsername = takenUsername[0]


        if (takenUsername) {
            if (takenUsername.user_id === Number(id)) {
                let update = await db.Auth.update_user({ id, username, bio, image })
                return res.status(200).send(update)
            }
            return res.status(409).send('username is already in use')
        }
        let update = await db.Auth.update_user({ id, username, bio, image })
        res.status(200).send(update)
    }
}