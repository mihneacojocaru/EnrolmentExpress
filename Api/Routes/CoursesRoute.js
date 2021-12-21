import express from 'express';
import CoursesRepository from '../Repository/CoursesRepository.js';

const coursesRoute = express.Router();
const courseRepo = new CoursesRepository();

coursesRoute.get('/', async (req,res)=>{
    try {
        let items = await courseRepo.getCourses();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

export default coursesRoute;