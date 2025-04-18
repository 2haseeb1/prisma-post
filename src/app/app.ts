import express, { Request, Response } from 'express';

import bikeRoutes from '../app/modules/Bike/bike.routes';
import customerRoutes from '../app/modules/Customer/customer.routes';
import serviceRoutes from '../app/modules/Service/service.routes';
import config from './config';



const app = express();

app.use(express.json()); // This middleware is required to parse JSON bodies

app.use('/api/bikes', bikeRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/services', serviceRoutes);
app.post('/api/test', (req: Request, res: Response) => {
    res.json({ body: req.body });
  });
app.get('/', (req: Request, res: Response) => {
  res.json({ success: true, message: 'Bike Servicing API - Modular Structure' });
});

app.use((err: Error, req: Request, res: Response, next: Function) => {
  res.status(500).json({
    success: false,
    status: 500,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(config.port, () => {
  console.log(`Server running on port http://localhost:${config.port}`);
});