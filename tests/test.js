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
  function testDetectsStart() {},
  function testDetectsEnd() {},
  function testDetectsDescription() {},
  function testDetectsLocation() {},
]

// ++++++++++++++++++
// TEST functionALITY
// ++++++++++++++++++
function testFunctionality(){
  function testParseFullDays(){}
  function testNormalEvent(){}
  function testAllDayEvent(){}
  function testEventWithoutTimezone(){}
}

basic_function_tests.forEach((testFunction) => {
  try{
    testFunction();
    console.log(`${testFunction.name} passed`)
  }catch (error){
    console.log(`${testFunction.name} failed`, error.message)
    process.exit(1)
  }
})

