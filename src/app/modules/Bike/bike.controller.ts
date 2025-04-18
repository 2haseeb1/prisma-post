import { RequestHandler } from 'express';
import * as bikeService from './bike.service';

export const createBike: RequestHandler = async (req, res) => {
  try {
    const bike = await bikeService.createBike(req.body);
    res.status(201).json({ success: true, message: 'Bike added successfully', data: bike });
    return;
  } catch (error) {
    res.status(400).json({
      success: false,
      status: 400,
      message: (error as Error).message,
      stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined,
    });
    return;
  }
};

export const getAllBikes: RequestHandler = async (req, res) => {
  try {
    const bikes = await bikeService.getAllBikes();
    res.status(200).json({ success: true, message: 'Bikes fetched successfully', data: bikes });
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: (error as Error).message,
      stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined,
    });
    return;
  }
};

export const getBikeById: RequestHandler = async (req, res) => {
  try {
    const bike = await bikeService.getBikeById(req.params.bikeId);
    if (!bike) {
      res.status(404).json({ success: false, status: 404, message: 'Bike not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Bike fetched successfully', data: bike });
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: (error as Error).message,
      stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined,
    });
    return;
  }
};