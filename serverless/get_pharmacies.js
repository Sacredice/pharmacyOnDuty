const axios = require("axios");

const {REACT_APP_COLLECTAPI_KEY} = process.env;

exports.handler = async (event, context) => {
    const param = JSON.parse(event.body);
    const { city } = params;
    try {
        const response = await axios(`https://api.collectapi.com/health/dutyPharmacy?il=${city}`, {
            headers: {
              "authorization": process.env.REACT_APP_COLLECTAPI_KEY,
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