// const mongoose = require('mongoose');

// // mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true }) //connects to MongoDB with connection string
// mongoose.connect('mongodb://localhost/mongo-musician', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }) //connects to MongoDB with connection string
// // this connection string will change when in production environment and will not be hardcoded, it will come from config file
// // .connect returns promise
//     .then(() => console.log('Connected to MongoDB...'))
//     .catch(err => console.error('Could not connect to MongoDB...', err))

// const musicianSchema = new mongoose.Schema({
//     name: String,
//     genre: String,
//     tags: [ String ],
//     // date: Date
//     date: { type: Date, default: Date.now}, //we won't have to specify manually
//     isActive: Boolean,
//     bookingPrice: Number
// });

// const Musician = mongoose.model('Musician', musicianSchema); // Musician is a Class not an object

// async function createMusician() {
//     // make new object:
//     const musician = new Musician({
//         name: "Phoebe Bridgers",
//         genre: "Folk-rock",
//         tags: ['Saddest Factory', 'Punisher'], //document can be a complex object in MongoDB
//         isActive: true,
//         bookingPrice: 10000
//     });

//     const result = await musician.save(); //async operation
//     console.log("Result", result);
// };

// createMusician();

// async function getMusicians() {
//     const musicians = await Musician.find();
//     console.log(musicians)
// };

// // filtered: 
// async function getMusicians() {
//     const musicians = await Musician.find({ name: "Phoebe Bridgers" });
//     console.log(musicians)
// };

// // Complex Query: 
// async function getMusicians() {
//     const musicians = await Musician
//         .find({ name: "Phoebe Bridgers" })
//         .limit(10)
//         .sort({ name: 1 })  // 1 for sorting in ascending order // -1 -> descending
//         .select({ name: 1, tags: 1 })

//     console.log(musicians)
// };

// // Comparison Operators
// async function getMusicians() {
//     const musicians = await Musician
//         // .find({ bookingPrice: { $gt: 9000} }) // looking for a bookingPrice greater than 9000
//         // .find({ bookingPrice: { $gt: 9000, $lte: 10000 } }) // looking for a bookingPrice greater than 9000 / less than or equal to 10000
//         .find({ bookingPrice: { $in: [7000, 7050, 8000] }}) //find bookingPrice that matches any of the values in our array
//         .limit(10)
//         .sort({ name: 1 })  // 1 for sorting in ascending order // -1 -> descending
//         // .select({ name: 1, tags: 1 })

//     console.log(musicians)
// } 

// // Logical Operators
// async function getMusicians() {
//     const musicians = await Musician
//         .find()  // without any filters
//         // .or([{name: "Starcrawler"}, {isActive: true}]) //each object in the array of 'or' will be a filter - the result will be if one or the other filter is true
//         .and([{name: "Starcrawler"}, {isActive: true}]) // each object in the array of 'and' will be a filter - the result will be if both filters are true
//         .limit(10)
//         .sort({ name: 1 })  // 1 for sorting in ascending order // -1 -> descending
//         // .select({ name: 1, tags: 1 })

//     console.log(musicians)
// } 

// // Regular Expressions
// async function getMusicians() {
//     const musicians = await Musician
//         // name starts with Phoebe:
//         // .find({ name: /^Phoebe/ })  
//         // ^ -> string that starts with something

//         // ends with Bridgers:
//         // .find({ name: /Bridgers$/ })  
//         // $ -> string ends with something
        
//         // case insensitive:
//         // .find({ name: /Bridgers$/i })  
//         // i -> case insensitive

//         // contains star:
//         .find({ name: /.*star.*/i }) 

//         .limit(10)
//         .sort({ name: 1 }) 

//     console.log(musicians)
// } 

// // Count
// async function getMusicians() {
//     const musicians = await Musician
//         .find({ bookingPrice: { $in: [7000, 7500, 8000] }}) 
//         .limit(10)
//         .sort({ name: 1 })  
//         .count();

//     console.log(musicians)
// } 

// // Pagination
// async function getMusicians() {
//     const pageNumber = 2;
//     const pageSize = 10;
//     // /api/musicians?pageNumber=2&pageSize=10

//     const musicians = await Musician
//         .find({ bookingPrice: { $in: [7000, 7500, 8000] }}) 
//         .skip((pageNumber-1) * pageSize)
//         .limit(pageSize)
//         .sort({ name: 1 })  

//     console.log(musicians)
// } 

// // exercise:
// async function getMusicians() {
//     const musicians = await Musician
//         .find({ isActive: true }) 
//         .sort({ name: 1 })  
//         .select({ name: 1, genre: 1 })

//     console.log(musicians)
// };

// getMusicians();


// // same as above:
// async function getMusicians() {
//     return await Musician
//     .find({ isActive: true }) 
//     .sort('name') // '-name' for descending
//     .select('name genre')
// };

// async function run() {
//     const musicians = await getMusicians();
//     console.log(musicians);
// };

// run();

// async function getMusicians() {
//     return await Musician
//     .find({ isActive: true })
//     // .find({ isActive: true, tags: { $in: ['Saddest Factory', 'Arrow de Wilde'] } })

//     // .find({ isActive: true })
//     // .or([ { tags: 'Saddest Factory' }, { tags: 'Arrow de Wilde' } ])
//     .sort('-bookingPrice')
//     .select('name bookingPrice isActive')
// };

// async function run() {
//     const musicians = await getMusicians();
//     console.log(musicians);
// };

// run();

// async function getMusicians() {
//     return await Musician
//     .find()
//     .or([{ bookingPrice: { $gte: 16000  }}, { name: /.*sound.*/i }])
//     // .find({ isActive: true, tags: { $in: ['Saddest Factory', 'Arrow de Wilde'] } })

//     // .find({ isActive: true })
//     // .or([ { tags: 'Saddest Factory' }, { tags: 'Arrow de Wilde' } ])
// };

// async function run() {
//     const musicians = await getMusicians();
//     console.log(musicians);
// };

// run();


// // #1: Query First
    // // receive input from client and make sure update is valid operation


// async function updateMusician(id) {
//     // findById()
//     const musician = await Musician.findById(id);
    
//     if (!musician) return;
    
//     // Modify
//       // musician.isActive = true
//       // musician.genre = 'Another Genre'
    
//     musician.set({ //same as above
//         isActive: true,
//         genre: 'Alternative Rock'
//     });
    
//    // Save
//     const result = await musician.save();
//     console.log(result);
// };

// updateMusician('6081f54f59c060e2afe7c7e5'); // <- change id according to your unique id key/value

// // ObjectId("6081f54f59c060e2afe7c7e5") -> unique id of musician



// // Updating a Doc - #2: Update First
//     // not receiving input and just want to update directly
// async function updateMusician(id) {
// // Update Directly:
//     // const result = await Musician.updateOne({ _id: id }, { //updateMany
//     const musician = await Musician.findByIdAndUpdate(id, {
//         $set: {
//             isActive: true,
//             genre: 'Alternative Rock'
//         }
//     }, { new: true }); // this argument makes sure the return value is updated doc, otherwise it logs the orginal doc before update
// // Optionally get updated doc:
//     console.log(musician);
// }

// updateMusician('6081f54f59c060e2afe7c7e5');


// // Deleting Documents:
// async function deleteMusician(id) { // Mosh uses function: removeMusician(id)
//     // const result = await Musician.deleteOne({ _id: id, }); // or: .deleteMany()
//     // console.log(result);
//     const musician = await Musician.findByIdAndRemove(id);
//     // returns 'null' if no musician by given id
//     console.log(musician);
// }
    
// deleteMusician('6081f54f59c060e2afe7c7e7');



// ----------------------------VALIDATORS: --------------------------------------------------

// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/mongo-validates-musician', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }) 
//     .then(() => console.log('Connected to MongoDB...'))
//     .catch(err => console.error('Could not connect to MongoDB...', err))

// const musicianSchema = new mongoose.Schema({
//     name: { type: String, required: true }, // validates that name is always present & only meaningful in mongoose not mongodb
//     genre: String,
//     tags: [ String ],
//     date: { type: Date, default: Date.now}, 
//     isActive: Boolean,
//     bookingPrice: Number
// });

// const Musician = mongoose.model('Musician', musicianSchema);

// async function createMusician() {
//     const musician = new Musician({
//         //  name: "Phoebe Bridgers",
//         genre: "Folk-rock",
//         tags: ['Saddest Factory', 'Punisher'],
//         isActive: true,
//         bookingPrice: 10000
//     });
    
//     try {
//         // await musician.validate() // returns Promise<void> NOT a boolean 
//         // await musician.validate((err) => {
//         //     if (err) {}
//         // })
//         // const result = await musician.save();
//         // console.log("Result", result);
//     }
//     catch (error) {
//         console.log("Error Message", error.message)
//     }
// };

// createMusician();

// ------------------------BUILT IN VALIDATORS FOR STRINGS AND NUMBERS: ----------------------------------------------------


// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/mongo-validates-musician', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }) 
//     .then(() => console.log('Connected to MongoDB...'))
//     .catch(err => console.error('Could not connect to MongoDB...', err))

// const musicianSchema = new mongoose.Schema({
//     name: { 
//         type: String, 
//         required: true, // simple boolean
//         minlength: 5,
//         maxlength: 255, //characters
//         // match: /pattern/ // regex
//     },
//     genre: {
//         type: String,
//         required: true,
//         enum: ['rock', 'grunge', 'folk-rock', 'alternative-rock', 'punk'], // genre must always be one of these values, otherwise get a validation error
//     }, 
//     tags: [ String ],
//     date: { type: Date, default: Date.now}, 
//     isActive: Boolean,
//     bookingPrice: {
//         type: Number,
//         // function to conditionally make a property required (in example below, only required if isActive === true )
//         required: function() { return this.isActive; }, // can not replace this with Arrow function -> arrow function does not have a 'this'
//         min: 1500,
//         max: 50000
//     }
// });

// const Musician = mongoose.model('Musician', musicianSchema);

// async function createMusician() {
//     const musician = new Musician({
//         name: "Phoebe Bridgers",
//         genre: "-",
//         tags: ['Saddest Factory', 'Punisher'],
//         isActive: false,
//         bookingPrice: 10000
//     });
    
//     try {
//         const result = await musician.save();
//         console.log("Result", result);
//     }
//     catch (error) {
//         console.log("Error Message", error.message)
//     }
// };

// createMusician();


// ---------------------CUSTOM VALIDATOR:-----------------------------------------------


// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/mongo-validates-musician', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }) 
//     .then(() => console.log('Connected to MongoDB...'))
//     .catch(err => console.error('Could not connect to MongoDB...', err))

// const musicianSchema = new mongoose.Schema({
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
//     }, 
//     // tags: [ String ], 
//     // enforce rule that tags have atleast one value:
//     tags: {
//         type: Array,
//         validate: {
//             validator: function(value) {
//                 return value && value.length > 0 // if value exists and value.length is greater than 0, than this property is valid
//             },
//             message: 'A musician should have atleast one tag.' // this message will display in instance where validation criteria not met
//         }
//     },
//     date: { type: Date, default: Date.now}, 
//     isActive: Boolean,
//     bookingPrice: {
//         type: Number,
//         required: function() { return this.isActive; },
//         max: 50000
//     }
// });

// const Musician = mongoose.model('Musician', musicianSchema);

// async function createMusician() {
//     const musician = new Musician({
//         name: "Phoebe Bridgers",
//         genre: "folk-rock",
// //         tags: ['Saddest Factory', 'Punisher'],
//         tags: [],
//         isActive: false,
//         bookingPrice: 10000
//     });
    
//     try {
//         const result = await musician.save();
//         console.log("Result", result);
//     }
//     catch (error) {
//         console.log("Error Message", error.message)
//     }
// };

// createMusician();


// // ---------------------ASYNC VALIDATORs:-----------------------------------------------

// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/mongo-validates-musician', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }) 
//     .then(() => console.log('Connected to MongoDB...'))
//     .catch(err => console.error('Could not connect to MongoDB...', err))

// const musicianSchema = new mongoose.Schema({
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
//     }, 
//     tags: {
//         type: Array,
//         validate: {
//             isAsync: true,
//             validator: function(value, callback) {
//                 setTimeout(() => {
//                     const result = value && value.length > 0;
//                     callback(result);
//                 }, 4000);
//             },
//             message: 'A musician should have at least one tag.'
//         }
//     },
//     date: { type: Date, default: Date.now}, 
//     isActive: Boolean,
//     bookingPrice: {
//         type: Number,
//         required: function() { return this.isActive; },
//         max: 50000
//     }
// });

// const Musician = mongoose.model('Musician', musicianSchema);

// async function createMusician() {
//     const musician = new Musician({
//         name: "Phoebe Bridgers",
//         genre: "folk-rock",
//         tags: ['Saddest Factory', 'Punisher'],
//         isActive: true,
//         bookingPrice: 10000
//     });
    
//     try {
//         const result = await musician.save();
//         console.log("Result", result);
//     }
//     catch (exception) {
//         console.log("Error Message", exception.message)
//     }
// };

// createMusician();

// // ---------------------VALIDATION ERRORS: -----------------------------------------------

// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/mongo-validates-musician', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }) 
//     .then(() => console.log('Connected to MongoDB...'))
//     .catch(err => console.error('Could not connect to MongoDB...', err))

// const musicianSchema = new mongoose.Schema({
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
//     }, 
//     tags: {
//         type: Array,
//         validate: {
//             validator: function(value) {
//                 return value && value.length > 0 
//             },
//             message: 'A musician should have atleast one tag.'
//         }
//     },
//     date: { type: Date, default: Date.now}, 
//     isActive: Boolean,
//     bookingPrice: {
//         type: Number,
//         required: function() { return this.isActive; },
//         max: 50000
//     }
// });

// const Musician = mongoose.model('Musician', musicianSchema);

// async function createMusician() {
//     const musician = new Musician({
//         name: "Phoebe Bridgers",
//         genre: "-",
//         tags: null,
//         isActive: true,
//         bookingPrice: 10000
//     });
    
//     try {
//         const result = await musician.save();
//         console.log("Result", result);
//     }
//     catch (exception) {
//         for (field in exception.errors) {
//             console.log(exception.errors[field]) // or: console.log(exception.errors[field].message -> for just the error message
//         }
//     }
// };

// createMusician();


// ---------------------SCHEMAtype object validations: : -----------------------------------------------

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
        lowercase: true, // convert value automatically to lowercase
        // uppercase: true, // convert value automatically to uppercase
        trim: true, // auto remove any paddings around string
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
        // custom getter and setter:
        get: v => Math.round(v), // v <=> value // this get is especially helpful for values that might have been set before the specification was set // Setters let you transform user data before it gets to MongoDB
        set: v => Math.round(v) // let you transform user data before it gets to MongoDB
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
            console.log(exception.errors[field]) // or: console.log(exception.errors[field].message -> for just the error message
        }
    }
};

createMusician();