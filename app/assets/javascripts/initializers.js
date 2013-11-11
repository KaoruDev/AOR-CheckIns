(function(){
  window.init = {
    pinpoint: function(event_id, user_id){

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
          success: function(){
            
          }
        })
      });
    },

    eventList: function(data){
      $("#event_date").datepicker({
        // minDate: 0
      });

      $(".add-event").on("click", function(e){
        e.preventDefault();
        $("#myModal").foundation("reveal", "open");
      });

      $(".close-modal").on("click", function(e){
        e.preventDefault();
        $("#myModal").foundation("reveal", "close");
      });
    },

    masonry: function(container){      
      for(var i = 0; i < container.length; i++){
        init.msnry = new Masonry( container[i], {
          columnWidth: 300,
          gutter: 10,
          itemSelector: ".event-details"
        })
        msnry.layout();
      }
    },

    addUser: function(data){
      if(data){
        var newHTML = _.getTemplate("bricks")(data);
        $(".attendees").prepend(newHTML);

        init.msnry.prepended(newHTML);
      }
    }
  }
})();