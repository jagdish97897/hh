// const axios = require('axios');
// const Distance = require('../models/Distance');

// const getDistance = async (req, res) => {
//     try {
//         const response = await axios.get(
//             'https://maps.googleapis.com/maps/api/distancematrix/json',
//             {
//                 params: {
//                     origins: req.body.sourcePincode,
//                     destinations: req.body.destinationPincode,
//                     key: 'AIzaSyAI0jFdBsZoRP00RGq050nfe24aSfj1mwo'
//                 }
//             }
//         );

//         console.log('res : ',response);

//         if (!response.data) {
//             throw new Error('Invalid pincode');
//         }
//         // Extract distance information
//         const distanceInfo = response?.data?.rows[0]?.elements[0];
//         const distanceText = distanceInfo?.distance?.text;
//         const distanceValue = distanceInfo?.distance?.value; // Distance in meters

//         // Convert distance to kilometers
//         const distanceInKm = distanceValue / 1000;

//         // Calculate rate (10000 INR per 500 km)
//         const quantumrate = Math.ceil(distanceInKm / 500) * 10000;

//         // Save the distance data to the database
//         const newDistance = new Distance({
//             origin: req.body.sourcePincode,
//             destination: req.body.destinationPincode,
//             distance: distanceText,
//             quantumrate: quantumrate
//         });

//         await newDistance.save();
//         console.log(distanceText, quantumrate);
//         return res.status(200).json({ distance: distanceText, quantumrate });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// module.exports = {
//     getDistance,
// };



// const axios = require('axios');
// const Distance = require('../models/Distance');

// const getDistance = async (req, res) => {
//     try {
//         const response = await axios.get(
//             'https://maps.googleapis.com/maps/api/distancematrix/json',
//             {
//                 params: {
//                     origins: req.body.sourcePincode,
//                     destinations: req.body.destinationPincode,
//                     key: 'AIzaSyAI0jFdBsZoRP00RGq050nfe24aSfj1mwo'
//                 }
//             }
//         );

//         console.log('res : ',response);

//         if (!response.data) {
//             throw new Error('Invalid pincode');
//         }

//         // Extract distance information
//         const distanceInfo = response?.data?.rows[0]?.elements[0];
//         const distance = distanceInfo?.distance?.text;

//         // Save the distance data to the database
//         const newDistance = new Distance({
//             origin: req.body.sourcePincode,
//             destination: req.body.destinationPincode,
//             distance: distance
//         });

//         await newDistance.save();

//         console.log(distance);
//         return res.status(200).json(distance);

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// module.exports = {
//     getDistance,
// };


// const axios = require('axios');
// const Distance = require('../models/Distance');

// const getDistance = async (req, res) => {
//     try {
//         const { sourcePincode, destinationPincodes } = req.body;

//         const response = await axios.get(
//             'https://maps.googleapis.com/maps/api/distancematrix/json',
//             {
//                 params: {
//                     origins: sourcePincode,
//                     destinations: destinationPincodes.join('|'),
//                     key: 'AIzaSyAI0jFdBsZoRP00RGq050nfe24aSfj1mwo'
//                 }
//             }
//         );

//         console.log('res:', response);

//         if (!response.data) {
//             throw new Error('Invalid pincode');
//         }

//         const destinations = response.data.destination_addresses.map((destination, index) => {
//             return {
//                 destination,
//                 distance: response.data.rows[0].elements[index].distance.text
//             };
//         });

//         // Save the distance data to the database
//         const newDistance = new Distance({
//             origin: sourcePincode,
//             destinations: destinations
//         });

//         await newDistance.save();

//         console.log(destinations);
//         return res.status(200).json(destinations);

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// module.exports = {
//     getDistance,
// };



// const axios = require('axios');
// const Distance = require('../models/Distance');

// const getDistance = async (req, res) => {
//     try {
//         const { sourcePincode, destinationPincodes } = req.body;

//         const distances = [];
//         let currentOrigin = sourcePincode;

//         for (let i = 0; i < destinationPincodes.length; i++) {
//             const response = await axios.get(
//                 'https://maps.googleapis.com/maps/api/distancematrix/json',
//                 {
//                     params: {
//                         origins: currentOrigin,
//                         destinations: destinationPincodes[i],
//                         key: 'AIzaSyAI0jFdBsZoRP00RGq050nfe24aSfj1mwo'
//                     }
//                 }
//             );

//             if (!response.data) {
//                 throw new Error('Invalid pincode');
//             }

//             const distance = response.data.rows[0].elements[0].distance.text;

//             // Save the distance data to the database
//             const newDistance = new Distance({
//                 from: currentOrigin,
//                 to: [{ destination: destinationPincodes[i], distance }]
//             });

//             await newDistance.save();

