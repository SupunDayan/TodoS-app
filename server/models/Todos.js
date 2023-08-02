import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    text:{
        type:String,
        required:false
    },
    complete:{
        type:Boolean,
        default:false
    },
    timestamp:{
        type:String,
        default:Date.now()
    },
    todoOwner: {type:mongoose.Schema.Types.ObjectId, ref:"users"}
});

export const TodoModel = mongoose.model("todos",TodoSchema);