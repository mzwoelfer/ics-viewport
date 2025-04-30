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
  function testDetectsStart() {
    const events = parseICS(ics_template);
    assert.deepStrictEqual(events[0].start, new Date(2023, 4, 12))
  },
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
  }catch (error){
    console.log(`${testFunction.name} failed.\n`, error.message)
    process.exit(1)
  }
})

