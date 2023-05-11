const request = require('postman-request')

const getWeather = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6ebbe9c16e07eba08985d1f93e03cd0c&query=' + longitude + ',' + latitude+'units=s'

    request({url : url, json : true}, (error, response) => {
        if(error) {
            callback('Unable to connect...', undefined)
        }
        else if(response.body.error) {
            callback('Try another location...', undefined)
        }
        else {
            callback(undefined, {
                temperature : response.body.current.temperature,
                description : response.body.current.weather_descriptions
            })
        }
    })
}

module.exports = getWeather