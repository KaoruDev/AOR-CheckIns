(function(){
  var animating = false;

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
        var newHTML = $(_.getTemplate("check-ins")(data));
      
        if(iswaterfallActive()){
          $(".attendees").prepend(newHTML);
          readyBlock();
          animateBlock();
          timer.activate();
        }else if(animating){

        }else{
          $(".attendees").prepend(newHTML);
        }
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
        top: 20
      });

      timer.activate();
    }
  }

  var timer = {
    activate: function(){
      this.cancel();
      this.timeoutID = window.setTimeout(rotateAttendees, 3000);
    },
    cancel: function(){
      if(typeof this.timeoutID == "number"){
        window.clearTimeout(this.timeoutID);
        delete this.timeoutID;
      }
    }
  }

  var stopWaterfall = function(){
    toggleAnimationButton();
    $(".main-content").css({
      height: "100%"
    });
    $(".attendees").css({
      position: "static"
    });
  }

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

  var rotateAttendees = function(){
    if(iswaterfallActive()){
      // readyBlock();
      for(var i = 0; i < 2; i++){
        var attendeeBlock = $(_.last($(".attendees").find(".follow-attendee"))).clone();
        $(".attendees").prepend(attendeeBlock);
      }

      // animateBlock();
      timer.activate();

      
    }else if(animating){
      timer.activate();
    }

  }

  var readyBlock = function(){
    $(".attendees").css({
      top: -444
    });
  }

  var animateBlock = function(){
    animating = false;
    $(".attendees").animate(
      {
        top: 20
      },

      {
        duration: 500,
        complete: function(){
          for(var i = 0; i < 2; i++){
            $(_.last($(".attendees").find(".follow-attendee"))).remove();
          }
          animating = true;
        }
      }
    )
  }


/////////////////////  
//
//   HELPER FUNCTIONS
//
//////////////////////


  var waterfallActive = false;

  var iswaterfallActive = function(){
    if(waterfallActive){
      return true;
    }else if(window.innerHeight + 222 < $(".attendees").height() && animating){
      waterfallActive = true;
      return true;
    }else{
      return false;
    }
  }

})();