import { rejects } from 'assert';
import fs from 'fs';
import { resolve } from 'path';

export const getMaterials = () => {

    return new Promise( (resolve,reject) => {

        fs.readFile('data.json','utf-8',(err,data)=>{
            if(err){
                reject(err);
            }else{
                const d = JSON.parse(data);
                resolve(d);
            }
        })

    });
}

export const saveNewMaterials = (data) =>{

    return new Promise((resolve,reject)=>{
        fs.writeFile('data.json',JSON.stringify(data,null,2),(err)=>{
            if(err){
                reject(err);
            }else{
                resolve('Succeded');
            }
        })
    })


}

export const newMaterialsList = async (obj) =>{
    try {
        let materials = await getMaterials();

        let newMaterial = {id:nextId(materials), ...obj};

        materials.push(newMaterial);

        await saveNewMaterials(materials);
    } catch (error) {
        console.warn(error);
    }
}

const nextId = list => {
    let idList = [];

    list.forEach(element => {
        idList.push(element.id);
    });

    return idList.pop() + 1;
}

export const deleteMaterial = async id => {
    try {
        let materials = await getMaterials();
        materials = materials.filter(e=>e.id!=id);
        await saveNewMaterials(materials);

    } catch (error) {
        console.warn(error);
    }
}

export const updateMaterial = async item => {
    try {
        let materials = await getMaterials();

        for(let i=0; i<materials.length; i++){
            if(materials[i].id == item.id){
                materials[i] = item;
            }

            await saveNewMaterials(materials);
        }

    } catch (error) {
        console.warn(error);
    }
}