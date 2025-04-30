
function parseICSTime(val, isEnd = false) {
  // Handle full-day dates 
  if (val.includes('T')) {
    const match = val.match(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})/);
    if (!match) return null;
    const [_, y, m, d, h, min] = match;
    return new Date(+y, +m - 1, +d, +h, +min);
  } else {
    // All-day event: treat as local midnight
    const match = val.match(/(\d{4})(\d{2})(\d{2})/);
    if (!match) return null;
    const [_, y, m, d] = match;
    let date = new Date(+y, +m - 1, +d);
    if (isEnd) {
      date.setDate(date.getDate());
    }
    return date
  }
}

function parseICS(text) {
  const events = [];
  const lines = text.split(/\r?\n/);
  const cleanLines = [];

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith(' ')) {
      cleanLines[cleanLines.length - 1] += lines[i].slice(1);
    } else {
      cleanLines.push(lines[i]);
    }
  }

  let current = null;

  for (let line of cleanLines) {
    if (line === 'BEGIN:VEVENT') {
      current = {};
    } else if (line === 'END:VEVENT') {
      if (current?.start && current?.title) {
        events.push(current);
      }
      current = null;
    } else if (current) {
      const [rawKey, ...rest] = line.split(':');
      const value = rest.join(':').trim();
      const key = rawKey.split(';')[0];

      if (key === 'DTSTART') current.start = parseICSTime(value);
      if (key === 'DTEND') current.end = parseICSTime(value, true);
      if (key === 'SUMMARY') current.title = value;
      if (key === 'DESCRIPTION') current.description = value;
      if (key === 'LOCATION') current.location = value;
    }
  }

  const now = new Date();
  return events
    .sort((a, b) => a.start - b.start);
}

export { parseICS, parseICSTime };

if (typeof module !== 'undefined') {
  module.exports = { parseICS, parseICSTime };
}
