import dbModuleInstance from "../db";
import { Categories } from "../models/categories";
import { Service } from "../models/service";
import { ServicePrice } from "../models/servicePrice";


const categoriesRepository = dbModuleInstance.getRepository(Categories);
const serviceRepository = dbModuleInstance.getRepository(Service);
const priceRepository = dbModuleInstance.getRepository(ServicePrice);


export const createCategoriesService = async (req, res): Promise<any> => {
    try {
        // let { categorieId, serviceName, serviceType, Duration, Price, priceType } = req.body;

        // let categorie = await categoriesRepository
        //     .createQueryBuilder('cat')
        //     .leftJoinAndSelect('cat.service', 'service')
        //     .where('cat.id =:id', { id: categorieId })
        //     .getOne();

        // if (!categorie) {
        //     res.status(404).json({ msg: "not found" })
        // }

        // let priceObj = await priceRepository.create({
        //     Duration: Duration,
        //     Price: Price,
        //     Type: priceType
        // });


        // const price = await priceRepository.save(priceObj);

        // const createservice = serviceRepository.create({
        //     serviceName: serviceName,
        //     type: serviceType,
        //     priceType: price
        // });

        // const serivce = await serviceRepository.save(createservice);


        // let updateCat = await categoriesRepository
        //     .createQueryBuilder()
        //     .update()
        //     .set({ service: serivce })
        //     .where('id =:id', { id: categorieId })
        //     .execute();


        // res.status(200).json({ message: 'service created successfully' });

    } catch (error) {
        return error
    }
}

export const categoriesServices = async (req, res): Promise<any> => {
    try {

        let { categoryId } = req.params
        let categories = categoriesRepository
            .createQueryBuilder('cat')
            .leftJoinAndSelect('cat.service', 'service')
            .where('cat.id =:id', { id: categoryId })

        const categorie = await categories.getOne();

        if (!categorie) {
            res.status(404).json({ msg: "not found" })
        }

        res.status(200).json({ categorieService: categories["service"] || [] });

    } catch (error) {
        return error
    }
}

export const categoriesService = async (req, res): Promise<any> => {
    try {

        let { categoryId, serviceId } = req.params
        let categories = categoriesRepository
            .createQueryBuilder('cat')
            .leftJoinAndSelect('cat.service', 'service')
            .where('cat.id =: catId AND service.id := serId', { catId: categoryId, serId: serviceId })
            .getOne();

        if (!categories) {
            res.status(404).json({ msg: "not found" })
        }

        res.status(200).json({ categorieService: categories["service"] || [] });

    } catch (error) {
        return error
    }
}

export const updateCategoriesService = async (req, res): Promise<any> => {
    try {
        let { serviceId } = req.params;
        let { serviceName, serviceType } = req.params

        let categories = categoriesRepository
            .createQueryBuilder('cat')
            .leftJoinAndSelect('cat.service', 'service')
            .where('cat.id =: catId AND service.id := serId', { serId: serviceId })
            .getOne();

        if (!categories) {
            res.status(404).json({ msg: "not found" })
        }

        let deletedCatSer = await serviceRepository
            .createQueryBuilder()
            .update()
            .set({ serviceName: serviceName, type: serviceType })
            .where('service.id := serId', { serId: serviceId })
            .execute();


        res.status(200).json({ msg: 'service from categorie update succefully' });

    } catch (error) {
        return error
    }
}

export const deleteCategoriesService = async (req, res): Promise<any> => {
    try {

        let { categoryId, serviceId } = req.params

        let categories = categoriesRepository
            .createQueryBuilder('cat')
            .leftJoinAndSelect('cat.service', 'service')
            .where('cat.id =: catId AND service.id := serId', { catId: categoryId, serId: serviceId })
            .getOne();

        if (!categories) {
            res.status(404).json({ msg: "not found" })
        }

        let deletedCatSer = await serviceRepository
            .createQueryBuilder()
            .delete()
            .where('service.id := serId', { serId: serviceId })
            .execute();


        res.status(200).json({ msg: 'service from categorie remove succefully' });


    } catch (error) {
        return error
    }
}
