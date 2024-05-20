const express = require('express');
const router = express.Router();
const {  createSupplyChainPartner, getBrokers,getOwners } = require('../controllers/supplyChainPartnerController');

router.post('/allsupplychainpartnerRegistration',  createSupplyChainPartner);

router.get('/supply-chain-partners/brokers', getBrokers);

router.get('/supply-chain-partners/owners', getOwners);


module.exports = router;
