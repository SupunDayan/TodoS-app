import express from 'express';
import {TodoModel} from '../models/Todos.js'


const router = express.Router();

router.get("/", async (req,res)=>{
    try{
        const todos = await TodoModel.find();
        res.json(todos);
    }catch(err){
        console.error(err);
    }  
});

router.post("/new", async (req,res)=>{
    try{
        const todo = new TodoModel({
            text:req.body.text
        });
        await todo.save();
        res.json(todo);    
    }catch(err){
        console.error(err);
    }  
});


router.delete("/delete/:id", async (req,res)=>{
    try{
        const response = await TodoModel.findByIdAndDelete(req.params.id);
        res.json(response);
    }catch(err){
        console.error(err);
    }  
});

router.put("/complete/", async (req,res)=>{
    try{
        const todo = await TodoModel.findById(req.body.id);
        todo.complete = !todo.complete;
        await todo.save();
        res.json(todo);
    }catch(err){
        console.error(err);
    }  
});

router.put("/update/", async (req,res)=>{
    try{
        const todo = await TodoModel.findByIdAndUpdate(req.body.id);
        todo.text = req.body.text;
        await todo.save();
        res.json(todo);
    }catch(err){
        console.error(err);
    }  
});


export {router as TodoRouter}

