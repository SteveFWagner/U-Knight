module.exports ={
    getEvents: (req,res) =>{
        const db = req.app.get('db')
        db.Events.get_events().then(res => {
            console.log(res)
        })
    },
    submitForm: (req, res) => {
        // const db = req.app.get('db')
        // db.Events.submitForm().then(resp => {
        //   res.status(200).send(resp)
        // })
        console.log('does stuff')
    }
}