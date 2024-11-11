import { Server } from 'socket.io';
import { MessageModel } from '../models/message.model.js';

export const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            credentials: true
        }
    });
    const userSocket = new Map();  // {userId : socketId}
    const userActivities = new Map(); // {userId : [activityId]}

    io.on("connection", (socket) => {
        socket.on("user_connected", (userId) => {
            userSocket.set(userId, socket.id);
            userActivities.set(userId, "Idle");

            // broadcast to all connected sockets that this user just logged in
            io.emit("user_connected", userId);

            socket.emit("users_online", Array.from(userSocket.keys()));

            io.emit("activities", Array.from(userActivities.entries()));
        })
        socket.on("update_activity", ({ userId, activity }) => {
            userActivities.set(userId, activity);
            io.emit("activity_updated", { userId, activity });
        });

        socket.on("send_message", async (data) => {
            try {
                const { senderId, receiverId, content } = data;
                const message = await MessageModel.create({ senderId, receiverId, content });

                // send to reciever in realtime, if user is online
                const receiverSocket = userSocket.get(receiverId);
                if (receiverSocket) {
                    io.to(receiverSocket).emit("receive_message", message);
                }

                socket.to(receiverSocket).emit("message_sent", message);
            } catch (error) {
                console.log("Message Error : " + error);
                socket.emit("message_error", error.message);

            }
        })

        socket.on("disconnect", () => {
            let disconnectedUserId;
            for (const [userId, socketId] of userSocket.entries()) {
                // find disconnected user
                if (socketId === socket.id) {
                    disconnectedUserId = userId;
                    userSocket.delete(userId);
                    userActivities.delete(userId);
                    break;
                }
            }
            if (disconnectedUserId) {
                // broadcast to all connected sockets that this user just logged out
                io.emit("user_disconnected", disconnectedUserId);
            }
        })
    })
}