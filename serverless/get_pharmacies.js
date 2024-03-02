require('dotenv').config();
const axios = require("axios");

const { REACT_APP_COLLECTAPI_KEY } = process.env;

exports.handler = async (event, context) => {
    const params = JSON.parse(event.body);
    const { city } = params;
    try {
        const response = await axios.get(`https://api.collectapi.com/health/dutyPharmacy?il=${city}`, {
            headers: {
              "authorization": "apikey 7kPhSChk7o0n9aDH4DLENR:5wv5KQr6IiwafrRJT3P6u1",
              "content-type": "application/json"
            }
        });
        return {
            statusCode: 200,
            body: JSON.stringify(response.data)
        };
    } catch (err) {
        return { statusCode: 422, body: err.stack };
    }
    

}