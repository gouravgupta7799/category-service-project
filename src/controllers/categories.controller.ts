import dbModuleInstance from "../db";
import { Categories } from "../models/categories";


const categoriesRepository = dbModuleInstance.getRepository(Categories);


export const createCategories = async (req, res): Promise<any> => {
    try {
        let { categoriename } = req.body;

        const createCategory = categoriesRepository.create({
            name: categoriename,
        });

        const categorie = await categoriesRepository.save(createCategory);

        res.status(200).json({ message: 'categorie created successfully', categorie: categorie });

    } catch (error) {
        return error
    }
}

export const categories = async (req, res): Promise<any> => {
    try {
        let allCategories = categoriesRepository
            .createQueryBuilder('cat')
            .leftJoinAndSelect('cat.service', 'service');

        const [categories, totalCount] = await allCategories.getManyAndCount();

        res.status(200).json({ totalCount: totalCount, categories: categories });

    } catch (error) {
        console.log(error)
    }
}

export const categorie = async (req, res): Promise<any> => {

    try {
        let { categoryId } = req.params
        let categories = categoriesRepository
            .createQueryBuilder('cat')
            .leftJoinAndSelect('cat.service', 'service')
            .where('cat.id =:id', { id: categoryId })

        const categorie = await categories.getOne();

        res.status(200).json({ categories: categorie });

    } catch (error) {
        console.log(error)
    }
}

export const updateCategorie = async (req, res): Promise<any> => {

    try {
        let { categoryId } = req.params
        let {categoriename} = req.body
        let categories = categoriesRepository
            .createQueryBuilder('cat')
            .leftJoinAndSelect('cat.service', 'service')
            .where('cat.id =:id', { id: categoryId })

        const categorie = await categories.getOne();

        if (!categorie) {
            res.status(404).json({ msg: 'not found' });
        }

        let updateCat = await categoriesRepository
            .createQueryBuilder()
            .update()
            .set({ name: categoriename })
            .where('id =:id', { id: categoryId })
            .execute();

        if (updateCat.affected == 1) {
            res.status(200).json({ msg: 'categorie updated succefully', categorie: updateCat.raw });
        }
    } catch (error) {
        console.log(error)
    }

}

export const deleteCategorie = async (req, res): Promise<any> => {
    try {
        let { categoryId } = req.params
        let categories = categoriesRepository
            .createQueryBuilder('cat')
            .leftJoinAndSelect('cat.service', 'service')
            .where('cat.id =:id', { id: categoryId })

        const categorie = await categories.getOne();

        if (!categorie) {
            res.status(404).json({ msg: 'not found' });
        }

        let deletedCat = await categoriesRepository
            .createQueryBuilder()
            .delete()
            .where('id =:id', { id: categoryId })
            .execute();

        res.status(200).json({ msg: 'categorie deleted succefully' });
    } catch (error) {
        console.log(error)
    }
}
