# Shakepay challenge (with optional part)

## Live demo 👉 https://shakepay-challenge-v2.web.app

## How to run

- Run `npm i`
- To start a dev server, run `npm start`. If a new tab doesn't open automatically, go to http://localhost:3000/.

## Possible improvements

- Add UI features in the chart to zoom in, show months etc.
- Improve formatting in the tooltips when we hover over transactions

## Features
- Chart is here and displays net worh over time
- Uses each current day's rates
- Used the API provided to get data
- Loading UI (a spinner shows while the data is being fetched)
- Error handling (an alert displaying the error message appears if fetching the data is unsuccesful)

## Libraries & ressources used
- Javascript framework used: React.js
- CSS library used: Bootstrap for diverse UI components such as alerts/spinner. 
- Chart plugin used: chart.js
- Axios for API calls
- CSS modules for ensuring each class name is scoped to its own component
- Hosted with Firebase
