//import {timezones} from './timezones.js'

const timezones = [
  'America/New_York',
  'America/Los_Angeles'
]


window.onload = function() {
  const timezoneSelector = document.querySelector('#timezones')
  timezones.forEach(timezone => {
    timezoneSelector.innerHTML += `<option value='${timezone}'>${timezone}</option>`
  })
  addClock('local')
  setInterval(runClock, 1000)
}

function addClock(timezone) {
  const clockHTML = `<div class="clock" data-timezone="${timezone}">
    <span class='number twelve'>12</span>
    <span class='number three'>3</span>
    <span class='number six'>6</span>
    <span class='number nine'>9</span>
    <div class="clock-centre"></div>
    <div class="hand minutes" data-timezone="${timezone}"></div>
    <div class="hand seconds" data-timezone="${timezone}"></div>
    <div class="hand hours" data-timezone="${timezone}"></div>
  </div>`
  const clocks = document.querySelector('.clocks')

  clocks.innerHTML += clockHTML
}

function newClock() {
  const timezoneSelector = document.querySelector('#timezones')
  let timezone = timezoneSelector.options[timezoneSelector.selectedIndex].text
  addClock(timezone)
}


function runClock() {

  const clocks = document.querySelectorAll('.clock')
  const timezones = []
  for (let i = 0; i < clocks.length; i++) {
    timezones.push(clocks[i].getAttribute('data-timezone'))
  }


  timezones.forEach(timezone => {
    let now
    (timezone === 'local') ? now = new Date() : now = new Date().toLocaleString("en-US", {timeZone: `${timezone}`})
    now = new Date(now)

    const seconds = now.getSeconds()
    const minutes = now.getMinutes()
    const hours = now.getHours()

    const secondsDegrees = ((seconds / 60) * 360) + 90;
    const minutesDegrees = ((minutes / 60) * 360) + ((seconds/60)*6) + 90;
    const hoursDegrees = ((hours / 12) * 360) + ((minutes/60)*30) + 90;

    const hoursHand = document.querySelector(`.hours[data-timezone="${timezone}"]`)
    const minutesHand = document.querySelector(`.minutes[data-timezone="${timezone}"]`)
    const secondsHand = document.querySelector(`.seconds[data-timezone="${timezone}"]`)

    hoursHand.style.transform = `rotate(${hoursDegrees}deg)`
    minutesHand.style.transform = `rotate(${minutesDegrees}deg)`
    secondsHand.style.transform = `rotate(${secondsDegrees}deg)`
  })
}
