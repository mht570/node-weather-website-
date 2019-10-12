const request = require('request');
const geocode = require('./geocode')




const forcast=(latitude,longitude,callback)=>{

url='https://api.darksky.net/forecast/f9c4424dee8ff128b58e522aa70bd24e/'+latitude+','+longitude+'?units=si'



request({url:url,json:true},(error,response)=>{
  if (error){
    callback('unable to connect weather services',undefined);
  }else if(response.body.error){
    callback('unbale to find location',undefined);
  }
  else{
  callback(undefined,response.body.daily.data[0].summary+'It is currently '+response.body.currently.temperature+' degress out. there is  a '+response.body.currently.precipProbability+'% chance of rain')
  }

})

}


// forcast(-75.7088,44.1545,(error,data)=>{
//   console.log(error);
//   console.log(data);
// })



module.exports=forcast
