const mongoose = require('mongoose');

const DistanceSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: [{
        destination: {
            type: String,
            required: true
        },
        distance: {
            type: String,
            required: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Distance', DistanceSchema);





// const mongoose = require('mongoose');

// const DistanceSchema = new mongoose.Schema({
//     origin: {
//         type: String,
//         required: true
//     },
//     destination: {
//         type: String,
//         required: true
//     },
//     distance: {
//         type: String,
//         required: true
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// module.exports = mongoose.model('Distance', DistanceSchema);
