const express = require('express');
const router = express.Router();
var fs = require("fs");
//var countriesGeoData = require('./server/countries.geo.json');

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/countries', (req,res) => {
  var data = fs.readFileSync("./server/countries2.json");
  var obj = JSON.parse(data);
  res.status(200).send(obj);

});

router.get('/countryGIS/:code', (req,res) => {

  var url=`https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Countries_%28Generalized%29/FeatureServer/0/query?where=iso%3D%27${req.params.code}%27&geometry=&geometryType=esriGeometryPolygon&outFields=*&outSR=4326&f=json`;
  axios.get(url)
    .then((response) => res.status(200).send(response.data))
  
  //var data = fs.readFileSync("./server/countriesSmallGeo.json");
  //var obj = JSON.parse(data);
  //res.status(200).send(obj);
  
  // var alpha3 = req.params.alpha3;
  // var countryGeoData = fs.readFileSync("./server/countriesSmallGeo.json");
  // var geoObj = JSON.parse(countryGeoData);
  // // var selectedCountry = 
  // //   geoObj.features
  // //   .filter((feature) => feature.properties.ISO_A3 == alpha3 )[0];
  // //var geometry = selectedCountry.geometry;
  // res.status(200).send(geoObj);
  // // return selectedCountry;
  // //return countriesGeoData.features
  // //  .filter((feature) => feature.properties.ISO_A3 == alpha3 )[0];
});


module.exports = router;