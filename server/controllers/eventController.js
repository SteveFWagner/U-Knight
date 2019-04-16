module.exports ={
    getEvents: (req,res) =>{
        const db = req.app.get('db')
        db.Events.get_events()
        .then(data => {
            res.status(200).send(data)
        }).catch(err => console.log(err))
    },
    submitForm: (req, res) => {
        console.log(req.body)
      const {title, category, description, start_date, end_date, address, zipcode} = req.body
        const db = req.app.get('db')
        db.Events.submit_form(title, category, description, start_date, end_date, address, zipcode).then(resp => {
          res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
        console.log('does stuff')
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
        console.log(id)
        db.Events.get_event_host(id)
        .then(data => {
            res.status(200).send(data)
        }).catch(err => console.log(err))
    }
}