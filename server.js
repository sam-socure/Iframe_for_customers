const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const socureEndpoint = 'https://service.socure.com/api/3.0/documents/request';
const idPlusKey = 'SocureApiKey id_plus_key';

const axiosInstance = axios.create({
    baseURL: socureEndpoint,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': idPlusKey,
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15A372 Safari/604.1'
    }
});

// Handle the registration POST request
app.post('/api/register', async (req, res) => {
    try {
        console.log('req.body', req.body);
        const { name, phoneNumber } = req.body;

        // Make post request to Socure
        const response = await axiosInstance.post('', {
            verificationLevel: 2,
            firstName: name,
            mobileNumber: phoneNumber
        });

        const url = response.data.data.url;  // Retrieve URL from Socure's response
        console.log(url);

        res.json({ url });
    } catch (error) {
        console.error('error in registration', error);
        res.status(500).json({ error: 'failed to register' });
    }
});

const port = 8080;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
