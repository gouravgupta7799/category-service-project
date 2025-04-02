import express, { Router } from 'express';
const router: Router = express.Router();
import { createCategories,categorie,categories,deleteCategorie,updateCategorie } from '../controllers/categories.controller'
import { createCategoriesService } from '../controllers/serivce.controller'

router.post('/', createCategories);
router.get('/categories', categories);
router.get('/:categoryId', categorie);
router.put('/:categoryId', updateCategorie);
router.delete('/:categoryId', deleteCategorie);




router.post('/categoryId/service', createCategoriesService);
router.get('/:categoryId/services', createCategories);
router.put('/:categoryId/service/:serviceId', createCategories);
router.delete(':categoryId/service/:serviceId', createCategories);
export default router;
