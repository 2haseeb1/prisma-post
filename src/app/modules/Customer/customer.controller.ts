import { RequestHandler } from 'express';
import * as customerService from './customer.service';

export const createCustomer: RequestHandler = async (req, res) => {
  try {
    const customer = await customerService.createCustomer(req.body);
    res.status(201).json({ success: true, message: 'Customer created successfully', data: customer });
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

export const getAllCustomers: RequestHandler = async (req, res) => {
  try {
    const customers = await customerService.getAllCustomers();
    res.status(200).json({ success: true, message: 'Customers fetched successfully', data: customers });
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

export const getCustomerById: RequestHandler = async (req, res) => {
  try {
    const customer = await customerService.getCustomerById(req.params.customerId);
    if (!customer) {
      res.status(404).json({ success: false, status: 404, message: 'Customer not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Customer fetched successfully', data: customer });
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

export const updateCustomer: RequestHandler = async (req, res) => {
  try {
    const customer = await customerService.updateCustomer(req.params.customerId, req.body);
    res.status(200).json({ success: true, message: 'Customer updated successfully', data: customer });
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

export const deleteCustomer: RequestHandler = async (req, res) => {
  try {
    await customerService.deleteCustomer(req.params.customerId);
    res.status(200).json({ success: true, message: 'Customer deleted successfully' });
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