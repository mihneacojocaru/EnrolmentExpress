import express from 'express';
import cors from 'cors';
import { getMaterials, newMaterialsList, deleteMaterial, updateMaterial } from './repository.js';

const app = express();

const port = 3500;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

app.get('/', async (req,res)=>{
    try {
        let materials = await getMaterials();
        res.status(200).json(materials);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

app.post('/postMaterials', (req,res)=>{

    try {
        let newMaterial = req.body;
        newMaterialsList(newMaterial);
        res.status(200).json("Material succesfully added");
    } catch (error) {
        res.status(500).json({message:error.message});
    }

});

app.delete('/deleteItem/:id', (req,res) =>{
    try {
        let {id} = req.params;
        deleteMaterial(id);
        res.status(200).json('Deleted succesfuly');
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

app.put('/updateItem', (req,res)=>{
    try {
        let item = req.body;
        updateMaterial(item);
        res.status(200).json('Updated successfuly');
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

app.listen(port, ()=>console.log("Listenting on port " + port));