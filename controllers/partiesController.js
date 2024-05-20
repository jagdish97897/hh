
const partiesRegistration = require('../models/Parties');

// Controller function to create a new customer registration
const allpartiesRegistration = async (req, res) => {
    try {
        const {
            type,
            code,
            lastCode,
            name,
            printAs,
            group,
            expenseType,
            subType,
            controllingBranch,
            parentAccount,
            contact,
            correctAddress,
            gst,
            tds,
            itr,
            generalDetails,
            bankDetails
           
         
        } = req.body;

        // Validate all required fields
        if (!type || !code || !name || !contact || !correctAddress) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Validate contact address fields
        const contactKeys = ['Address', 'City', 'PIN', 'State', 'Country', 'Person', 'Mobile', 'Email'];
        for (const key of contactKeys) {
            if (!contact[key]) {
                return res.status(400).json({ message: `Contact ${key} field is required.` });
            }
        }

        // Validate correct address fields
        const correctAddressKeys = ['Address', 'PIN', 'City', 'State', 'Country'];
        for (const key of correctAddressKeys) {
            if (!correctAddress[key]) {
                return res.status(400).json({ message: `Correct address ${key} field is required.` });
            }
        }

        const gstKeys = ['registrationType', 'servicesType', 'defaultGST'];
        for (const key of gstKeys) {
            if (!gst[key]) {
                return res.status(400).json({ message: `gst ${key} field is required.` });
            }
        }

        const tdsKeys = ['declarationFor', 'tdsStatus', 'tdsCode'];
        for (const key of tdsKeys) {
            if (!tds[key]) {
                return res.status(400).json({ message: `tds ${key} field is required.` });
            }
        }

        const generalDetailsKeys = ['partyStatus', 'paymentMethod', 'allocated','deliveryPaymentMode','deliveryAt','paymentBase','consignmentAttachReport'];
        for (const key of generalDetailsKeys) {
            if (!generalDetails[key]) {
                return res.status(400).json({ message: `generalDetails ${key} field is required.` });
            }
        }



       

        // Create new customer registration
        const newCustomerRegistration = new partiesRegistration({
            type,
            code,
            lastCode,
            name,
            printAs,
            group,
            expenseType,
            subType,
            controllingBranch,
            parentAccount,
            contact,
            correctAddress,
            gst,
            tds,
            itr,
            generalDetails,
            bankDetails
           
          
        });

        // Save the new customer registration
        const savedCustomerRegistration = await newCustomerRegistration.save();
        res.status(201).json(savedCustomerRegistration);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller for retrieving customers of type Customer1
const getCustomer1 = async (req, res) => {
    try {
      const customers = await partiesRegistration.find({ type: 'Customer1' });
      res.json(customers);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  // Controller for retrieving customers of type Customer2
  const getCustomer2 = async (req, res) => {
    try {
      const customers = await partiesRegistration.find({ type: 'Customer2' });
      res.json(customers);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


module.exports = {
    allpartiesRegistration, getCustomer1, getCustomer2
};


// const partiesRegistration = require('../models/Parties');

// // Controller function to create a new customer registration
// const allpartiesRegistration = async (req, res) => {
//     try {
//         const {
//             type,
//             code,
//             lastCode,
//             name,
//             printAs,
//             group,
//             expenseType,
//             subType,
//             controllingBranch,
//             parentAccount,
//             contact,
//             correctAddress,
//             gst,
//             tds,
//             itr,
//             generalDetails,
//             bankDetails,
//             applicationBranch
           
         
//         } = req.body;

//         // Validate all required fields
//         if (!type || !code || !name || !contact || !correctAddress) {
//             return res.status(400).json({ message: "All fields are required." });
//         }

//         // Validate contact address fields
//         const contactKeys = ['Address', 'City', 'PIN', 'State', 'Country', 'Person', 'Mobile', 'Email'];
//         for (const key of contactKeys) {
//             if (!contact[key]) {
//                 return res.status(400).json({ message: `Contact ${key} field is required.` });
//             }
//         }

//         // Validate correct address fields
//         const correctAddressKeys = ['Address', 'PIN', 'City', 'State', 'Country'];
//         for (const key of correctAddressKeys) {
//             if (!correctAddress[key]) {
//                 return res.status(400).json({ message: `Correct address ${key} field is required.` });
//             }
//         }

//         const gstKeys = ['registrationType', 'servicesType', 'defaultGST'];
//         for (const key of gstKeys) {
//             if (!gst[key]) {
//                 return res.status(400).json({ message: `gst ${key} field is required.` });
//             }
//         }

//         const tdsKeys = ['declarationFor', 'tdsStatus', 'tdsCode'];
//         for (const key of tdsKeys) {
//             if (!tds[key]) {
//                 return res.status(400).json({ message: `tds ${key} field is required.` });
//             }
//         }

//         const generalDetailsKeys = ['partyStatus', 'paymentMethod', 'allocated','deliveryPaymentMode','deliveryAt','paymentBase','consignmentAttachReport'];
//         for (const key of generalDetailsKeys) {
//             if (!generalDetails[key]) {
//                 return res.status(400).json({ message: `generalDetails ${key} field is required.` });
//             }
//         }



       

//         // Create new customer registration
//         const newCustomerRegistration = new partiesRegistration({
//             type,
//             code,
//             lastCode,
//             name,
//             printAs,
//             group,
//             expenseType,
//             subType,
//             controllingBranch,
//             parentAccount,
//             contact,
//             correctAddress,
//             gst,
//             tds,
//             itr,
//             generalDetails,
//             bankDetails,
//             applicationBranch
           
          
//         });

//         // Save the new customer registration
//         const savedCustomerRegistration = await newCustomerRegistration.save();
//         res.status(201).json(savedCustomerRegistration);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };


// const getAllCustomers = async (req, res) => {
//     try {
//         // Retrieve all customer registrations from the database
//         const allCustomers = await partiesRegistration.find({ type: 'customer' });

//         // Send the retrieved customer registrations in the response
//         res.status(200).json(allCustomers);
//     } catch (error) {
//         // Handle errors
//         res.status(500).json({ message: error.message });
//     }
// };


// const getAllDrivers = async (req, res) => {
//     try {
//         // Retrieve all driver registrations from the database
//         const allDrivers = await partiesRegistration.find({ type: 'driver' });

//         // Send the retrieved driver registrations in the response
//         res.status(200).json(allDrivers);
//     } catch (error) {
//         // Handle errors
//         res.status(500).json({ message: error.message });
//     }
// };


// const getAllBrokers = async (req, res) => {
//     try {
//         // Retrieve all broker registrations from the database
//         const allBrokers = await partiesRegistration.find({ type: 'broker' });

//         // Send the retrieved broker registrations in the response
//         res.status(200).json(allBrokers);
//     } catch (error) {
//         // Handle errors
//         res.status(500).json({ message: error.message });
//     }
// };
// module.exports = {
//     allpartiesRegistration,  getAllCustomers, getAllDrivers, getAllBrokers 
// };





// // Controller function to create a new customer registration
// const createCustomerRegistration = async (req, res) => {
//     try {
//         const {
//             type,
//             code,
//             lastCode,
//             name,
//             printAs,
//             group,
//             expenseType,
//             subType,
//             controllingBranch,
//             parentAccount,
//             contact,
//             correctAddress
//         } = req.body;

//         // Validate all fields
//         if (!type || !code || !name || !contact || !correctAddress) {
//             return res.status(400).json({ message: "All fields are required." });
//         }

//         // Validate contact address fields
//         const {
//             Address: contactAddress,
//             City: contactCity,
//             PIN: contactPIN,
//             State: contactState,
//             Country: contactCountry,
//             Person: contactPerson,
//             Mobile: contactMobile,
//             Email: contactEmail
//         } = contact;

//         if (!contactAddress || !contactCity || !contactPIN || !contactState || !contactCountry || !contactPerson || !contactMobile || !contactEmail) {
//             return res.status(400).json({ message: "Contact address fields are required." });
//         }

//         // Validate correct address fields
//         const {
//             Address: correctAddressAddress,
//             PIN: correctAddressPIN,
//             City: correctAddressCity,
//             State: correctAddressState,
//             Country: correctAddressCountry
//         } = correctAddress;

//         if (!correctAddressAddress || !correctAddressPIN || !correctAddressCity || !correctAddressState || !correctAddressCountry) {
//             return res.status(400).json({ message: "Correct address fields are required." });
//         }

//         // Create new customer registration
//         const newCustomerRegistration = new CustomerRegistration({
//             type,
//             code,
//             lastCode,
//             name,
//             printAs,
//             group,
//             expenseType,
//             subType,
//             controllingBranch,
//             parentAccount,
//             contact: {
//                 Address: contactAddress,
//                 City: contactCity,
//                 PIN: contactPIN,
//                 State: contactState,
//                 Country: contactCountry,
//                 Person: contactPerson,
//                 Mobile: contactMobile,
//                 Email: contactEmail
//             },
//             correctAddress: {
//                 Address: correctAddressAddress,
//                 PIN: correctAddressPIN,
//                 City: correctAddressCity,
//                 State: correctAddressState,
//                 Country: correctAddressCountry
//             }
//         });

//         // Save the new customer registration
//         const savedCustomerRegistration = await newCustomerRegistration.save();
//         res.status(201).json(savedCustomerRegistration);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };
// module.exports = {
//     createCustomerRegistration
//   };