import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { io } from "../lib/socket.js";
import { getReceiverSocketId } from "../lib/socket.js";

// Get all users excluding the logged in user from the sidebar
//yaha pe loggedInUserId se logged in user ki id nikal rahe hai
//fir filteredUsers me loggedInUserId ke alawa sare users ko find kar rahe hai
//fir filteredUsers ko select kar ke password ko exclude kar rahe hai
//fir filteredUsers ko response me bhej rahe hai
export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUsersForSidebar controller", error.message);
        res.status(500).json({message: "Internal server error" });
    }
};

// Get messages between two users
//yaha pe userToChatId se user ki id nikal rahe hai
//fir myId me loggedIn user ki id nikal rahe hai
export const getMessages = async (req, res) => {
    try {
        const { id:userToChatId }=req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                {senderId: myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId},
            ],
        });
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller", error.message);
        res.status(500).json({message: "Internal server error" });
    }
}

// Send a new message
export const sendMessage = async (req, res) => {
    try {
        const {image , text} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });
        await newMessage.save();

        // todo real time functionality ke liye socket.io ka use karenge
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
           io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller", error.message);
        res.status(500).json({message: "Internal server error" });
    }
}