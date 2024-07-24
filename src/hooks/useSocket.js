import { useEffect, useState } from "react";
import io from "socket.io-client";

const useSocket = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketIo = io("http://localhost:3000"); // replace with your server URL
        setSocket(socketIo);

        // Cleanup on component unmount
        return () => {
            socketIo.disconnect();
        };
    }, []);

    return socket;
};

export default useSocket;
