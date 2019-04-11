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
      const {title, category, description, start_time, end_time, address, date, zipcode} = req.body
        const db = req.app.get('db')
        db.Events.submit_form(title, category, description, start_time, end_time, address, date, zipcode).then(resp => {
          res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(resp)
        })
        console.log('does stuff')
    }
}