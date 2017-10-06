let app = require('express')();
const port = process.env.PORT || 3335;
const bodyParser = require('body-parser')
const translate = require('google-translate-api');
const cors = require('cors')
const mobileDetect = require('mobile-detect')

app.use(cors());
app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.send('Hi!! Belinda.')
})

app.post('/api/translate', (req, res) => {
    let lang = req.body.lang? req.body.lang : 'en'
    translate(req.body.message, {to: lang}).then(response => {
        //console.log(response.text);
        //console.log(response.from.language.iso);
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

app.get('/api/generateQRInstallOrLogIn', (req, res) => {
    md = new mobileDetect(req.headers['user-agent'])
    // console.log(req.query)
    // console.log(md.os())
    let url;
    switch(md.os()) {
        case 'iOS':
            url = 'https://itunes.apple.com/app/handigo/id1259808783'
        break
        case 'AndroidOS':
            url = 'https://play.google.com/store/apps/details?id=com.socket9.handigo2&hl=th'
        break
        default:
            url = 'http://handigo.run/'
        break
    }
    
    res.writeHead(301,
        {Location: url}
      );

    res.end()
    //res.send({ path: url, os: md.os() })
})

app.listen(port, () => {
    console.log(`Starting node on port => ${port}`)
})