const assert = require('assert');
const { parseICS } = require('../ics-parser.js');

const ics_template = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test Calendar//EN
BEGIN:VEVENT
SUMMARY:Birthday Party
DTSTART:20230512
DTEND:20230512
DESCRIPTION:Celebrate John's birthday
LOCATION:Sesamestreet 69, 1337 Coolcity. GERMANY
END:VEVENT
END:VCALENDAR
  `;

// ++++++++++++++++++++
// BASIC function TESTS
// ++++++++++++++++++++
basic_function_tests = [
  function testParserReturnsList() {
    const events = parseICS(ics_template);
    assert.strictEqual(events.length, 1)
  },
  function testDetectsTitle() {
    const events = parseICS(ics_template);
    assert.strictEqual(events[0].title, 'Birthday Party')
  },
  function testDetectsStart() {
    const events = parseICS(ics_template);
    assert.deepStrictEqual(events[0].start, new Date(2023, 4, 12))
  },
  function testDetectsEnd() {
    const events = parseICS(ics_template);
    assert.deepStrictEqual(events[0].start, new Date(2023, 4, 12))
  },
  function testDetectsDescription() {
    const events = parseICS(ics_template);
    assert.strictEqual(events[0].description, "Celebrate John's birthday")
  },
  function testDetectsLocation() {
    const events = parseICS(ics_template);
    assert.strictEqual(events[0].location, "Sesamestreet 69, 1337 Coolcity. GERMANY")
  },
]

// ++++++++++++++++++
// TEST functionALITY
// ++++++++++++++++++
const testFunctionality = [
  function testParseFullDays(){
    const ics = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test Calendar//EN
BEGIN:VEVENT
SUMMARY:Birthday Party
DTSTART:20230512
DTEND:20230512
DESCRIPTION:Celebrate John's birthday
END:VEVENT
END:VCALENDAR
    `; 

    const events = parseICS(ics);
    assert.deepStrictEqual(events[0].start, new Date(2023, 4, 12))
    assert.deepStrictEqual(events[0].end, new Date(2023, 4, 12))
  },
  function testNormalEvent(){
    const ics = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test Calendar//EN
BEGIN:VEVENT
SUMMARY:Dinner with Family
DTSTART:20230510T170000
DTEND:20230510T190000
DESCRIPTION:Dinner at home with family
END:VEVENT
END:VCALENDAR
    `; 

    const events = parseICS(ics);
    assert.deepStrictEqual(events[0].start, new Date(2023, 4, 10, 17, 0))
    assert.deepStrictEqual(events[0].end, new Date(2023, 4, 10, 19, 0))
  },
  function testAllDayEvent(){},
  function testEventWithoutTimezone(){},
]

basic_function_tests.forEach((testFunction) => {
  try{
    testFunction();
  }catch (error){
    console.log(`${testFunction.name} failed.\n`, error.message)
    process.exit(1)
  }
})



testFunctionality.forEach((testFunction) => {
  try{
    testFunction();
  }catch (error){
    console.log(`${testFunction.name} failed.\n`, error.message)
    process.exit(1)
  }
})
