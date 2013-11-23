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
        window.data = data;
        for(var i = 0; i < 2; i++){
          var newHTML = $(_.getTemplate("check-ins")(data));
          $(".attendees").prepend(newHTML);
        };
      }
    },

    waterfall: function(e){
      e.preventDefault();
      toggleAnimationButton();
      $(".main-content").css({
        height: window.innerHeight - 20
      });
      $(".attendees").css({
        position: "fixed",
        bottom: 20
      });

      setTimeout(rotateAttendees, 1000);
    }
  }

var animating = false;

var toggleAnimationButton = function(){
  if(animating){
    $(".animate").off("click", stopWaterfall);
    $(".animate").on("click", init.waterfall);
    $(".animate").text("Animate!");
    animating = false;
  }else{
    $(".animate").off("click", init.waterfall);
    $(".animate").on("click", stopWaterfall);
    $(".animate").text("Stop Animation!");
    animating = true;
  }
}

var stopWaterfall = function(){
  toggleAnimationButton(true);
}

var rotateAttendees = function(){
  if($("attendees").find("follow-attendee").length > 9){
    for(var i = 0; i < 2; i++){
      var attendeeBlock = $(".attendees").find(".follow-attendee")[0]
      $(attendeeBlock).remove();
      $(".attendees").append(attendeeBlock);
    }
  
    $(".attendees").css({
      bottom: -222
    })
    $(".attendees").animate({
      bottom: 20
    },{
      duration: 1000,
      complete: function(){
        setTimeout(rotateAttendees, 2000);
        console.log("reset!")
      }
    }) 
  }
}

})();