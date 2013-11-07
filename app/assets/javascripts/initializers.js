(function(){
  window.init = {
    geoLocation: function(event_id, user_id){

      navigator.geolocation.getCurrentPosition(function(pos){
        var longitude = (pos.coords.longitude);
        var latitude = (pos.coords.latitude);

        $.ajax({
          url: event_id + "/check-in/" + user_id,
          type: "POST",
          data:{
            longitude: longitude,
            latitude: latitude
          },
          success: addUser
        })
      });
    }
  }


  var addUser = function(data){
    var newHTML = _.getTemplate("bricks")(data)
    $(".attendees").append(newHTML);
  }
})();