# ICS Viewport

"Paste. View. Done"
Paste a public ICS link and render upcoming events in beautiful tiles. 
Useful for newsletter copy/paste, events promotion, and lightweight calendar sharing.

## Dependencies
Using [Corsproxy](https://corsproxy.io/).
Overcomes [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS/Errors/CORSMissingAllowOrigin) restrictions when using calendar links.


## 📆 Features
- Paste ICS links to view upcoming appointments
- Tile layout with title, date, time, description
- Works in your browser (no server)
- Design to be copied to newsletters

## Usage
- Open link: <PASTE LINK>
- Paste a public `.ics` URL
- View upcoming events


## Dev Setup
Requires: Python

```SHELL
git clone 
cd ics-viewport

# Start python dev server
python3 -m http.server

# Open index.html in browser
```

## Local testing
Requires Container runtime. Docker or Nerdctl

- Clone repo and change into directory
```SHELL
docker run --rm -v "$PWD":/app -w /app node:20 node tests/test.js
```

## Deployment

Automatically deploys via GitHub Pages.
Enable it in repo settings: Settings > Pages > Source: main branch /root

