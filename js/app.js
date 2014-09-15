$(document).foundation();

$(document).ready(function() {
   getCalendar();
});


function getCalendar() {
  var mykey = 'AIzaSyAnjbH3hVnKXa8oiBIVQw5ONWs-WY0RBpU';
  var calendarid = 'r15uok0rd5u67jr90j78b74jdk@group.calendar.google.com';
  var date = new Date();
  date = date.toISOString();

  $.ajax({
      type: 'GET',
      url: encodeURI('https://www.googleapis.com/calendar/v3/calendars/' + calendarid+ '/events?timeMin='+ date + '&key=' + mykey),
      dataType: 'json',
      success: function (response) {
        htmlAddCalendar(response.items);
      },
      error: function (response) {
        console.log('ERROR');
        console.log(response);
      }
  });
}

function htmlAddCalendar(dates){
  for (var i = dates.length - 1; i >= 0; i--) {

    console.log(dates[i].description);
    console.log(dates[i].summary);
    console.log(dates[i].start.dateTime);
    console.log(dates[i].end.dateTime);
    
  };
}