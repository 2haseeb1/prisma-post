import { Router } from 'express';
import { createService, getServiceById, updateService, deleteService, completeService, getOverdueOrPendingServices } from './service.service';
import { Prisma } from '../../../generated/prisma';

const router = Router();

// POST /api/services - Create a new service record
router.post('/', async (req, res) => {
  try {
    const serviceData = req.body;
    const newService = await createService(serviceData);
    const { createdAt, updatedAt, ...responseData } = newService;
    res.status(201).json({
      success: true,
      message: 'Service record created successfully',
      data: responseData,
    });
  } catch (error) {
    const err = error as Error;
    const status = err.message.includes('Bike with ID') ? 404 : 500;
    res.status(status).json({
      success: false,
      status,
      message: err.message,
      stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
    });
  }
});

// GET /api/services/status - Fetch overdue or pending services (Bonus Feature)
router.get('/status', async (req, res) => {
  try {
    const services = await getOverdueOrPendingServices();
    const responseData = services.map(service => {
      const { createdAt, updatedAt, ...rest } = service;
      return rest;
    });
    res.status(200).json({
      success: true,
      message: 'Overdue or pending services fetched successfully',
      data: responseData,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      status: 500,
      message: 'Failed to fetch overdue or pending services',
      stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
    });
  }
});

// GET /api/services/:serviceId - Fetch a service record by ID
router.get('/:serviceId', async (req, res) => {
  try {
    const { serviceId } = req.params;
    const service = await getServiceById(serviceId);
    if (!service) {
       res.status(404).json({
        success: false,
        status: 404,
        message: `Service with ID ${serviceId} not found`,
        stack: process.env.NODE_ENV !== 'production' ? new Error().stack : undefined,
      });
      return;
    }
    const { createdAt, updatedAt, ...responseData } = service;
    res.status(200).json({
      success: true,
      message: 'Service record fetched successfully',
      data: responseData,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      status: 500,
      message: 'Failed to fetch service record',
      stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
    });
  }
});

// PUT /api/services/:serviceId - Update a service record by ID
router.put('/:serviceId', async (req, res) => {
  const { serviceId } = req.params;
  const updateData = req.body;
  try {
    const updatedService = await updateService(serviceId, updateData);
    const { createdAt, updatedAt, ...responseData } = updatedService;
    res.status(200).json({
      success: true,
      "message": "Service record updated successfully",
      data: responseData,
    });
  } catch (error) {
    const err = error as Prisma.PrismaClientKnownRequestError;
    if (err.code === 'P2025') {
       res.status(404).json({
        success: false,
        status: 404,
        message: `Service with ID ${serviceId} not found`,
        stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
      });
      return;
    }
    res.status(500).json({
      success: false,
      status: 500,
      message: 'Failed to update service record',
      stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
    });
  }
});

// DELETE /api/services/:serviceId - Delete a service record by ID
router.delete('/:serviceId', async (req, res) => {
  const { serviceId } = req.params;
  try {
    await deleteService(serviceId);
    res.status(200).json({
      success: true,
      message: 'Service record deleted successfully',
    });
  } catch (error) {
    const err = error as Prisma.PrismaClientKnownRequestError;
    if (err.code === 'P2025') {
      res.status(404).json({
        success: false,
        status: 404,
        message: `Service with ID ${serviceId} not found`,
        stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
      });
      return;
    }
    res.status(500).json({
      success: false,
      status: 500,
      message: 'Failed to delete service record',
      stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
    });
  }
});

// PUT /api/services/:serviceId/complete - Mark a service as completed
router.put('/:serviceId/complete', async (req, res) => {
  const { serviceId } = req.params;
  const { completionDate } = req.body;
  try {
    const completedService = await completeService(serviceId, completionDate);
    const { createdAt, updatedAt, ...responseData } = completedService;
    res.status(200).json({
      success: true,
      message: 'Service marked as completed successfully',
      data: responseData,
    });
  } catch (error) {
    const err = error as Prisma.PrismaClientKnownRequestError;
    if (err.code === 'P2025') {
      res.status(404).json({
        success: false,
        status: 404,
        message: `Service with ID ${serviceId} not found`,
        stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
      });
      return;
    }
    res.status(500).json({
      success: false,
      status: 500,
      message: 'Failed to mark service as completed',
      stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
    });
  }
});

export default router;