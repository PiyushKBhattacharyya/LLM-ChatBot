import express from "express";
import cors from "cors";
import ImageKit from "imagekit";
import mongoose from "mongoose";
import UserChats from "./models/userChats.js"
import Chat from "./models/chat.js";

const port = process.env.PORT || 3000;
const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL,
    })
);

app.use(express.json())

const connect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO)
        console.log("Connected to MongoDB")
    }catch(err){
        console.log(err);
    }
}

const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

app.get('/api/upload', (req,res)=>{
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
});

app.post('/api/chats', async (req,res)=>{
    const { userId, text } = req.body
    try{
        const newChat = new Chat({
            userId: userId,
            history:[{
                role:"user",
                parts:[{text}]
            }]
        });

        const savedChat = await newChat.save();

        const userChats = await UserChats.find({userId:userId});

        if(!userChats.length){
            const newUserChats = new UserChats({
                userId:userId,
                chats: [
                    {
                        _id:savedChat.id,
                        title:text.substring(0, 40),
                    }
                ]
            })
            await newUserChats.save();
        }else{
            await UserChats.updateOne({userId:userId},{
                $push:{
                    chats:{
                        _id:savedChat._id,
                        title: text.substring(0, 40)
                    }
                }
            })
        }
    }catch(err){
        console.log(err)
        res.status(500).send("error creating chat")
    }
});

app.listen(port, ()=>{
    connect()
    console.log(`Server is running on port ${port}`);
});