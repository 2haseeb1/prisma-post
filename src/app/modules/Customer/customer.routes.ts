import { Router } from 'express';
import { createCustomer, getCustomerById, deleteCustomer } from './customer.service';

const router = Router();

// POST /api/customers - Create a new customer
router.post('/', async (req, res) => {
  try {
    const customerData = req.body;
    const newCustomer = await createCustomer(customerData);
    const { updatedAt, ...responseData } = newCustomer;
    res.status(201).json({
      success: true,
      message: 'Customer created successfully',
      data: responseData,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      status: 500,
      message: 'Failed to create customer',
      stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
    });
  }
});

// GET /api/customers/:customerId - Fetch a customer by ID
router.get('/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params;
    const customer = await getCustomerById(customerId);
    if (!customer) {
     res.status(404).json({
        success: false,
        status: 404,
        message: `Customer with ID ${customerId} not found`,
        stack: process.env.NODE_ENV !== 'production' ? new Error().stack : undefined,
      });
      return;
    }
    const { updatedAt, ...responseData } = customer;
    res.status(200).json({
      success: true,
      message: 'Customer fetched successfully',
      data: responseData,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      status: 500,
      message: 'Failed to fetch customer',
      stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
    });
  }
});

// DELETE /api/customers/:customerId - Delete a customer by ID
router.delete('/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params;
    const customer = await deleteCustomer(customerId);
    if (!customer) {
       res.status(404).json({
        success: false,
        status: 404,
        message: `Customer with ID ${customerId} not found`,
        stack: process.env.NODE_ENV !== 'production' ? new Error().stack : undefined,
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Customer deleted successfully',
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      status: 500,
      message: 'Failed to delete customer',
      stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
    });
  }
});

export default router;