const express = require('express');

const router = express.Router();

const { getAllServices, addService, updateService, deleteService } = require('../controllers/service-controller');

router.get('/services', getAllServices);

router.post('/services', addService);

router.put('/services/:id', updateService);

router.delete('/services/:id', deleteService);

module.exports = router;
