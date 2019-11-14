const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?proximity=-70.1,40.78375&access_token=pk.eyJ1IjoiaGFzaGltNTQiLCJhIjoiY2syaWIxY2diMGl2dTNicWV3YzkxMXFsaCJ9.qWvUY-Vbzk2tBHiM1V8XTw&limit=1'
    request ({ url , json:true }, (error, {body})=> {
        if(error) {
            callback('Unable to connect', undefined) 
        } else if (body.features.length === 0){
            callback('Unable to find the service', undefined) 
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode