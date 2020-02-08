{
  let previousSecondDegrees = 0;
  let secondMultiplier = 0;

  let previousMinuteDegrees = 0;
  let minuteMultiplier = 0;

  let previousHourDegrees = 0;
  let hourMultiplier = 0;

  document.addEventListener('DOMContentLoaded', function(){
    setHandsDegrees();
    setInterval(setHandsDegrees, 1000);
  });

  function setHandsDegrees() {
    const now = new Date();
    const minute = now.getMinutes();
    const minuteDegrees = 360 / 60 * minute;
    const hour = now.getHours() % 12 || 12;
    const hourDegrees = 360 / 12 * (hour + (minute / 60));

    const second = now.getSeconds();
    const secondDegrees = (360 / 60 * second);

    // New turn
    if (secondDegrees - previousSecondDegrees < 0) {
      secondMultiplier++;
    }
    previousSecondDegrees = secondDegrees;

    if (minuteDegrees - previousMinuteDegrees < 0) {
      minuteMultiplier++;
    }
    previousMinuteDegrees = minuteDegrees;

    if (hourDegrees - previousHourDegrees < 0) {
      hourMultiplier++;
    }
    previousHourDegrees = hourDegrees;

    // Hour hands
    const hourHands = document.querySelectorAll('.main-timer .hour-hand');
    for (const hand of hourHands) {
      hand.style.transform = `rotate(${(hourMultiplier * 360) + hourDegrees}deg)`;
    }

    // Minute hands
    const minuteHands = document.querySelectorAll('.main-timer .minute-hand');
    for (const hand of minuteHands) {
      hand.style.transform = `rotate(${(minuteMultiplier * 360) + minuteDegrees}deg)`;
    }

    // Second hands
    const secondHands = document.querySelectorAll('.main-timer .second-hand');
    for (const hand of secondHands) {
      hand.style.transform = `rotate(${(secondMultiplier * 360) + secondDegrees}deg)`;
    }
  }
}
