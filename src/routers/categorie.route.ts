import express, { Router } from 'express';
const router: Router = express.Router();
import { createCategories,categorie,categories,deleteCategorie,updateCategorie } from '../controllers/categories.controller'
import { createCategoriesService, categoriesServices, categoriesService, updateCategoriesService,deleteCategoriesService } from '../controllers/serivce.controller'

router.post('/', createCategories);
router.get('/categories', categories);
router.get('/:categoryId', categorie);
router.put('/:categoryId', updateCategorie);
router.delete('/:categoryId', deleteCategorie);




router.post('/categoryId/service', createCategoriesService);
router.get('/:categoryId/services', categoriesServices);
router.get('/:categoryId/services', categoriesService);
router.put('/:categoryId/service/:serviceId', updateCategoriesService);
router.delete(':categoryId/service/:serviceId', deleteCategoriesService);
export default router;
