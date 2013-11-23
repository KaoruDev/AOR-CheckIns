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
          columnWidth: '.grid-sizer',
          gutter: 10,
          itemSelector: ".brick"
        }))
        init.msnry[init.msnry.length - 1].layout();
      }
    },

    addUser: function(data){
      window.data = data;
      for(var i = 0; i < 4; i++){
        if(data && animating){
          init.msnry[0].prepended(addAttendee(data));
        }else if(data){
          addAttendee(data);
        }
      }
    },

    waterfall: function(e){
      e.preventDefault();
      init.masonry($(".attendees"));

      init.msnry[0].on('removeComplete', function(msnryInstance, removedItems){
        var frag = document.createDocumentFragment();
        elem = removedItems[0].element;
        frag.appendChild(elem);
        $(".attendees").prepend(frag);
        init.msnry[0].prepended(elem);
      });

      toggleAnimationButton();
      $(".main-content").css({
        height: window.innerHeight - 20
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
    init.msnry[0].destroy();
    init.msnry = [];
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
      var attendeeBlock = $(_.last($(".attendees").find(".follow-attendee")))[0];
      init.msnry[0].remove(attendeeBlock);

    }else if(animating){
      timer.activate();
    }

  }

  // var readyBlock = function(){
  //   $(".attendees").css({
  //     top: -444
  //   });
  // }

  // var animateBlock = function(){
  //   animating = false;
  //   $(".attendees").animate(
  //     {
  //       top: 20
  //     },

  //     {
  //       duration: 500,
  //       complete: function(){
  //         for(var i = 0; i < 2; i++){
  //           $(_.last($(".attendees").find(".follow-attendee"))).remove();
  //         }
  //         animating = true;
  //       }
  //     }
  //   )
  // }


/////////////////////  
//
//   HELPER FUNCTIONS
//
//////////////////////


  var waterfallActive = false;

  var iswaterfallActive = function(){
    return true;
    if(waterfallActive){
      return true;
    }else if(window.innerHeight + 222 < $(".attendees").height() && animating){
      waterfallActive = true;
      return true;
    }else{
      return false;
    }
  };

  var addAttendee = function(data){
    var newHTML = $.parseHTML(_.getTemplate("check-ins")(data))[1]
    var frag = document.createDocumentFragment();
    frag.appendChild(newHTML);
    $(".attendees").prepend(frag);
    return newHTML;
  };

})();