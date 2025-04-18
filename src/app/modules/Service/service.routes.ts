import { Router } from 'express';
import { createService, getServiceById, updateService, deleteService, completeService, getPendingOrOverdueServices } from './service.controller';
import validateRequest from '../../middleware/validateRequest';
import { createServiceSchema, updateServiceSchema, completeServiceSchema } from './service.validation';

const router = Router();

router.post('/', validateRequest(createServiceSchema), createService);
router.get('/:serviceId', getServiceById);
router.put('/:serviceId', validateRequest(updateServiceSchema), updateService);
router.delete('/:serviceId', deleteService);
router.patch('/:serviceId/complete', validateRequest(completeServiceSchema), completeService);
router.get('/status/pending-or-overdue', getPendingOrOverdueServices);

export default router;