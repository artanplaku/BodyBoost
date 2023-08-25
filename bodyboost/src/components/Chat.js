import React, { useState } from 'react'
import "../styles/Chat.scss"

const systemMessage = {
    "role": "system", 
    "content": "Help the user draft a fitness commitment contract tailored to their goals."
  }

function Chat() {
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState([
    { 
        role: 'assistant',
        content: "Hello! Let's draft your fitness commitment contract. Tell me about your fitness goals, and I'll help you put them into words" 
    }
    ]);

  const handleSend = async () => {
    setMessages(prevMessages => [...prevMessages, { role: 'user', content: input }]);
    setIsTyping(true);
    await processMessageToChatGPT(input);
    setInput('');
  };

  const processMessageToChatGPT = async (message) => {
    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...messages, { role: 'user', content: message }]
    };

    const token = localStorage.getItem('token');

    const response = await fetch("https://bodyboostbackend.onrender.com/api/chat", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    console.log(data)
    if (data && data.choices && data.choices[0] && data.choices[0].message) {
      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: data.choices[0].message.content }]);

    } else {
        console.error("Unexpected response structure:", data);
    }
    
    setIsTyping(false);
  };

  return (
    <div className="App">
      <div className="chat-display">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
        {isTyping && <div className="typing-indicator">ChatGPT is typing...</div>}
      </div>
      <div className="chat-input">
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Chat