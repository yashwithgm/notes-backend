const mongoose = require('mongoose');

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.static('build'));
app.use(cors());
app.use(express.json());


const Note = require('./models/note');

app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id)
        .then(note => response.json(note));
});

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes);
    })
})

function generateId() {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(note => note.id))
        : 0;

    return maxId + 1;
}

app.post('/api/notes', (request, response) => {
    const body = request.body;

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        });
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
    });

    note.save().then(savedNote => {
        response.json(savedNote);
    });

});

app.delete('/api/notes/:id', (request, response) => {
    notes = notes.filter(note => note.id !== id);
    response.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})