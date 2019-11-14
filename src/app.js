const express = require ('express')
const path = require ('path')
const hbs = require ('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express ()

console.log(__dirname)
//Define paths for express configs
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//setup handle bars engine and views
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res)=> {
    res.render('index', {
        title: 'Weather App',
        name: 'Hashim'
    })
})

app.get('/help', (req, res)=> {
    res.render('help', {
        title: 'Help',
        msg: 'Thanks for asking for help. We will try our best',
        name: 'Hashim'
    })
})

app.get('/about', (req, res)=> {
    res.render('about', {
        title: 'About',
        name: 'Hashim'
    })
})

//app.use(express.static(publicDirectoryPath))
app.get('/weather', (req, res)=> {
    if(!req.query.address){
      return res.send({
            error: 'Please provide an address query'
        })
    }
    const location = req.query.address
    geocode (location, (error,{location, longitude, latitude}={}) => {
        if(error) {
            return res.send({error})
        }
        forecast(longitude,latitude, (error, forecastData)=> {     
            if(error){
                return res.send({error})
            }        
            res.send({
                location,
                forecastData
                })
        })
    })
})

app.get('/products', (req, res)=> {
    if(!req.query.search){
    return res.send({
            error: 'You must provide a search'
        })
    } 
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=> {
        res.render('404', {
            title: '404 error',
            error: 'Help article not found',
            name: 'hashim'
        })
    })
    
app.get('*', (req, res)=> {
    res.render('404', {
        title: '404 error',
        error: 'Page not found',
        name: 'hashim'
    })
})


app.listen(3000, ()=> {
    console.log('Server is up and running')
})