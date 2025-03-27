import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/Socketprovider";

const CreateInterview = () => {
    const [email, setEmail] = useState("");
    const [room, setRoom] = useState("");

    const socket = useSocket();
    const navigate = useNavigate();

    const handleSubmitForm = useCallback(
        (e) => {
            e.preventDefault();
            if (socket) {
                console.log("Emitting room:join event with data:", { email, room });
                socket.emit("room:join", { email, room });
            } else {
                console.error("Socket is not initialized.");
            }
        },
        [email, room, socket]
    );

    const handleJoinRoom = useCallback(
        (data) => {
            console.log("Received room:join event with data:", data);
            const { email, room } = data;
            navigate(`/room/${room}`);
        },
        [navigate]
    );

    useEffect(() => {
        if (!socket) {
            console.error("Socket is not initialized.");
            return;
        }

        console.log("Setting up room:join listener.");
        socket.on("room:join", handleJoinRoom);
        return () => {
            console.log("Cleaning up room:join listener.");
            socket.off("room:join", handleJoinRoom);
        };
    }, [socket, handleJoinRoom]);

    if (!socket) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <h1 className="text-2xl font-bold text-gray-700">Connecting...</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-blue-600 mb-8">Join a Room</h1>
            <form
                onSubmit={handleSubmitForm}
                className="bg-white shadow-md rounded-lg p-8 w-96"
            >
                <div className="mb-6">
                    <label
                        htmlFor="email"
                        className="block text-gray-700 font-medium mb-2"
                    >
                        Email ID
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="room"
                        className="block text-gray-700 font-medium mb-2"
                    >
                        Room Number
                    </label>
                    <input
                        type="text"
                        id="room"
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter room number"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                    Join
                </button>
            </form>
        </div>
    );
};

export default CreateInterview;