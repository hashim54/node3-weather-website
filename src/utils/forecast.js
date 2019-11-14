const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url ='https://api.darksky.net/forecast/5cd74e21e0c16fb31434678d33c75e0b/'+longitude+','+latitude+'?units=us&lang=en'
    request({ url, json: true}, (error, {body}) => {   
    if(error) {
            callback('Unable to connect', undefined) 
        } 
        else if (body.error) {
            callback('Unable to find the location', undefined) 
        }
        else {
            callback(undefined, body.daily.data[0].summary)
            }
})
}
module.exports = forecast