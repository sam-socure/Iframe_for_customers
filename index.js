const express = require('express');
const ejs = require('ejs');
const axios = require('axios');

const path = require('path')
const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index')
})


//handle the registration post request
app.post('/fetchUrl', async (req, res) => {

    const socureEndpoint = 'https://service.socure.com/api/3.0/documents/request';
    const idPlusKey = 'SocureApiKey socure_id_plus_key';

    try{
      const response = await axios.post(
        socureEndpoint,
        {
            verificationLevel: 2
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': idPlusKey
            }
        });
        //Api returns URL
        const url = response.data.data.url
        console.log(url)

        res.render('iframe', { url });
    } catch (error) {
        console.error('error in registration', error);
        res.status(500).json({ error: 'failed to register'})
    }

})

const port = 8000;
app.listen(port, () => {
    console.log(`server is running on ${port}`)
})