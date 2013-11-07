(function(){
  window.init = {
    geoLocation: function(event_id, user_id){
      var currentCoords = {}

      navigator.geolocation.getCurrentPosition(function(pos){
        currentCoords.longitude = (pos.coords.longitude);
        currentCoords.latitude = (pos.coords.latitude);

        $.ajax({
          url: "event/event_id/check-in/user_id"
          type: "POST"
        })

        if(check_if_user_is_nearby(currentCoords, coordinates)){
          $(".check-in").append(check_in_link);
        }

      });
    }
  }

  var check_if_user_is_nearby = function(currentCoords, coordinates){
    var radius = 6371 //Earth's radius km
      , dLon = toRad((coordinates.longitude - currentCoords.longitude))
      , dLat = toRad((coordinates.latitude - currentCoords.latitude))
      , lat1 = toRad(currentCoords.latitude)
      , lat2 = toRad(coordinates.latitude)
      , a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2)
      , c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
      , d = radius * c * 1000
    ;

    // Check if user is within 30 meters of address.
    if(d < 31){
      alert("Great you're checked in!")
      return true
    }else{
      alert("Sorry you're not at the event yet!")
    }
  }

  var toRad = function(number){
    return number * (Math.PI / 180)
  }

})();