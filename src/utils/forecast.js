const request = require('postman-request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=33582a88169fed43bfa47bb518179c38&query=' + latitude + ',' + longitude + '&units=m'

    //url is written as shorthand
    //body is destructured
    request({ url, json: true}, (error, { body }) => {

        if(error)
        {
            callback('Unable to connect to the weather service')
        }
        else if(body.error)
        {
            callback('Unable to find location')
        }
        else
        {
            callback(undefined, body.current.weather_descriptions[0] + '. It currently '
            + body.current.temperature +' degrees out. It feels like '+ body.current.feelslike 
            + ' degrees out.' + ' The humidity is ' + body.current.humidity + '%.')
        }
    })
}

module.exports = forecast