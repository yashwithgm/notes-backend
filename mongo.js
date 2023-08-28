const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://yashchrono:${password}@cluster0.gazxzmk.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false);
mongoose.connect(url);

const noteSchema = mongoose.Schema({
    content: String,
    important: Boolean
});

const Note = mongoose.model('Note', noteSchema);

// const note = new Note({
//     content: 'HTML is easy',
//     important: true
// });

// const note2 = new Note({
//     content: 'CSS is hard',
//     important: false
// });

// const note3 = new Note({
//     content: 'Mongoose makes things easy',
//     important: true
// });

// note3.save().then(result => {
//     console.log('note saved');
//     console.log(result);
//     console.log('Result type', typeof result);
//     mongoose.connection.close();
// })

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note);
    });
    mongoose.connection.close();
})