// server.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

app.get("/api/tickers", async (req, res) => {
  try {
    const response = await fetch("https://api.wazirx.com/api/v2/tickers");
    const data = await response.json();

    const tickers = Object.values(data);

    tickers.sort((a, b) => parseFloat(b.last) - parseFloat(a.last));

    const top10Tickers = tickers.slice(0, 10);

    res.json(top10Tickers);
  } catch (error) {
    console.error("Error fetching data from WazirX API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});