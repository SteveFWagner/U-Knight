module.exports ={
    getEvents: (req,res) =>{
        const db = req.app.get('db')
        db.Events.get_events().then(res => {
            console.log(res)
        })
    }
}