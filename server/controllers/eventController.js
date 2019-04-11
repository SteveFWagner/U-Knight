module.exports = {
  getEvents: (req, res) => {
    const db = req.app.get('db')
    db.Events.get_events()
      .then(data => {
        res.status(200).send(data)
      }).catch(err => console.log(err))
  },
  submitForm: (req, res) => {
    console.log(req.body)
    const { title, category, description, start_date, end_date, address, zipcode } = req.body
    const db = req.app.get('db')
    db.Events.submit_form(title, category, description, start_date, end_date, address, zipcode).then(resp => {
      res.status(200).send(resp)
    }).catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
    console.log('does stuff')
  },
  s3Upload: (req, res) => {
    const {S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env
    const aws = require('aws-sdk')
    aws.config = {
      region: 'us-west-1',
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    }
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
  }
}