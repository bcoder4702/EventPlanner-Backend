import { Router } from 'express';
import { createBudget, getBudgetsByEventId } from '../controllers/budgets';
import Validators from '../middlewares/validators/budgets';


const router = Router();


router.post('/',Validators.createBudget,createBudget);
// fetching all the budget by providing the event id
router.get('/:id',Validators.getBudgetsByEventId,getBudgetsByEventId)


export default router;