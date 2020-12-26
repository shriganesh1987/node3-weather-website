const request = require('postman-request')

const geocode = (address, callback) => {
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2hyaWdhbmVzaDE5ODciLCJhIjoiY2tpcnZ6dW1hMHJoMzJ4bDNvY2NyYm9oZiJ9.EI21mlg6TT3frXtXp1LDKQ&limit=1'
    
    //url is written as shorthand
    //body is destructured
    request({ url, json: true}, (error, { body }) => {

    if(error)
    {
        callback('Unable to connect to location services!', undefined)
    }
    else if(body.features.length === 0)
    {
        callback('Unable to find location! Try another address.', undefined)
    }
    else {
        const longitude = body.features[0].center[1]
    
        // latitude comes from the second item of center array
        const latitude = body.features[0].center[0]
        const location = body.features[0].place_name
    
        callback(undefined, {
            latitude: latitude,
            longitude: longitude,
            location: location
        })
    }
})
}

module.exports = geocode