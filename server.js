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
        //console.log(response.text);
        //=> I speak English 
        //console.log(response.from.language.iso);
        let send = {
            isSuccess: true,
            message: response.text
        }
        res.send(send)
        //=> nl 
    }).catch(err => {
        // console.error(err);
        let send = {
            isSuccess: false,
            error: err,
            message: ''
        }
        res.send(send)
    });
})

app.listen(port, () => {
    console.log(`Starting node on port => ${port}`)
})