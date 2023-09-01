const mongoose = require('mongoose');

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.static('build'));
app.use(cors());
app.use(express.json());


const Note = require('./models/note');

app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id)
        .then(note => {
            if (note) {
                response.json(note);
            } else {
                response.status(404).end();
            }
        })
        .catch(error => next(error));
});

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes);
    })
})

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

app.delete('/api/notes/:id', (request, response, next) => {
    Note.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end();
        })
        .catch(error => next(error));
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({
        error: 'unknown endpoint'
    });
}

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    console.log(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({
            error: 'malformed id'
        });
    }

    next(error);
}

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})