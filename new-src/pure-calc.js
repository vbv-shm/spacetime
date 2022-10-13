import byYear from './data/byYear.js'
import getDay from './getDay.js'

const HOUR = 1000 * 60 * 60
const DAY = HOUR * 24

const monthLengths = [
  31, //January - 31 days
  28, //February - 28 days in a common year and 29 days in leap years
  31, //March - 31 days
  30, //April - 30 days
  31, //May - 31 days
  30, //June - 30 days
  31, //July - 31 days
  31, //August - 31 days
  30, //September - 30 days
  31, //October - 31 days
  30, //November - 30 days
  31, //December - 31 days
];

//https://www.timeanddate.com/date/leapyear.html
const isLeapYear = function (year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
};

const addMonths = function (months, year) {
  let ms = 0
  for (let i = 0; i < months - 1; i += 1) {
    let days = monthLengths[i]
    if (i === 1 && isLeapYear(year)) {
      days = 29
    }
    ms += days * DAY
  }
  return ms
}

// click forward to the proper weekday
const toWeekDay = function (obj, year) {
  let day = getDay(year, obj.month, 1)
  let want = obj.day
  // console.log(want)
  let diff = 0
  for (let i = 0; i < 7; i += 1) {
    if (day === want) {
      return diff //* DAY
    }
    day += 1
    day = day % 7
    diff += 1
  }
  return 0
}

const toRightWeek = function (num) {
  if (num === 'first' || num <= 1) {
    return 0
  }
  if (num === 'last') {
    console.log('fixme')
    return 3
  }
  let addWeeks = num - 1
  return addWeeks //* 7// * DAY
}

const lastWeekday = function (epoch, obj, year) {
  // console.log('last weekday')
  // go to next month
  let days = monthLengths[obj.month + 1] || 31
  epoch += days * DAY
  // go to the day
  days = toWeekDay(obj, year)
  // back a week
  days -= 7
  epoch += days * DAY
  return epoch
}

const calc = function (obj, year, offset) {
  let epoch = byYear[String(year)]
  // go to the correct month
  epoch += addMonths(obj.month, year)
  if (obj.num === 'last') {
    epoch = lastWeekday(epoch, obj, year)
  } else {
    // go to the correct day
    let days = toWeekDay(obj, year)
    epoch += days * DAY
    // go to the correct week
    let weeks = toRightWeek(obj.num, obj)
    epoch += weeks * 7 * DAY
  }
  // go to the correct hour
  epoch += (obj.hour || 0) * HOUR
  // go to the correct offset
  epoch -= offset * 60 * 60 * 1000
  // console.log(new Date(epoch))
  return epoch
}
// 2nd tuesday
// console.log(calc({ month: 10, day: 2, num: 2, hour: 2 }, 2022))

export default calc