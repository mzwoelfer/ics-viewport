import { parseICS } from './ics-parser.js';

document.getElementById('loadBtn').addEventListener('click', async () => {
  const proxy = 'https://corsproxy.io/?url=';
  const url = proxy + encodeURIComponent(document.getElementById('icsUrl').value.trim());

  if (!url) return alert('Please enter a URL');

  const res = await fetch(url);
  const text = await res.text();
  const events = parseICS(text);
  renderEvents(events);
});



function renderEvents(events) {
  const container = document.getElementById('eventContainer');
  container.innerHTML = '';

  events.forEach(({ title, start, end, desc, location }) => {
    const tile = document.createElement('div');
    tile.className = 'bg-white shadow-md p-4 rounded';
    tile.innerHTML = `
      <h2 class="text-xl font-bold">${title}</h2>
      <p class="text-sm text-gray-600">${start.toLocaleString()} - ${end.toLocaleTimeString()}</p>
      <p class="text-sm text-gray-600">${location}</p>
      <p class="mt-2">${desc}</p>
    `;
    container.appendChild(tile);
  });
}


if (typeof module !== 'undefined') {
  module.exports = { parseICS };
}
