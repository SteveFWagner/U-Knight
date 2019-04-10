module.exports ={
    getEvents: (req,res) =>{
        const db = req.app.get('db')
        db.Events.get_events()
        .then(data => {
            res.status(200).send(data)
        }).catch(err => console.log(err))
    },
    submitForm: (req, res) => {
        // const db = req.app.get('db')
        // db.Events.submitForm().then(resp => {
        //   res.status(200).send(resp)
        // })
        console.log('does stuff')
    }
}