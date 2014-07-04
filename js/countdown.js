// July 5th at 05:00 UTC is July 4th at midnight, Eastern Daylight Time
var deadline = new Date(Date.UTC(2014,10,04,05,00,00,00)).getTime();

var days;
var hours;
var minutes;
var seconds;

var days_display = document.getElementById("days_display");
var hours_display = document.getElementById("hours_display");
var minutes_display = document.getElementById("minutes_display");
var seconds_display = document.getElementById("seconds_display");

setInterval(function () {

  // Calculate
  var current_date = new Date().getTime();
  var seconds_remaining = (deadline - current_date) / 1000;

  days = parseInt(seconds_remaining / 86400);
  seconds_remaining = seconds_remaining % 86400;

  hours = parseInt(seconds_remaining / 3600);
  minutes = parseInt((seconds_remaining % 3600) / 60);
  seconds = parseInt((seconds_remaining % 3600) % 60);

  // Account for the deadline
  if (seconds_remaining <= 0) {
    days = '00';
    hours = '00';
    minutes = '00';
    seconds = '00';
  }

  // Render
  days_display.innerHTML = leadingZero(days);
  hours_display.innerHTML = leadingZero(hours);
  minutes_display.innerHTML = leadingZero(minutes);
  seconds_display.innerHTML = leadingZero(seconds);

}, 1000);

function leadingZero(number) {
  var result = number + '';
  while (result.length < 2) {
    result = '0' + result;
  }
  return result;
}
