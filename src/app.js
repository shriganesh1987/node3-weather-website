//keep core modules before express modules just to stay organized.
const path = require('path')
const express = require('express')
//partials
const hbs = require('hbs')
const { title } = require('process')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//core node module called path
//cross os compatible. check for nodejs docs 'path' for more info
// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
//tell express which templating engine is installed.
//express expects its views(in this case hbs) live in a root of the project, specific folder called "views"
//if you want to customize the path, use app.set('views', viewsPath)
app.set('view engine', 'hbs')
app.set('views', viewsPath)
//using partials
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(publicDirectoryPath))


//calls index.hbs
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Shriganesh Damle'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Shriganesh Damle'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is some helpful text.',
        title: 'Help',
        name: 'Shriganesh Damle'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=> {
        if(error)
        {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error)
            {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
          })
    })

    // res.send({
    //     location: 'bangalore',
    //     forecast: 'Its cold!',
    //     address: req.query.address
    // })
})
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', { 
        message: 'Help article not found',
        title: 'Error',
        name: 'Shriganesh Damle'
    })
})

//this has to come at last, just before app.listen
app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found',
        title: 'Error',
        name: 'Shriganesh Damle'
    })
})

//development environment port 3000(optional, any port can be used)
//Usually, in production server, port 80 is used.
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})