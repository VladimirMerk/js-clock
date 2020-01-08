document.addEventListener('DOMContentLoaded', function(){
  setHandsDegrees()
  setInterval(setHandsDegrees, 1000)
});

function setHandsDegrees() {
   const now = new Date();
   const hour = now.getHours() % 12 || 12;
   const hourDegrees = 360 / 12 * hour;
   const minute = now.getMinutes();
   const minuteDegrees = 360 / 60 * minute;
   const second = now.getSeconds();
   const secondDegrees = 360 / 60 * second;
   const hourHands = document.querySelectorAll('.main-timer .hour-hand');
   for (const hand of hourHands) {
     hand.style.transform = `rotate(${hourDegrees}deg)`;
   }
   const minuteHands = document.querySelectorAll('.main-timer .minute-hand');
   for (const hand of minuteHands) {
     hand.style.transform = `rotate(${minuteDegrees}deg)`;
   }
   const secondHands = document.querySelectorAll('.main-timer .second-hand');
   for (const hand of secondHands) {
     hand.style.transform = `rotate(${secondDegrees}deg)`;
   }
}
