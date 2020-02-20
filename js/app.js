{
  let previousSecondDegrees = 0;
  let secondMultiplier = 0;

  let previousMinuteDegrees = 0;
  let minuteMultiplier = 0;

  let previousHourDegrees = 0;
  let hourMultiplier = 0;

  document.addEventListener('DOMContentLoaded', function(){
    setInterval(setHandsDegrees(), 1000);
  });

  startTimeout = null;

  document.addEventListener('click', function(e){
    if (e.target.classList.contains('stopwatch')) {
      clearTimeout(startTimeout)
      startTimeout = setTimeout(() => {
        onStopwatch(e.target)
      }, 200)
    }
    if (
      e.target.parentElement &&
      e.target.parentElement.id === 'list' &&
      !e.target.nextElementSibling
    ) {
      resetResult()
    }
  });

  document.addEventListener('dblclick', function(e){
    if (e.target.classList.contains('stopwatch')) {
      clearTimeout(startTimeout)
      resetStopwatch(e.target)
    }
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
    return setHandsDegrees;
  }

  function onStopwatch(stopwatchElement) {
    if (! stopwatchElement.dataset.hasOwnProperty('start')) {
      runStopwatch(stopwatchElement)
    } else {
      const result = getCurrentResult(stopwatchElement)
      inserResult(result)
    }
  }

  function runStopwatch (stopwatchElement) {
    const millisecondHand = stopwatchElement.querySelector('.millisecond-hand');
    const secondHand = stopwatchElement.querySelector('.second-hand');
    stopwatchElement.dataset.start = Date.now() / 10;
    let milliSeconds = 0;
    stopwatchElement.timer = setInterval(() => {
      milliSeconds = Date.now() / 10
      const passedMilliseconds = milliSeconds - stopwatchElement.dataset.start;
      if (millisecondHand !== null) {
        const milliSecondsDegrees = passedMilliseconds % 100 / 100 * 360
        millisecondHand.style.transform = `rotate(${milliSecondsDegrees}deg)`;
      }
      if (secondHand !== null) {
        const secondsDegrees =  passedMilliseconds / 100 % 60 / 100 * 360 * (100 / 60)
        secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
      }
    }, 50);
  }

  function resetStopwatch (stopwatchElement) {
    if (stopwatchElement.dataset.hasOwnProperty('start')) {
      clearInterval(stopwatchElement.timer)
      const millisecondHand = stopwatchElement.querySelector('.millisecond-hand');
      const secondHand = stopwatchElement.querySelector('.second-hand');
      millisecondHand.style.removeProperty('transform');
      secondHand.style.removeProperty('transform');
      delete stopwatchElement.dataset.start;
      delete stopwatchElement.dataset.previous;
      delete stopwatchElement.dataset.previous;
    }
  }

  function getCurrentResult (stopwatchElement) {
    milliSeconds = Date.now() / 10;
    const passedMilliseconds = milliSeconds - stopwatchElement.dataset.start;
    let result = milliSecondsToHuman(passedMilliseconds);
    if (stopwatchElement.dataset.previous) {
      const passedMillisecondsPrevious = milliSeconds - stopwatchElement.dataset.previous;
      result += ` | ${milliSecondsToHuman(passedMillisecondsPrevious)}`;
    }
    stopwatchElement.dataset.previous = milliSeconds;
    return result;
  }

  function milliSecondsToHuman(milliseconds) {
    let seconds = parseFloat(milliseconds / 100 % 60).toFixed(3);
    let minutes = Math.floor(milliseconds / 100 / 60 % 60);
    seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${minutes}:${seconds}`
  }

  function inserResult(str) {
    const ul = document.getElementById('list');
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`${ul.childElementCount + 1} ${str}`));
    ul.appendChild(li);
  }

  function resetResult() {
    const ul = document.getElementById('list');
    ul.innerHTML = "";
  }
}
