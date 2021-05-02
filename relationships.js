
// Mormalization: Using References

let musician = {
    name: "Phoebe Bridgers",
}

let song = {
    musician: "608db454b7817cc1be56c60c" // id 
}

// Denormalization: Using embedded documents

let song = {
    musician: {
        name: "Phoebe Bridgers",
    }
}

// Hybrid

let musician = {
    name: "Phoebe Bridgers",
    // a number of other properties...
}

let song = {
    author: {
        id: "608db454b7817cc1be56c60c",
        name: "Phoebe Bridgers"
    }
}
