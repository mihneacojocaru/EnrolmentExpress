import express from "express";

import StundentRepository from "../Repository/StudentRepository.js";

let studentRoute = express.Router();

let stRepo = new StundentRepository();

function asyncHandler(callBack){
  return async (req,res,next) => {
    try {
      await callBack(req,res,next);

    } catch (error) {
      
      next(error);
    }
  }
}

studentRoute.get("/", asyncHandler(async (req,res,next) => {
  let items = await stRepo.getStudents();
  res.status(200).json(items);
}));

studentRoute.post("/", asyncHandler(async (req,res,next) =>{
  let item = req.body;
  stRepo.newStudentsList(item);
  res.status(200).json("Student succesfully added");
}));

studentRoute.delete("/:id", asyncHandler(async (req,res,next) => {
  let {id} = req.params;
  let test = await stRepo.verifyItem(id);
  if(test == true){
    stRepo.deleteStudent(id);
    res.status(200).json("Deleted successfuly");
  }else{
    req.id = id;
    next();
  }
}));

studentRoute.use((req,res,next)=>{
  let errMsg = `Student with id #${req.id} wasn't found.`;
  next(errMsg);
});

studentRoute.put("/",asyncHandler(async(req,res,next) =>{
  let item = req.body;
  stRepo.updateStudents(item);
  res.status(200).json("Updated successfuly");
}));

export default studentRoute;