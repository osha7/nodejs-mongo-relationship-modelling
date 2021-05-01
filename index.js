const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-validates-musician', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }) 
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
        required: true,
        enum: ['rock', 'grunge', 'folk-rock', 'alternative-rock', 'punk'], 
        lowercase: true,
        trim: true, 
    }, 
    tags: {
        type: Array,
        validate: {
            validator: function(value) {
                return value && value.length > 0 
            },
            message: 'A musician should have atleast one tag.'
        }
    },
    date: { type: Date, default: Date.now}, 
    isActive: Boolean,
    bookingPrice: {
        type: Number,
        required: function() { return this.isActive; },
        min: 1,
        max: 50000,
        get: v => Math.round(v), 
        set: v => Math.round(v)
    }
});

const Musician = mongoose.model('Musician', musicianSchema);

async function createMusician() {
    const musician = new Musician({
        name: "Phoebe Bridgers",
        genre: "Folk-rock",
        tags: ['Saddest Factory', 'Punisher'],
        isActive: true,
        bookingPrice: 13.3
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

createMusician();