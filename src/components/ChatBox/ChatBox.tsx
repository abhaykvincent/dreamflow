import React, {useState } from 'react';
import './ChatBox.scss';
import axios from 'axios';
import ChatHeader from './ChatHeader';

export default function ChatBox({index}: {index: number}) {
  const [windowStatus, setWindowStatus] = useState('maximize');

 

 

  // OpeenAI chatbot
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {role: "system", content: "You are a helpfull assistant"}
  ]);

  const handlePromptEnter = (e: any) => 
  {
    setLoading(true);
    setMessages([...messages, {role: "user", content: input}]);
    // call the backend http://127.0.0.1:5001/dreamflow-cloud/us-central1/api/copilot
    // to get the response using axios
    // setMessages([...messages, {role: "system", content: response}]);

    const url = 'http://127.0.0.1:5001/dreamflow-cloud/us-central1/api/copilot';
    const config = {  
      headers: { 'Content-Type': 'application/json' },
      mode: 'no-cors',
      params: {
        messages:[...messages, {role: "user", content: input}]
      }
    };
    axios.get(url, config)
    .then(response => {
      console.log({response});
      setMessages([...messages,{role: "user", content: input}, response.data]);

      setLoading(false);
    }
    )
    .catch(error => {
      console.log(error);
    });
    setInput('');
  }
  return (
    <div className={`chatbox ${windowStatus}`} key={index} >

        <ChatHeader index={index} setWindowStatus={setWindowStatus} windowStatus={windowStatus}/>
        <div className="chatbox__messages">
          <div className="messages">
            {
              messages.map((message, index) => {
                return (
                  <div className={`message ${message.role}`} key={index}>
                    <div className="message__content">
                      {message.content}
                    </div>
                  </div>
                )
              }
              )
            }
          </div>
          <div className="input__message">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message" />
          </div>
          <div className={`send__button ${loading?'loading':''}`} onClick={handlePromptEnter}>
            {loading ? 'Loading...' : 'Send'}
          </div>
        </div>

      </div>
  );

  
};

// Lines     : 140  >
// Complexity: 40   >
