import express from 'express';
import CoursesRepository from '../Repository/CoursesRepository.js';

const coursesRoute = express.Router();
const courseRepo = new CoursesRepository();

function asyncHandler(callBack){
    return async (req,res,next) => {
        try {
            await callBack(req,res,next);
        } catch (error) {
            next(error);
        }
    }
}

coursesRoute.get('/', asyncHandler(async(req,res,next)=>{
    let items = await courseRepo.getCourses();
    res.status(200).json(items);
}));

coursesRoute.post('/', asyncHandler(async(req,res,next)=>{
    let item = req.body;
    //courseRepo.newCourseList(item);
    res.status(200).json("New course sucessfuly added");
}));

coursesRoute.delete('/:courseId', asyncHandler(async(req,res,next)=>{
    let {courseId} = req.params; 
    //--> Same as: let id = req.params.courseId;
    courseRepo.deleteCourse(courseId);
    res.status(200).json('Deleted successfuly');
}));

coursesRoute.put('/:studentId/:courseId', asyncHandler(async(req,res,next)=>{
    //courseRepo.updateEnrolmentsList(req.body,req.params.studentId,req.params.courseId);
    res.status(200).json("You've been succesfully enroled");
}));

export default coursesRoute;