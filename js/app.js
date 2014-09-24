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
  var date = new Date();
  date = date.toISOString();

  $.ajax({
      type: 'GET',
      url: encodeURI('https://www.googleapis.com/calendar/v3/calendars/' + calendarid+ '/events?maxResults=10&timeMin='+ date + '&key=' + mykey),
      dataType: 'json',
      success: function (response) {
        htmlAddCalendar(response.items);
        console.log(response);
      },
      error: function (response) {
        console.log('ERROR');
        console.log(response);
      }
  });
}

function htmlAddCalendar(dates){

  var $orbitSlider = $("#orbitSlider");

  for (var i = dates.length - 1; i >= 0; i--) {
    if (dates[i].status==="confirmed") {
      
      var captionTitle = dates[i].summary;
      var captionText = dates[i].description;
      
      
      var $li = $("<li>");
      var $orbitCaption = $("<p>");
      var $orbitTitle = $("<h4>");
      var $img = $("<img>");
      
      if (captionTitle === "NFL Sunday Ticket") {
        console.log('nfl detected');
        $img.attr('src', './img/sundayTicket.jpg');
      }
      else if (captionTitle === "Karaoke Wednesday") {
        console.log('karaoke detected');
        $img.attr('src', './img/karaoke.jpg');
      }
      else if (captionTitle === "Open Jam") {
        console.log('open jam detected');
        $img.attr('src', './img/openMic.jpg');
      }
      else if (captionTitle === "Throwback Thursday") {
        console.log('throwback thursday detected');
        $img.attr('src', './img/triviaThurs.jpg');
      }   
      else if (captionTitle === "Live Music at 9") {
        console.log('live music detected');
        $img.attr('src', './img/liveSat.jpg');
      }    
      else {
        console.log('arbitrary entry detected');
        $img.attr('src', './img/specialEvent.jpg');
      }                     
      
      // $orbitCaption.attr('class', 'orbit-caption');
      $orbitCaption.append(captionText);
      $orbitCaption.attr('class', 'panel');

      $orbitTitle.append(captionTitle);
      $orbitTitle.attr('class', 'calendarTitle');
      
      $li.append($img);
      $li.append($orbitTitle);
      $li.append($orbitCaption);
      $orbitSlider.append($li);

      // console.log(dates[i].start.dateTime);
      // console.log(dates[i].end.dateTime);      
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