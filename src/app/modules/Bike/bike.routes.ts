import { Router } from 'express';
import { createBike, getBikeById, deleteBike, updateBike } from './bike.service';
import { Prisma } from '../../../generated/prisma';

const router = Router();

// POST /api/bikes - Create a new bike
router.post('/', async (req, res) => {
  try {
    const bikeData = req.body;
    const newBike = await createBike(bikeData);
    const { createdAt, updatedAt, ...responseData } = newBike;
    res.status(201).json({
      success: true,
      message: 'Bike added successfully',
      data: responseData,
    });
  } catch (error) {
    const err = error as Error;
    const status = err.message.includes('Customer with ID') ? 404 : 500;
    res.status(status).json({
      success: false,
      status,
      message: err.message,
      stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
    });
  }
});

// GET /api/bikes/:bikeId - Fetch a bike by ID
router.get('/:bikeId', async (req, res) => {
  try {
    const { bikeId } = req.params;
    const bike = await getBikeById(bikeId);
    if (!bike) {
      res.status(404).json({
        success: false,
        status: 404,
        message: `Bike with ID ${bikeId} not found`,
        stack: process.env.NODE_ENV !== 'production' ? new Error().stack : undefined,
      });
      return;
    }
    const { createdAt, updatedAt, ...responseData } = bike;
    res.status(200).json({
      success: true,
      message: 'Bike fetched successfully',
      data: responseData,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      status: 500,
      message: 'Failed to fetch bike',
      stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
    });
  }
});

// DELETE /api/bikes/:bikeId - Delete a bike by ID
router.delete('/:bikeId', async (req, res) => {
  const { bikeId } = req.params;
  try {
    await deleteBike(bikeId);
    res.status(200).json({
      success: true,
      message: 'Bike deleted successfully',
    });
  } catch (error) {
    const err = error as Prisma.PrismaClientKnownRequestError;
    if (err.code === 'P2025') {
      res.status(404).json({
        success: false,
        status: 404,
        message: `Bike with ID ${bikeId} not found`,
        stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
      });
      return;
    }
    res.status(500).json({
      success: false,
      status: 500,
      message: 'Failed to delete bike',
      stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
    });
  }
});

// PUT /api/bikes/:bikeId - Update a bike by ID
router.put('/:bikeId', async (req, res) => {
  const { bikeId } = req.params;
  const updateData = req.body;
  try {
    const updatedBike = await updateBike(bikeId, updateData);
    const { createdAt, updatedAt, ...responseData } = updatedBike;
    res.status(200).json({
      success: true,
      message: 'Bike updated successfully',
      data: responseData,
    });
  } catch (error) {
    const err = error as Prisma.PrismaClientKnownRequestError;
    if (err.code === 'P2025') {
      res.status(404).json({
        success: false,
        status: 404,
        message: `Bike with ID ${bikeId} not found`,
        stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
      });
      return;
    }
    res.status(500).json({
      success: false,
      status: 500,
      message: 'Failed to update bike',
      stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
    });
  }
});

export default router;