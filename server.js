// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path'); 

// Port assign
const PORT = process.env.PORT || 8080; 

// server instantiate
const app = express(); 
// parse data
app.use(express.urlencoded ( { extended: true }));

app.use(express.json());

app.use(express.static('public')); 


//data request
const { notes } = require('./develop/db/db.json');
    
    // function to add data to json
    function newNote (body, notesArray) {
        const note = body; 
        notesArray.push(note); 
        
        //  write file path
        fs.writeFileSync(
            path.join(__dirname, './develop/db/db.json'),
            JSON.stringify({ notes : notesArray }, null, 2)
            );
            
            return note; 
        };
        
        // validating data
        function validateNote (note) {
            if (!note.title || typeof note.title !== 'string') {
                return false; 
            }
            if (!note.text || typeof note.text !== "string") {
                return false;
            }
            return true;   
        };
        
        //  Route get
        app.get('/api/notes', (req, res) => {
            res.json(notes); 
        });
        
        // retrieve amd store data on server-side
        app.post('/api/notes', (req, res) => {
            // set id based on what the next index of the array will be 
            req.body.id = notes.length.toString(); 
            
            // Error handling
            if (!validateNote(req.body)) {
                res.status(400).send('The note is not properly formatted.'); 
                
            } else {
                //Create new note
                const note = newNote(req.body, notes); 
                
                res.json(note);
            }
        });
        
        
        
        //index.html rt
        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname,'./Develop/public/index.html'));
        }); 
        
        // notes.html rt
        app.get('/notes', (req, res) => {
            res.sendFile(path.join(__dirname,'./Develop/public/notes.html'));
        }); 


        app.listen(PORT, () => {
            console.log(`API server now on port ${PORT}!`);
        });
        
        
        
        ///connection.end(
            
            
            
            
            