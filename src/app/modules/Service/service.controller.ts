import { RequestHandler } from 'express';
import * as serviceService from './service.service';

export const createService: RequestHandler = async (req, res) => {
  try {
    const service = await serviceService.createService(req.body);
    res.status(201).json({ success: true, message: 'Service created successfully', data: service });
  } catch (error) {
    res.status(400).json({
      success: false,
      status: 400,
      message: (error as Error).message,
      stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined,
    });
  }
};

export const getServiceById: RequestHandler = async (req, res) => {
  try {
    const service = await serviceService.getServiceById(req.params.serviceId);
    if (!service) {
      res.status(404).json({ success: false, status: 404, message: 'Service not found' });
    } else {
      res.status(200).json({ success: true, message: 'Service fetched successfully', data: service });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: (error as Error).message,
      stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined,
    });
  }
};

export const updateService: RequestHandler = async (req, res) => {
  try {
    const service = await serviceService.updateService(req.params.serviceId, req.body);
    res.status(200).json({ success: true, message: 'Service updated successfully', data: service });
  } catch (error) {
    res.status(400).json({
      success: false,
      status: 400,
      message: (error as Error).message,
      stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined,
    });
  }
};

export const deleteService: RequestHandler = async (req, res) => {
  try {
    await serviceService.deleteService(req.params.serviceId);
    res.status(200).json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: (error as Error).message,
      stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined,
    });
  }
};

export const completeService: RequestHandler = async (req, res) => {
  try {
    const { completionDate } = req.body;
    const service = await serviceService.completeService(req.params.serviceId, completionDate);
    res.status(200).json({ success: true, message: 'Service completed successfully', data: service });
  } catch (error) {
    res.status(400).json({
      success: false,
      status: 400,
      message: (error as Error).message,
      stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined,
    });
  }
};

export const getPendingOrOverdueServices: RequestHandler = async (req, res) => {
  try {
    const services = await serviceService.getPendingOrOverdueServices();
    res.status(200).json({
      success: true,
      message: 'Pending or overdue services fetched successfully',
      data: services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: (error as Error).message,
      stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined,
    });
  }
};