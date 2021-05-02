// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/mongo-relationship-playground', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }) 
//     .then(() => console.log('Connected to MongoDB...'))
//     .catch(err => console.error('Could not connect to MongoDB...', err))

// const Musician = mongoose.model('Musician', new mongoose.Schema({
//     name: { 
//         type: String, 
//         required: true,
//         minlength: 5,
//         maxlength: 255,
//     },
//     genre: {
//         type: String,
//         required: true,
//         enum: ['rock', 'grunge', 'folk-rock', 'alternative-rock', 'punk'], 
//         lowercase: true,
//         trim: true, 
//     },
//     isActive: Boolean,
//     bookingPrice: {
//         type: Number,
//         required: function() { return this.isActive; },
//         min: 1,
//         max: 50000,
//         get: v => Math.round(v), 
//         set: v => Math.round(v)
//     },
//     date: { type: Date, default: Date.now}
// }));

// const Song = mongoose.model('Song', new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         minLength: 1,
//         maxLength: 20
//     },
//     musician: {
//         type: mongoose.Schema.Types.ObjectId, // this ObjectId references a 'Musician' object
//         ref: 'Musician' 
//     }
// }));

// async function createMusician(name, genre, isActive, bookingPrice) {
//     const musician = new Musician({
//         name,
//         genre,
//         isActive,
//         bookingPrice,
//     });
    
//     try {
//         const result = await musician.save();
//         console.log("Result", result);
//     }
//     catch (exception) {
//         for (field in exception.errors) {
//             console.log(exception.errors[field]) 
//         }
//     }
// };

// async function createSong(name, musician) {
//     const song = new Song({
//         name,
//         musician
//     });
//     try {
//         const result = await song.save();
//         console.log("Result", result);
//     }
//     catch (exception) {
//         for (field in exception.errors) {
//             console.log(exception.errors[field]) 
//         }
//     }
// };

// async function listSongs() {
//     const songs = await Song
//     .find()
//     // .select('name');
//     .populate('musician', 'name -_id') // queries the musician collection in MongoDB // -_id --> excludes the id property
//     .select('name musician')
//     console.log(songs);
// };

// // createMusician('Phoebe Bridgers', 'folk-rock', true, 2500);
// // createSong('Kyoto', '608dc6fc074aa9e78b9cf96a')

// listSongs();

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-relationship-playground', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }) 
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

const musicianSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    genre: {
        type: String,
        // required: true,
        enum: ['rock', 'grunge', 'folk-rock', 'alternative-rock', 'punk'], 
        lowercase: true, 
        trim: true,
    }, 
    date: { type: Date, default: Date.now}, 
    isActive: Boolean,
    bookingPrice: {
        type: Number,
        // required: function() { return this.isActive; },
        min: 1,
        max: 50000,
        get: v => Math.round(v), 
        set: v => Math.round(v) 
    }
});
    
const Musician = mongoose.model('Musician', musicianSchema);

const Song = mongoose.model('Song', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 20
    },
    // musician: {
    //     type: mongoose.Schema.Types.ObjectId, // this ObjectId references a 'Musician' object
    //     ref: 'Musician' 
    // }

    // musician: musicianSchema

    // to require musician:
    // musician: {
    //     type: mmusicianSchema,
    //     required: true
    // }

    // array of sub-documents:
    musicians: [musicianSchema]
}));

async function createMusician(name, genre, isActive, bookingPrice) {
    const musician = new Musician({
        name,
        genre,
        isActive,
        bookingPrice,
    });
    
    try {
        const result = await musician.save();
        console.log("Result", result);
    }
    catch (exception) {
        for (field in exception.errors) {
            console.log(exception.errors[field]) 
        }
    }
};

// async function createSong(name, musician) {
//     const song = new Song({
//         name,
//         musician
//     });
//     try {
//         const result = await song.save();
//         console.log("Result", result);
//     }
//     catch (exception) {
//         for (field in exception.errors) {
//             console.log(exception.errors[field]) 
//         }
//     }
// };

async function createSong(name, musicians) {
    const song = new Song({
        name,
        musicians
    });
    try {
        const result = await song.save();
        console.log("Result", result);
    }
    catch (exception) {
        for (field in exception.errors) {
            console.log(exception.errors[field]) 
        }
    }
};

// update sub-document by Query first:
// async function updateMusician(songId) {
//     const song = await Song.findById(songId);
//     song.musician.name = "Another Band Name";
//     song.save();
//     console.log(song);
// };

// update sub-document directly:
async function updateMusician(songId) {
    const song = await Song.update({ _id: songId }, {
        $set: {
            'musician.name': "Phoebe Bridgers" 
        }
        // to remove entire sub-document:
        // $unset: {
        //     'musician': "" 
        // }
    });
    console.log(song);
};

async function listSongs() {
    const songs = await Song
    .find()
    // .select('name');
    .populate('musician', 'name -_id')
    .select('name musician')
    console.log(songs);
};

async function addMusician(songId, musician) {
    const song = await Song.findById(songId);
    song.musicians.push(musician);
    song.save();
    console.log(song);
};

async function removeMusician(songId, musicianId) {
    const song = await Song.findById(songId);
    const musician = song.musicians.id(musicianId);
    musician.remove();
    song.save();
};

// createSong('Kyoto', new Musician({ name: "Phoebe Bridgers" }));
// updateMusician('608dcbe85bfdf5ec4e7e71f6')

// createSong('Me & My Dog', [
//     new Musician({ name: "Phoebe Bridgers" }),
//     new Musician({ name: "Lucy Dacus" }),
//     // new Musician({ name: "Julien Baker" })
// ]);

// addMusician('608dd6625efd65f10dc07cd0', new Musician({ name: "Julien Baker" }));
removeMusician('608dd6625efd65f10dc07cd0', '608dd6625efd65f10dc07ccf');