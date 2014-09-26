$(document).foundation({
  topbar: {
    scrolltop:false
  },
  orbit: {
    animation: 'fade',
    variable_height: true,
    slide_number: false,
    bullets: false
  }
});

$(document).ready(function() {
   getCalendar();
   $('.navLink').on('click', function (event){
      scrollTop(event);
   });
});


function getCalendar() {
  var mykey = 'AIzaSyAnjbH3hVnKXa8oiBIVQw5ONWs-WY0RBpU';
  var calendarid = 'qlrklr4bh0rh2gf4k5td996e6c@group.calendar.google.com';

  var maxDate = new Date();
  maxDate.setDate(maxDate.getDate()+14);  
  maxDate = maxDate.toISOString();

  $.ajax({
      type: 'GET',
      url: encodeURI('https://www.googleapis.com/calendar/v3/calendars/' + calendarid+ '/events?timeMax='+ maxDate  + '&key=' + mykey),
      dataType: 'json',
      success: function (response) {
        sortCalendarDates(response);
      },
      error: function (response) {
        console.log('ERROR');
        console.log(response);
      }
  });
}


function sortCalendarDates(ajaxResponse){
  var dates = ajaxResponse.items;
  var dateComparison = [];

  for (var i = dates.length - 1; i >= 0; i--) {
    if (dates[i].start) {
      if (dates[i].start.date) {
        
        // console.log("all day event detected");
        // console.log(dates[i].summary);
        // console.log(dates[i].start.date);
        // console.log(" ");
        dateComparison.push(dates[i].start.date);

      } else if (dates[i].start.dateTime) {
        
        // console.log("timed event detected");
        // console.log(dates[i].summary);
        // console.log(dates[i].start.dateTime);
        // console.log(" ");
        dateComparison.push(dates[i].start.dateTime);

      } else{
        
        console.log(" event without start detected");
      } 
    } else {
      console.log("canceled event detected");
    }
  };

  console.log(dateComparison.sort()); 
  _.sortBy(dates)
  htmlAddCalendar(dates);
}


function htmlAddCalendar(dates){

  // console.log(ajaxResponse.items);
  // console.log(" ");
  var $orbitSlider = $("#orbitSlider");
  var baseDates = [];
  var baseDescriptions = [];

  for (var i = dates.length - 1; i >= 0; i--) {
    if (dates[i].status==="confirmed") {
      // console.log(dates[i].summary);
      // console.log(dates[i].start.dateTime);
      // console.log(dates[i].start.date);
      // console.log(dates[i]);
      // console.log(" ");

      var captionTitle = dates[i].summary;
      var captionText = dates[i].description;
      
      var containsTitle = _.contains(baseDates, captionTitle);
      var containsDescription = _.contains(baseDescriptions, captionText);
      var $li = $("<li>");
      var $orbitCaption = $("<p>");
      var $orbitTitle = $("<h4>");
      var $img = $("<img>");
      var $date = $("<h6>");
      $date.attr("class", "calendarDate");


      if (containsDescription && containsTitle && !dates[i].recurrence) {
        // console.log("Date Match Failure Conditions met!!!!!");
        // console.log(dates[i]);
        // console.log(" ");

      } else {
          // console.log("Date Posting Conditions Met!!!!");
          // console.log(dates[i]);
          // console.log(" ");
          if (captionTitle === "NFL Sunday Ticket") {        
            $img.attr('src', './img/sundayTicket.jpg');
            $date.text("Sun 09/28");
          }
          else if (captionTitle === "Karaoke Wednesday") {
            $img.attr('src', './img/karaoke.jpg');
            $date.text("Wed 10/1");
          }
          else if (captionTitle === "Open Jam") {

            $img.attr('src', './img/openMic.jpg');
            $date.text("Fri 10/3");
          }
          else if (captionTitle === "Throwback Thursday") {

            $img.attr('src', './img/triviaThurs.jpg');
            $date.text("Thurs 10/02");
          }   
          else if (captionTitle === "Live Music at 9") {

            $img.attr('src', './img/liveSat.jpg');
            $date.text("Sat 10/4");
          }    
          else if(captionTitle === "Gary Talley Live at 9"){
            $img.attr('src', './img/liveSat.jpg');
            $date.text("Sat 09/27");
          }
          else {
            $img.attr('src', './img/specialEvent.jpg');
            
          }                     
          
          // $orbitCaption.attr('class', 'orbit-caption');
          $orbitCaption.append(captionText);
          $orbitCaption.attr('class', 'panel');

          $orbitTitle.append(captionTitle);
          $orbitTitle.attr('class', 'calendarTitle');
          
          $li.append($img);
          $li.append($orbitTitle);
          $li.append($date);
          $li.append($orbitCaption);
          $orbitSlider.append($li);       
      }  
    };
  };
}


function scrollTop(event){
  var targetName = event.currentTarget;
  targetName = $(targetName).attr('id');
  

  if (targetName === 'introLink') {
    htmlScrollAnimation("#intro");
  }
  else if (targetName === 'aboutLink') {
    htmlScrollAnimation("#about");
  }
  else if (targetName === 'menuLink') {
    htmlScrollAnimation("#menu");
  }
  else if (targetName === 'calendarLink') {
    htmlScrollAnimation("#calendar");
  }      
  else if (targetName === 'mapLink') {
    htmlScrollAnimation("#map");
  }
  else {
    return;
  }  
};
  
function htmlScrollAnimation(section){
  $('html, body').animate({
    scrollTop: $(section).offset().top - 45
  }, 1000);
}