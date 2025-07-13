const ConsultationRequest = require('../models/consultation');

const createRequest = async (req, res) => {
  console.log('createRequest - received data:', req.body);
  try {
    const consultation = new ConsultationRequest({ ...req.body });
    console.log('createRequest - attempting to save:', consultation);
    await consultation.save();
    console.log('createRequest - saved successfully');
    res.status(201).json(consultation);
  } catch (err) {
    console.error('createRequest - error:', err);
    res.status(500).json({ error: err.message });
  }
};

const getAllRequests = async (req, res) => {
  try {
    const requests = await ConsultationRequest.find().populate('client');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRequestsByCompanySize = async (req, res) => {
  try {
    const { companySize } = req.params;
    const requests = await ConsultationRequest.find({ companySize });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRequestsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const requests = await ConsultationRequest.find({ status });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createRequest,
  getAllRequests,
  getRequestsByCompanySize,
  getRequestsByStatus
};