/* eslint-disable no-unused-vars */
const React = require("react");

const express = require("express");

const axios = require("axios");

const app = express();
const port = process.env.PORT || 8000;
const processArgs = process.argv.slice(2);

app.get("/:word", (req, res) => {
  const { word } = req.params;
  axios.get(`http://localhost:8001/${word}`).then(definitionData => {
    axios.get(`http://localhost:8002/${word}`).then(visitsData => {
      const stuffOne = `<!DOCTYPE html5>
              <html lang="en">
              <head>
              <meta charset="UTF-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                  <link href="http://localhost:8002/c3.min.css" rel="stylesheet" />
                  <link href="http://localhost:8001/style.css" rel="stylesheet" />
                  <title>UrbanDiction</title>
                  </head>
                  
                  <body>
                  <div id="definitionApp">${definitionData.data}</div>
                  <div id="activityApp">${visitsData.data}</div>
                  <script src="https://d3js.org/d3.v5.min.js"></script>
                  <script src="http://localhost:8002/c3.min.js"></script>
                  <script src="http://localhost:8001/bundle.js"></script>
                  <script src="http://localhost:8002/bundle.js"></script>
                  <script src="http://localhost:8002/generateChart.js"></script>
                  </body>
              </html>
              `;
      res.send(stuffOne);
    });
  });
});

app.listen(port, () => {
  if (processArgs.includes("development")) {
    // eslint-disable-next-line
    console.log("Listening on", port);
  }
});
