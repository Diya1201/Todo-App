import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    // Initialize state to store the array of messages
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Fetch data from API
        axios.get('http://localhost:5000/api/data')
            .then(res => setMessages(res.data.messages)) // Set the array of messages
            .catch(err => console.log("Error fetching data:", err));
    }, []);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Messages : </h1>
            {messages.length > 0 ? (
                <ul>
                    {messages.map((message, index) => (
                        <li key={index}>{message}</li> // Render each message as a list item
                    ))}
                </ul>
            ) : (
                <p>Loading messages...</p> // Show loading state
            )}
        </div>
    );
}

export default App;
