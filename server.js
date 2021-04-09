// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path'); 

// Port assign
const PORT = process.env.PORT || 8080; 

// server instantiate
const app = express(); 

//data request
const { notes } = require('./develop/db/db.json');

 
// parse string data
app.use(express.urlencoded ( { extended: true }));

app.use(express.json());


function newNote (body, notesArray) {
    const note = body; 
    notesArray.push(note); 
    fs.writeFileSync(
        path.join(__dirname, './develop/db/db.json'),
        JSON.stringify({ notes : notesArray }, null, 2)
    );

    return note; 
}

// route GET 
app.get('/api/notes', (req, res) => {
    let results = notes; 

    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results); 
});

// route to server , data store
app.post('/api/notes', (req, res) => {
    // set id based on what the next index of the array will be 
    req.body.id = notes.length.toString(); 

 // error handling
 if (!validateNote(req.body)) {
    res.status(400).send('This note needs to be formatted.'); 
} else {
    // Create newNote
    const note = newNote(req.body, notes); 

    res.json(note);
}
});
  
// listen on port
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

///connection.end();





