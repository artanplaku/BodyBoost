import React, { useState } from 'react'
import "../styles/Chat.scss"


// const API_KEY = "YOUR_OPENAI_API_KEY";
const systemMessage = {
    "role": "system", 
    "content": "Help the user draft a fitness commitment contract tailored to their goals."
  }

function Chat() {
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState([
    { 
        sender: 'ChatGPT',
        content: "Hello! Let's draft your fitness commitment contract. Tell me about your fitness goals, and I'll help you put them into words" 
    }
    ]);

  const handleSend = async () => {
    setMessages([
        ...messages, 
        {
             sender: 'user',
              content: input 
        }
        ]);
    setIsTyping(true);
    await processMessageToChatGPT(input);
    setInput('');
  };

  const processMessageToChatGPT = async (message) => {
    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...messages, { role: 'user', content: message }]
    };

    const response = await fetch("https://bodyboostbackend.onrender.com/api/chat", {
      method: "POST",
      headers: {
        // "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    setMessages([...messages, { sender: 'user', content: message }, { sender: 'ChatGPT', content: data.choices[0].message.content }]);
    setIsTyping(false);
  };

  return (
    <div className="App">
      <div className="chat-display">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
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