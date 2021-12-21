import express from "express";

import StundentRepository from "../Repository/StudentRepository.js";

let studentRoute = express.Router();

let stRepo = new StundentRepository();

studentRoute.get("/", async (req, res) => {
  try {
    let items = await stRepo.getStudents();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

studentRoute.post("/", (req, res) => {
  try {
    let item = req.body;
    stRepo.newStudentsList(item);
    res.status(200).json("Student succesfully added");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

studentRoute.delete("/:id", (req, res) => {
  try {
    let { id } = req.params;
    stRepo.deleteStudent(id);
    res.status(200).json("Deleted successfuly");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

studentRoute.put("/", (req, res) => {
  try {
    let item = req.body;
    stRepo.updateStudents(item);
    res.status(200).json("Updated successfuly");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default studentRoute;