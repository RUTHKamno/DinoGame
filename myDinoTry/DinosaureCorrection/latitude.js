import {meteo} from './weather.js'

export function geoFindMe() {

    /*const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');
    
   
    mapLink.textContent = '';
  */
    let mapLink;
    function success(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      
      mapLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      
      console.log(latitude, longitude)
      meteo(latitude, longitude)
    }
  
    function error() {
     console.log("enable to catch your position")
    }
  
    if (!navigator.geolocation) {
     
    } else {
      
      navigator.geolocation.getCurrentPosition(success, error);
    }
   
  }
  
  