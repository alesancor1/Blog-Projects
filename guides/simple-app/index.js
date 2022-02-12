const express = require('express')
const mongoose = require('mongoose')
const Log = require('./models/Log')
const app = express()

const port = process.env.PORT || 32000
const mongoHost = process.env.DB_HOST || "localhost";
const mongoPort = process.env.DB_PORT || "27017";
const mongoDBName = process.env.DB_NAME || 'simple-db';
const mongoURL = `mongodb://${mongoHost}:${mongoPort}/${mongoDBName}`;

app.get('/', (req, res) => {
    let newLog = new Log({
        timestamp: new Date(),
        useragent: req.get('User-Agent') || 'Unknown'
    })
    newLog.save().then(() => {
        Log.find({}).exec().then(logs => res.send(logs)).catch(() => res.status(500).send('Server error'))
    }).catch(err => {
        console.log(err)
        res.status(500).send('Unknown error')
    })
})

mongoose.connect(mongoURL).then( resp => {
    app.listen(port, () => {
        console.log(`Connected! Simple app listening on port ${port}`)
    })
}).catch(() => console.log("Could not connect to db"))