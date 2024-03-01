const fetch = require("node-fetch");

const { REACT_APP_COLLECTAPI_KEY } = process.env;

exports.handler = async (event, context) => {
    const param = JSON.parse(event.body);
    const { city } = params;
    try {
        const response = await fetch(`https://api.collectapi.com/health/dutyPharmacy?il=${city}`, {
            headers: {
              "authorization": process.env.REACT_APP_COLLECTAPI_KEY,
              "content-type": "application/json"
            }
        });
        const responseJson = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(response)
        };
    } catch (err) {
        return { statusCode: 422, body: err.stack };
    }
    

}