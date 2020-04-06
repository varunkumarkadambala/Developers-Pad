const express = require('express');

const app = express();

app.get('/', (req,res) => res.send("API is Running"));

PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The App is running on port ${PORT}`));