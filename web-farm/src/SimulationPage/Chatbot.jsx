import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css'

const Chatbot = ({ toggleChatbot }) => {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to send message to GEMINI API and get response
  const sendMessage = async () => {
    if (!userMessage.trim()) return;

    const newChatHistory = [...chatHistory, { sender: 'user', message: userMessage }];
    setChatHistory(newChatHistory);
    setUserMessage('');
    setLoading(true);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBWwtGTHLycz1DEEvJ-CliHu4SXJm6-H9s`,
        {
          contents: [
            {
              parts: [
                {
                  text: userMessage
                }
              ]
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      // Extract the reply from the response
      const reply = response.data.candidates[0]?.content?.parts[0]?.text;

      if (reply) {
        setChatHistory([
          ...newChatHistory,
          { sender: 'gemini', message: reply }
        ]);
      } else {
        setChatHistory([
          ...newChatHistory,
          { sender: 'gemini', message: 'Sorry, I could not understand that.' }
        ]);
      }
    } catch (error) {
      console.error('Error communicating with Google Generative Language API', error);
      setChatHistory([
        ...newChatHistory,
        { sender: 'gemini', message: 'Sorry, there was an error. Please try again.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Handle the "Enter" key press to send the message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default behavior of Enter key (form submission)
      sendMessage(); // Trigger message send
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '300px',
        maxWidth: '80%',
        height: '400px',
        border: '1px solid #ddd',
        borderRadius: '12px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif', // Modern font family
        zIndex: 1000,
        animation: 'fadeIn 0.5s ease',
      }}
    >
      {/* Minimize Button */}
      <button className="minimize-button"
onClick={toggleChatbot}
style={{
alignSelf: 'flex-end',
background: 'linear-gradient(135deg, #FF6347 0%, #E25C40 100%)',
border: 'none',
color: 'white',
borderRadius: '50%',
width: '32px',
height: '32px',
padding: '0',
cursor: 'pointer',
fontSize: '16px',
fontWeight: 'bold',
transition: 'all 0.3s',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
}}
>
−
</button>




      <h3
        style={{
          fontSize: '18px',
          marginBottom: '10px',
          color: '#333',
          fontWeight: '600',
          textAlign: 'center',
          fontFamily: '"Roboto", sans-serif', // A more modern font for headings
        }}
      >
        Chatbot
      </h3>

      {/* Chat History */}
      <div
        style={{
          maxHeight: '250px',
          overflowY: 'auto',
          marginBottom: '10px',
          fontSize: '14px',
          color: '#555',
        }}
      >
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            style={{
              margin: '10px 0',
              textAlign: chat.sender === 'user' ? 'right' : 'left',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                padding: '12px',
                borderRadius: '10px',
                backgroundColor: chat.sender === 'user' ? '#4CAF50' : '#e4e4e4',
                color: chat.sender === 'user' ? 'white' : '#333',
                maxWidth: '70%',
                wordWrap: 'break-word',
                fontSize: '14px',
                lineHeight: '1.5',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
              }}
            >
              {chat.message}
            </div>
          </div>
        ))}
        {loading && (
          <div
            style={{
              marginTop: '10px',
              padding: '8px',
              textAlign: 'center',
              fontSize: '14px',
              color: '#888',
            }}
          >
            Loading...
          </div>
        )}
      </div>

      {/* Input Area */}
      <div style={{ display: 'flex', marginTop: 'auto' }}>
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyPress={handleKeyPress} // Add the key press handler here
          placeholder="Type a message"
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '25px',
            border: '1px solid #ccc',
            fontSize: '14px',
            marginRight: '10px',
            backgroundColor: '#f1f1f1',
            outline: 'none',
            transition: 'all 0.3s ease',
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: '12px',
            borderRadius: '25px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