//             distances.push({ destination: destinationPincodes[i], distance });
//             currentOrigin = destinationPincodes[i]; // Set the current origin to the current destination
//         }

//         console.log(distances);
//         return res.status(200).json(distances);

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// module.exports = {
//     getDistance,
// };


// const axios = require('axios');
// const Distance = require('../models/Distance');

// const getDistance = async (req, res) => {
//     try {
//         const { sourcePincode, destinationPincodes } = req.body;

//         const distances = [];
//         const apiKey = 'AIzaSyAI0jFdBsZoRP00RGq050nfe24aSfj1mwo'; 

//         // Function to get distance between origin and destination
//         const fetchDistance = async (origin, destination) => {
//             const response = await axios.get(
//                 'https://maps.googleapis.com/maps/api/distancematrix/json',
//                 {
//                     params: {
//                         origins: origin,
//                         destinations: destination,
//                         key: apiKey
//                     }
//                 }
//             );

//             if (!response.data || response.data.status !== 'OK' || response.data.rows[0].elements[0].status !== 'OK') {
//                 throw new Error(`Invalid response for pincode ${destination}`);
//             }

//             return response.data.rows[0].elements[0].distance.text;
//         };

//         // Iterate over destination pincodes and get distances
//         for (const destinationPincode of destinationPincodes) {
//             const distance = await fetchDistance(sourcePincode, destinationPincode);
//             distances.push({ destination: destinationPincode, distance });
//         }

//         // Save all distances in a single database entry
//         const newDistance = new Distance({
//             from: sourcePincode,
//             to: distances
//         });

//         await newDistance.save();

//         console.log(distances);
//         return res.status(200).json(distances);

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// module.exports = {
//     getDistance,
// };


// const axios = require('axios');
// const Distance = require('../models/Distance');

// const getDistance = async (req, res) => {
//     try {
//         const { sourcePincode, destinationPincodes } = req.body;

//         // Google API key
//         const apiKey = 'AIzaSyAI0jFdBsZoRP00RGq050nfe24aSfj1mwo'; // Replace with your actual API key

//         // Function to get distance between origin and destination
//         const fetchDistance = async (origin, destination) => {
//             const response = await axios.get(
//                 'https://maps.googleapis.com/maps/api/distancematrix/json',
//                 {
//                     params: {
//                         origins: origin,
//                         destinations: destination,
//                         key: apiKey
//                     }
//                 }
//             );

//             if (!response.data || response.data.status !== 'OK' || response.data.rows[0].elements[0].status !== 'OK') {
//                 throw new Error(`Invalid response for pincode ${destination}`);
//             }

//             return response.data.rows[0].elements[0].distance.text;
//         };

//         // Make all API calls in parallel
//         const distancePromises = destinationPincodes.map(async destinationPincode => {
//             const distance = await fetchDistance(sourcePincode, destinationPincode);
//             return { destination: destinationPincode, distance };
//         });

//         // Wait for all promises to resolve
//         const distances = await Promise.all(distancePromises);

//         // Save all distances in a single database entry
//         const newDistance = new Distance({
//             from: sourcePincode,
//             to: distances
//         });

//         await newDistance.save();

//         console.log(distances);
//         return res.status(200).json(distances);

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// module.exports = {
//     getDistance,
// };


const axios = require('axios');
const Distance = require('../models/Distance');

const getDistance = async (req, res) => {
    try {
        const { sourcePincode, destinationPincodes } = req.body;
        const apiKey = 'AIzaSyAI0jFdBsZoRP00RGq050nfe24aSfj1mwo'; // Replace with your actual API key
        const distances = [];
        let currentOrigin = sourcePincode;

        // Function to get distance between origin and destination
        const fetchDistance = async (origin, destination) => {
            const response = await axios.get(
                'https://maps.googleapis.com/maps/api/distancematrix/json',
                {
                    params: {
                        origins: origin,
                        destinations: destination,
                        key: apiKey
                    }
                }
            );

            if (!response.data || response.data.status !== 'OK' || response.data.rows[0].elements[0].status !== 'OK') {
                throw new Error(`Invalid response for pincode ${destination}`);
            }

            return response.data.rows[0].elements[0].distance.text;
        };

        // Iterate over destination pincodes and get distances
        for (const destinationPincode of destinationPincodes) {
            const distance = await fetchDistance(currentOrigin, destinationPincode);
            distances.push({ destination: destinationPincode, distance });
            currentOrigin = destinationPincode; // Set the current origin to the current destination for the next iteration
        }

        // Save all distances in a single database entry
        const newDistance = new Distance({
            from: sourcePincode,
            to: distances
        });

        await newDistance.save();

        console.log(distances);
        return res.status(200).json(distances);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getDistance,
};
