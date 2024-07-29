import React, { useState, useEffect } from 'react';
import './customer.css';
import useSocket from '../../hooks/useSocket';

const CustomerPage = () => {
    const socket = useSocket();
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (socket) {
            socket.on('receivedMessage', (data) => {
                alert(`Received message: ${data.message}`);
            });

            // Emit an event when the component mounts
            // socket.emit('someEvent', { data: 'test' });

            // Cleanup on component unmount
            // return () => {
            //     socket.off('responseEvent');
            // };
        }
    }, [socket]);

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSendMessage = () => {
        if (message.trim()) {
            socket.emit('sendMessage', { message });
            setMessage(''); // Clear the input field
        }
    };

    return (
        <div className="customer-page">
            <h1>Customer</h1>
            <div className="message-container">
                <input
                    type="text"
                    value={message}
                    onChange={handleInputChange}
                    placeholder="Type your message here..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default CustomerPage;
