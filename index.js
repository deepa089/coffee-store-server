const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 9001



// middle ware
app.use(cors());
app.use(express.json());

