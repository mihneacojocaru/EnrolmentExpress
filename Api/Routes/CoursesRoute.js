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

coursesRoute.post('/', (req,res)=>{
    try {
        let item = req.body;
        //courseRepo.newCourseList(item);
        res.status(200).json("New course sucessfuly added");
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

coursesRoute.delete('/:studentId/:courseId', (req,res) =>{
    try {
        //let {id} = {... req.params};
        //courseRepo.deleteEnrolment(req.params.studentId,req.params.courseId);
        res.status(200).json('Deleted successfuly');
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

coursesRoute.put('/:studentId/:courseId', (req,res)=>{
    try {
        //courseRepo.updateEnrolmentsList(req.body,req.params.studentId,req.params.courseId);
        res.status(200).json("You've been succesfully enroled");
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

export default coursesRoute;