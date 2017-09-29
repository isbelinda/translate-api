let app = require('express')();
const port = process.env.PORT || 3335;
const bodyParser = require('body-parser')
const translate = require('google-translate-api');

app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.send('Hi!! Belinda.')
})

app.post('/api/translate', (req, res) => {
    let lang = req.body.lang? req.body.lang : 'en'
    translate(req.body.message, {to: lang}).then(response => {
        console.log(response.text);
        console.log(response.from.language.iso);
        let send = {
            Status: 200,
            Message: "Success",
            data: {
                message: response.text
            }
        }
        res.send(send)
        
    }).catch(err => {
        let send = {
            Status: 400,
            Message: err,
            data: {}
        }
        res.send(send)
        
    });
})

app.post('/api/GetCodeLanguage',(req, res) => {
    let message = req.body.message
    translate(message).then(response => {
        let send = {
            Status: 200,
            Message: "Success",
            data: {
                code: response.from.language.iso
            }
        }
        res.send(send)
    }).catch(err => {
        let send = {
            Status: 400,
            Message: err,
            data: {}
        }
        res.send(send)
    })
})

app.listen(port, () => {
    console.log(`Starting node on port => ${port}`)
})