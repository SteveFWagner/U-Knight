const stripe = require('stripe')(process.env.STRIPE_SECRET)

module.exports = {
    getEvents: (req, res) => {
        const db = req.app.get('db')
        db.Events.get_events()
            .then(data => {
                res.status(200).send(data)
            }).catch(err => console.log(err))
    },
    submitForm: (req, res) => {
        const { title, category, description, start_date, end_date, address, zipcode, dropzone, user_id } = req.body
        const db = req.app.get('db')
        db.Events.submit_form(title, category, description, start_date, end_date, address, zipcode, dropzone, user_id).then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },
    getEvent: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.Events.get_event(id)
        .then(data => {
            res.status(200).send(data)
        }).catch(err => console.log(err))
    },
    getEventHost: (req,res) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.Events.get_event_host(id)
        .then(data => {
            res.status(200).send(data)
        }).catch(err => console.log(err))
    },
    s3Upload: (req, res) => {
        const { S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env
        const aws = require('aws-sdk')
        aws.config = {
            region: 'us-west-1',
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY}
            const s3 = new aws.S3()
        const fileName = req.query[ 'file-name' ]
        const fileType = req.query[ 'file-type' ]
        const s3Params = {
                Bucket: S3_BUCKET,
                Key: fileName,
                Expires: 60,
                ContentType: fileType,
                ACL: 'public-read',
            }
        s3.getSignedUrl('putObject', s3Params, (err, data) => {
                if (err) {
                    console.log(err)
                    return res.end()
                }
                const returnData = {
                    signedRequest: data,
                    url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
                }

                return res.send(returnData)
            })
        },
        signup: (req,res) =>{
            const db = req.app.get('db')
            const {event_id, user_id} = req.body

            db.Events.attending_users(event_id)
            .then(attendingUsers => {
                let existingUser = false
                attendingUsers.forEach(user => {
                    if(user.user_id === user_id){
                        existingUser = true
                    }
                })
                if(existingUser === true){
                    return res.status(200).send('You have already signed up for this event!')
                }else{
                    db.Events.signup(event_id,user_id)
                    .then(resp => {
                        res.status(200).send('You are signed up!')
                    }).catch(err => console.log(err))
                }
            })

            
        },
        attendingUsers: (req,res) => {
            const db = req.app.get('db')
            const {id} = req.params
            db.Events.attending_users_info(id)
            .then(resp => {
                res.status(200).send(resp)
            })

        },
        handlePayment: (req,res) => {
            const db = req.app.get('db')
            const {amount, token:{id}, eventId, userId} = req.body
            stripe.charges.create({
                amount,
                currency:'usd',
                source: id,
                description:"U-Knight Test"
            },
            (err,charge) => {
                if(err){
                    console.log(err)
                    return res.status(500).send(err)
                }else{
                    console.log(charge)
                    db.Events.update_event_paid(eventId, userId, amount)
                    .then(resp => {
                        return res.status(200).send(charge)
                    })
                    .catch(error => console.log(error))
                }
            }
            )
        }

    }
