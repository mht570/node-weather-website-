const express = require('express');
const path = require('path');

const hbs = require('hbs');

const geocode = require('./utils/geocode');

const forcast = require('./utils/forcast');

const app=express()

const port=process.env.PORT || 3000


//define paths for express config
const public_dir_path=path.join(__dirname,'../public')
const viewsPath =path.join(__dirname,'../templates/views')
const partialsPath =path.join(__dirname,'../templates/partials')

//setup handelers engine and views location

app.set('view engine','hbs')
app.set('views',viewsPath)

hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(public_dir_path))

app.get('',(req,res)=>{
  res.render('index',{
    title:'Weatherpp ',
    name: 'Mohit'

  })
})

app.get('/help',(req,res)=>{
  res.render('help')
})

app.get('/about',(req,res)=>{
  res.render('about')
})

app.get('/weather',(req,res)=>{

  if(!req.query.address){
    return res.send({
      error:"you must provide an address"
    })
  }



  geocode(req.query.address,(error,{latitude,longitude,location}={})=>{

    if(error){
      return res.send({error})
    }

    forcast(latitude,longitude,(error,forcastdata)=>{
      if(error){
        return res.send({error})
      }

      res.send({
        forcast:forcastdata,
        location:location,
        address:req.query.address
      })
    })

  })

})


app.get('*',(req,res)=>{
  res.send('My 404 page')
})

app.listen(port,()=>{
  console.log('server started to'+port);
})
