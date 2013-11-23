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
          success: function(data){
            if(data.atEvent){
              // alert("Welcome to Austin on Rails!");
            }else{
              alert("Sorry you're not at the event yet!");
            }
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

      $("#event_date").val(moment().format("l"))
    },

    msnry: [],

    masonry: function(container){
      for(var i = 0; i < container.length; i++){
        init.msnry.push(new Masonry( container[i], {
          columnWidth: $('.grid-sizer')[0],
          gutter: 10,
          itemSelector: ".brick"
        }))
        init.msnry[init.msnry.length - 1].layout();
      }
    },

    addUser: function(data){
      if(data){
        for(var i = 0; i < 12; i++){
          var newHTML = $(_.getTemplate("check-ins")(data));
          $(".attendees").prepend(newHTML);
        };
      }
    },

    waterfall: function(e){
      e.preventDefault();
      console.log("hello!")
      $(".main-content").css({
        height: window.innerHeight - 20
      });
      $(".attendees").css({
        position: "fixed",
        bottom: -100
      });
    }
  }
})();