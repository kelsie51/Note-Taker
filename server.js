// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path'); 

// Port assign
const PORT = process.env.PORT || 3000; 

// server instantiate
const app = express(); 

//data request
const { notes } = require('./data/db.json');

// listen on port
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
