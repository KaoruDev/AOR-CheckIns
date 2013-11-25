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
      // images = [
      //   "http://images4.fanpop.com/image/photos/15400000/Cat-gif-cats-15443764-340-255.gif",
      //   "http://data2.whicdn.com/images/45910412/Peter-Griffin-Gets-A-Little-Dance-Crazy-Family-Guy_large.gif",
      //   "http://www.hdwallpapersplus.com/wp-content/uploads/2013/10/23/funny-gifs-jim-derpy.gif",
      //   "http://4.bp.blogspot.com/-G116XSEP8Cg/UG8pmTQFj8I/AAAAAAAACn0/AhNB9H8OQJs/s1600/raleigh%2Bcorporate%2Bportraits.jpg",
      //   "http://3.bp.blogspot.com/_ieToa1g-APw/TJ7A9jbAivI/AAAAAAAAACA/r-wrYjNkqw0/s1600/jack+nicholson+by+martin+schoeller+2002.jpg",
      //   "http://www.thisiscolossal.com/wp-content/uploads/2012/01/jon-1.jpg",
      //   "http://shechive.files.wordpress.com/2012/05/celeb-portraits-14.jpg?w=500&h=612",
      //   "http://cdn.twentytwowords.com/wp-content/uploads/Pencil-Portraits-of-Celebrities-Hugh-Laurie-634x812.jpg",
      //   "http://i1-news.softpedia-static.com/images/news2/Adam-Levine-to-Be-Named-People-s-Hottest-Man-Alive-for-2013-400531-2.jpg?1384508036"
      // ]
      // for(var i = 0; i < images.length; i++){
        // data.avatar = images[i]
        if(data && animating){
          init.msnry[0].prepended(addAttendee(data));
          init.msnry[0].layout();
        }else if(data){
          addAttendee(data);
        }
      // }
      timer.activate();
    },

    waterfall: function(e){
      e.preventDefault();
      init.masonry($(".attendees"));

      toggleAnimationButton();
      $(".main-content").css({
        height: window.innerHeight - 20,
        width: window.innerWidth - 20,
        position: "fixed"
      });
      timer.activate();
    }
  }

  window.timer = {
    activate: function(){
      this.cancel();
      this.timeoutID = window.setTimeout(rotateAttendees, 4000);
    },
    cancel: function(){
      if(typeof this.timeoutID === "number"){
        console.log("clear timeout")
        window.clearTimeout(this.timeoutID);
        delete this.timeoutID;
      }
    }
  }

  var stopWaterfall = function(){
    toggleAnimationButton();
    $(".main-content").css({
      height: "100%",
      width: "auto",
      position: "static"
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
      var attendeeBlocks = _.last($(".attendees").find(".follow-attendee"), 2);
      var newBlock = $(attendeeBlocks).clone();
      init.msnry[0].remove(attendeeBlocks);
      
      $(".attendees").prepend(newBlock);
      init.msnry[0].prepended(newBlock);

      timer.activate();


    }else if(animating){
      timer.activate();
    }

  }

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