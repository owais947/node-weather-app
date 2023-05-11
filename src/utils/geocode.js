const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2F5ZWQtb3dhaXMtYWxpIiwiYSI6ImNsZ3hqeHAyYzAwNnEzZnA0ZjBtcnN6eW4ifQ.Ysi_S_kzk3E9NmvHYVxR9Q'

    request({url : url, json : true}, (error, response) => {
        if(error) {
            callback("Error while connecting...", undefined)
        } 
        else if(response.body.features.length === 0) {
            callback('No matching result...', undefined)
        } 
        else {
            callback(undefined, {
                longitude : response.body.features[0].center[0],
                latitude : response.body.features[0].center[1],
                location : response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode