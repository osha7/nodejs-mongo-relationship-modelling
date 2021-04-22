const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true }) //connects to MongoDB with connection string
// this connection string will change when in production environment and will not be hardcoded, it will come from config file
// .connect returns promise
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

const musicianSchema = new mongoose.Schema({
    name: String,
    genre: String,
    tags: [ String ],
    // date: Date
    date: { type: Date, default: Date.now}, //we won't have to specify manually
    isActive: Boolean,
    bookingPrice: Number
});

const Musician = mongoose.model('Musician', musicianSchema); // Musician is a Class not an object

async function createCourse() {
    // make new object:
    const musician = new Musician({
        name: "Phoebe Bridgers",
        genre: "Folk-rock",
        tags: ['Saddest Factory', 'Punisher'], //document can be a complex object in MongoDB
        isActive: true,
        bookingPrice: 10000
    });

    const result = await musician.save(); //async operation
    console.log("Result", result);
};

// createCourse();

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

// Pagination
async function getMusicians() {
    const pageNumber = 2;
    const pageSize = 10;
    // /api/musicians?pageNumber=2&pageSize=10

    const musicians = await Musician
        .find({ bookingPrice: { $in: [7000, 7500, 8000] }}) 
        .skip((pageNumber-1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 })  

    console.log(musicians)
} 

getMusicians();

