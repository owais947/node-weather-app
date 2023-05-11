const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const getWeather = require('./utils/getWeather.js')

const app = express()

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to use
app.use(express.static(publicDirectoryPath))


//index page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        dev: 'Owais'
    })
})

//about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        dev: 'Owais'
    })
})

//help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        text: 'Helpful message.',
        dev: 'Owais'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        res.send({
            error : 'Enter a query!'
        })
    }
    else{
        const address = req.query.address

        geocode(address, (error, {longitude, latitude, location} = {}) => {
            if(error){
                res.send({
                    error : 'Error while getting location...'
                })
            }
            else {
                getWeather(longitude, latitude, (error, weatherReport) => {
                    if(error){
                        res.send({
                            error : 'Error while fetching weather'
                        })
                    }
                    else {
                        res.send({
                            weather : 'It is ' + weatherReport.temperature + '*C and '+ weatherReport.description + ' in ' + location
                        })
                    }
                })
            }
        })
    }
})


app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        dev: 'Owais',
        errorText:'Help Article not found'
    })
})

//404
app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        dev: 'Owais',
        errorText: 'Link not found!'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port:3000...')
})