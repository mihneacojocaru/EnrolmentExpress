import express from 'express';
import cors from 'cors';

const app = express();

const port = 3500;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

app.get('/', (req,res)=>{
    res.status(200).json("Merge treaba!");
});

app.listen(port, ()=>console.log("Listenting on port " + port));