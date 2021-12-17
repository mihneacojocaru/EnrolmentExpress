import express from 'express';
import cors from 'cors';
import { getStudents, getEnrolment, getCourses, newStudentsList, newEnrolmentsList, deleteStudent, updateStudents } from './repository.js';

const app = express();

const port = 3500;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
//+++ Getters
app.get('/students', async (req,res)=>{
    try {
        let items = await getStudents();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

app.get('/enrolment', async (req,res)=>{
    try {
        let items = await getEnrolment();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

app.get('/courses', async (req,res)=>{
    try {
        let items = await getCourses();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});
//+++ Posts
app.post('/postStudents', (req,res)=>{
    try {
        let item = req.body;
        newStudentsList(item);
        res.status(200).json("Student succesfully added");
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

app.post('/postEnrolment', (req,res)=>{
    try {
        let item = req.body;
        newEnrolmentsList(item);
        res.status(200).json("You've been succesfully enroled");
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

app.post('/postCourse', (req,res)=>{
    try {
        let item = req.body;
        newCoursesList(item);
        res.status(200).json("Course succesfully added");
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

//+++ Delete

app.delete('/deleteItem/:id', (req,res) =>{
    try {
        let {id} = req.params;
        deleteStudent(id);
        res.status(200).json('Deleted succesfuly');
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

//+++ Put

app.put('/updateItem', (req,res)=>{
    try {
        let item = req.body;
        updateStudents(item);
        res.status(200).json('Updated successfuly');
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})


//+++ Server Listen
app.listen(port, ()=>console.log("Listenting on port " + port));