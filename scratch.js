import spacetime from './newer/index.js'
import { getStart } from './newer/compute/_lib/yearStart.js'

// import structure from './newer/changes/build.js'
// import byYear from './newer/changes/by-year.js'
// console.log(byYear('America/Toronto', 2022))


// let s = spacetime(1674455138750, "America/Vancouver")
// let cal = { year: 2023, month: 1, date: 22, hour: 22, minute: 25, second: 39 }
// console.log(s.hour())
// console.log(s.iso())

// console.log(getStart(2023, "Europe/Kirov"))
console.log(getStart(2023, "Europe/London"))
// console.log(getStart(2023, "Europe/London"))
// console.log(getStart(2023, "America/Chicago"))

// let s = spacetime(1673126710, "America/Chicago")
//  January 07, 2023 15:25:10 (pm) 
// console.log(s.hour())
// console.log(s.iso())