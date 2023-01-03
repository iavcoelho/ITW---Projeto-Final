function updateTimer() {
    future  = Date.parse("July 26, 2024 09:00:00");
    now     = new Date();
    diff    = future - now;
  
    days  = Math.floor( diff / (1000*60*60*24) );
    hours = Math.floor( diff / (1000*60*60) );
    mins  = Math.floor( diff / (1000*60) );
    secs  = Math.floor( diff / 1000 );
  
    d = days;
    h = hours - days  * 24;
    m = mins  - hours * 60;
    s = secs  - mins  * 60;
  
    document.getElementById("timer")
      .innerHTML =
        '<div class="text">' + d + '<span>days</span></div>' +
        '<div class="text">' + h + '<span>hours</span></div>' +
        '<div class="text">' + m + '<span>minutes</span></div>' +
        '<div class="text">' + s + '<span>seconds</span></div>' ;
  }
  setInterval('updateTimer()', 1000 );
  