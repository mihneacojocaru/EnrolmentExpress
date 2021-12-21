import express from 'express';

import EnrolmentRepository from '../Repository/EnrolmentRepository.js';

const enrolmentRoute = express.Router();

const enrolmentRepo = new EnrolmentRepository();

enrolmentRoute.get("/", async (req, res) => {
    try {
      let items = await enrolmentRepo.getEnrolment();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

enrolmentRoute.post('/', (req,res)=>{
    try {
        let item = req.body;
        enrolmentRepo.newEnrolmentsList(item);
        res.status(200).json("You've been succesfully enroled");
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

enrolmentRoute.delete('/:studentId/:courseId', (req,res) =>{
    try {
        //let {id} = {... req.params};
        enrolmentRepo.deleteEnrolment(req.params.studentId,req.params.courseId);
        res.status(200).json('Deleted successfuly');
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

enrolmentRoute.put('/:studentId/:courseId', (req,res)=>{
    try {
        enrolmentRepo.updateEnrolmentsList(req.body,req.params.studentId,req.params.courseId);
        res.status(200).json("You've been succesfully enroled");
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

export default enrolmentRoute;