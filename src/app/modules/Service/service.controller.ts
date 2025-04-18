import { Request, Response } from 'express';
import * as serviceService from './service.service';

export const createService = async (req: Request, res: Response) => {
  try {
    const service = await serviceService.createService(req.body);
    res.status(201).json({
      success: true,
      message: 'Service record created successfully',
      data: service,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      status: 400,
      message: (error as Error).message,
      stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined,
    });
  }
};

export const getAllServices = async (req: Request, res: Response) => {
  try {
    const services = await serviceService.getAllServices();
    res.status(200).json({
      success: true,
      message: 'Service records fetched successfully',
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

export const getServiceById = async (req: Request, res: Response) => {
  try {
    const service = await serviceService.getServiceById(req.params.serviceId);
    if (!service) {
      res.status(404).json({
        success: false,
        status: 404,
        message: 'Service record not found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Service record fetched successfully',
      data: service,
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

export const completeService = async (req: Request, res: Response) => {
  try {
    const { completionDate } = req.body;
    const service = await serviceService.completeService(req.params.serviceId, completionDate);
    res.status(200).json({
      success: true,
      message: 'Service marked as completed',
      data: service,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      status: 400,
      message: (error as Error).message,
      stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined,
    });
  }
};

export const getPendingOrOverdueServices = async (req: Request, res: Response) => {
  try {
    const services = await serviceService.getPendingOrOverdueServices();
    res.status(200).json({
      success: true,
      message: 'Overdue or pending services fetched successfully',
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