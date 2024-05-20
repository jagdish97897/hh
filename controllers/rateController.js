const Freight = require('../models/Rate');

const createFreightRate = async (req, res) => {
  const {
    contractNo,
    date,
    template,
    base,
    customer,
    poNo,
    poDate,
    consignor,
    consignee,
    billingBranch,
    applyOn,
    dateOn,
    source,
    destination,
    dateFrom,
    dateTo,
    serviceType,
    serviceMode,
    loadType,
    pkgsType,
    contentGroup,
    content,
    calculationBase,
    fillingStation,
    baseFuelRate,
    varianceFactor,
    vehicleAge,
    status
  } = req.body;

  try {
    const newFreightRate = new Freight({
      contractNo,
      date,
      template,
      base,
      customer,
      poNo,
      poDate,
      consignor,
      consignee,
      billingBranch,
      applyOn,
      dateOn,
      source,
      destination,
      dateFrom,
      dateTo,
      serviceType,
      serviceMode,
      loadType,
      pkgsType,
      contentGroup,
      content,
      calculationBase,
      fillingStation,
      baseFuelRate,
      varianceFactor,
      vehicleAge,
      status
    });

    const savedFreightRate = await newFreightRate.save();

    res.status(201).json(savedFreightRate);
  } catch (error) {
    console.error(error);
    res.status(400).json({ errorMessage: error.message });
  }
};

const getAllFreightRates = async (req, res) => {
  try {
    const freightRates = await Freight.find();
    res.status(200).json(freightRates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Failed to fetch freight rates. Please try again later.' });
  }
};

const updateFreightRateById = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedFreightRate = await Freight.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedFreightRate) {
      return res.status(404).json({ errorMessage: 'Freight rate not found.' });
    }
    res.status(200).json(updatedFreightRate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Failed to update freight rate.' });
  }
};

const getFreightRateById = async (req, res) => {
  const { id } = req.params;

  try {
    const freightRate = await Freight.findById(id);
    if (!freightRate) {
      return res.status(404).json({ errorMessage: 'Freight rate not found.' });
    }
    res.status(200).json(freightRate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Failed to fetch freight rate.' });
  }
};

module.exports = {
  createFreightRate, getAllFreightRates, updateFreightRateById, getFreightRateById
};
