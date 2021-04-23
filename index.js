const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true }) //connects to MongoDB with connection string
mongoose.connect('mongodb://localhost/mongo-musician', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }) //connects to MongoDB with connection string
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

// async function createCourse() {
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


// Deleting Documents:
async function deleteMusician(id) { // Mosh uses function: removeMusician(id)
    // const result = await Musician.deleteOne({ _id: id, }); // or: .deleteMany()
    // console.log(result);
    const musician = await Musician.findByIdAndRemove(id);
    // returns 'null' if no musician by given id
    console.log(musician);
}
    
deleteMusician('6081f54f59c060e2afe7c7e7');
