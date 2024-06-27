const Service = require('../models/service-model');

const getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addService = async (req, res) => {
    try {
        const { provider, price, serviceName, description } = req.body;
        const newService = new Service({ provider, price, serviceName, description });
        if(!provider || !price || !serviceName || !description){
            res.status(404).json({ message: 'All must be filled' });
        }
        await newService.save();
        res.status(201).json(newService);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateService = async (req, res) => {
    const { id } = req.params;
    const { provider, price, serviceName, description } = req.body;

    try {
        const updatedService = await Service.findByIdAndUpdate(
            id,
            { provider, price, serviceName, description },
            { new: true }
        );

        if (!updatedService) {
            return res.status(404).json({ error: 'Service not found' });
        }

        res.json(updatedService);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteService = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedService = await Service.findByIdAndDelete(id);

        if (!deletedService) {
            return res.status(404).json({ error: 'Service not found' });
        }

        res.json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllServices, addService, deleteService, updateService };
