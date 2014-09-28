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
  maxDate.setDate(maxDate.getDate()+7);  
  maxDate = maxDate.toISOString();

  $.ajax({
      type: 'GET',
      url: encodeURI('https://www.googleapis.com/calendar/v3/calendars/' + calendarid+ '/events?timeMax='+ maxDate  + '&key=' + mykey),
      dataType: 'json',
      success: function (response) {
        receiveCalendarEvents(response);
      },
      error: function (response) {
        console.log('ERROR');
        console.log(response);
      }
  });
}


function receiveCalendarEvents(ajaxResponse){
  var events = ajaxResponse.items;
  var eventArray = [];
  var eventDates = [];
  for (var i = events.length - 1; i >= 0; i--) {
    
    if (events[i].start.date && events[i].status === "confirmed") {    
    
      events[i].date = events[i].start.date;
      eventArray.push(events[i]);
      eventDates.push(events[i].date);

    
    } else if (events[i].start.dateTime && events[i].status === "confirmed") {
      
      events[i].date = events[i].start.dateTime;
      eventArray.push(events[i]);
      eventDates.push(events[i].date);
      console.log(events[i].start.dateTime);
    
    } else {
      console.log("idk wtf this is");
    }
  }
  
  eventDates = eventDates.sort();
  sortEvents(eventDates, eventArray);
}

function sortEvents(dateArray, eventArray){
  var sortedEvents = [];
  
  for (var i = dateArray.length - 1; i >= 0; i--) {

    for (var x = eventArray.length - 1; x >= 0; x--) {

      if (eventArray[x].date === dateArray[i]) {
        sortedEvents.push(eventArray[x]);

      }
    }
  }
  manipulateEventDates(sortedEvents);
}


function manipulateEventDates(events){

  for (var i = events.length - 1; i >= 0; i--) {
    var time = moment(events[i].date);
    events[i].date = time.format("ddd, MMM Do");
  }
  htmlAddCalendar(events);
}

function htmlAddCalendar(dates){

  var $orbitSlider = $("#orbitSlider");

  for (var i = dates.length - 1; i >= 0; i--) {

    var captionTitle = dates[i].summary;
    var captionText = dates[i].description;
    
    var $li = $("<li>");
    var $orbitCaption = $("<p>");
    var $orbitTitle = $("<h4>");
    var $img = $("<img>");
    var $date = $("<h6 class='calendarDate'>");

    $date.text(dates[i].date);

    if (captionTitle === "NFL Sunday Ticket") {        
      $img.attr('src', './img/sundayTicket.jpg');
    }
    else if (captionTitle === "Karaoke Wednesday") {
      $img.attr('src', './img/karaoke.jpg');
    }
    else if (captionTitle === "Open Jam") {

      $img.attr('src', './img/openMic.jpg');
    }
    else if (captionTitle === "Trivia Sunday") {

      $img.attr('src', './img/triviaThurs.jpg');
    }   
    else if (captionTitle === "Live Music at 9") {

      $img.attr('src', './img/liveSat.jpg');
    }    
    else if(captionTitle === "Gary Talley Live at 9"){
      $img.attr('src', './img/liveSat.jpg');
    }
    else {
      $img.attr('src', './img/specialEvent.jpg');
    }                     
      
    $orbitCaption.attr('class', 'panel');
    $orbitCaption.append(captionText);
    
    $orbitTitle.attr('class', 'calendarTitle');
    $orbitTitle.append(captionTitle);
    
    
    $li.append($img);
    $li.append($orbitTitle);
    $li.append($date);
    $li.append($orbitCaption);
    $orbitSlider.append($li);       
  }  
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