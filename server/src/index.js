import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { TodoRouter } from '../routes/todos.js';


const app = express();

app.use(express.json());
app.use(cors());

app.use("/todos", TodoRouter);

mongoose.connect("mongodb+srv://useer:1234@tododb.xbl68hd.mongodb.net/todoDB?retryWrites=true&w=majority",
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }
);

app.listen(3001, () => console.log("SERVER STARTED!"));
