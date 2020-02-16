

window.onload = function() {
  const timezoneSelector = document.querySelector('#timezones')
  timezones.forEach(timezone => {
    timezoneSelector.innerHTML += `<option value='${timezone}'>${timezone}</option>`
  })
  addClock('local', 'Local Time')
  setInterval(runClock, 1000)
}

function addClock(timezone, label) {
  const clockHTML = `<div class='clock-wrapper'>
    <div class="clock" data-timezone="${timezone}">
    <span class='number twelve'>12</span>
    <span class='number three'>3</span>
    <span class='number six'>6</span>
    <span class='number nine'>9</span>
    <div class="clock-centre"></div>
    <div class="hand minutes" data-timezone="${timezone}"></div>
    <div class="hand seconds" data-timezone="${timezone}"></div>
    <div class="hand hours" data-timezone="${timezone}"></div>
    </div>
    <span class='clockName'>${label}</span>
    <span class='delete' onClick='deleteClock(this)'>X</span>
    </div>`
  const clocks = document.querySelector('.clocks')

  clocks.innerHTML += clockHTML
  clockName.value = ""
}

function newClock() {
  const timezoneSelector = document.querySelector('#timezones')
  const timezone = timezoneSelector.options[timezoneSelector.selectedIndex].text
  const clockName = document.querySelector('#clockName').value
  ; (clockName.length) ? addClock(timezone, clockName) : alert('Make sure you add a name for your new clock!')
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

    const hourHands = document.querySelectorAll(`.hours[data-timezone="${timezone}"]`)
    hourHands.forEach(hand => {
      hand.style.transform = `rotate(${hoursDegrees}deg)`
    })
    const minuteHands = document.querySelectorAll(`.minutes[data-timezone="${timezone}"]`)
    minuteHands.forEach(hand => {
      hand.style.transform = `rotate(${minutesDegrees}deg)`
    })
    const secondHands = document.querySelectorAll(`.seconds[data-timezone="${timezone}"]`)
    secondHands.forEach(hand => {
      hand.style.transform = `rotate(${secondsDegrees}deg)`
    })
  })
}

function deleteClock(param) {
  param.parentElement.remove()
}
