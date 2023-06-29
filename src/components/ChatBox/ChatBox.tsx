import React, { useEffect, useState } from 'react';
import './ChatBox.scss';
import axios from 'axios';
import { cssNumber } from 'jquery';
/* conncet the chatbox with this backeend http://127.0.0.1:5001/dreamflow-cloud/us-central1/api/copilot cod blow

app.get('/copilot', (req, res) => {
  
  const callOpenAI = async () => {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {role: "system", content: "You are a helpfuls web developer"},
        
    ],
    });
    res.json(completion.data.choices[0].message);

    // 
    console.log(completion.data.choices[0].message);
  }
  callOpenAI()
  .catch((err) => {
    console.log(err);
  }
  );
}
)
*/

export default function ChatBox({index}: {index: number}) {
  let chatbox = document.getElementsByClassName('chatbox')[index] as HTMLDivElement;
  const [windowStatus, setWindowStatus] = useState('maximize');

  let isChatboxDraggable = true;
  function configureDragables() {
    if (windowStatus === 'close') {
      chatbox.setAttribute('style', `right: ${8 * 4.5}px; bottom: ${8 * 7.5}px;`);
      isChatboxDraggable = false;
    }
    else if (windowStatus === 'minimize') {
      isChatboxDraggable = true;
    }
    else if (windowStatus === 'maximize') {

      isChatboxDraggable = true;
    }
  }
  configureDragables();
  const dragChatbox = (e: any) => {
    console.log('clicked');
    console.log(isChatboxDraggable)
    if(!isChatboxDraggable) return
    chatbox = document.getElementsByClassName('chatbox')[index] as HTMLDivElement;
    const initialMousePositionX = e.clientX;
    const initialMousePositionY = e.clientY;
    const {top, left} = chatbox.getBoundingClientRect();
    // on mouse move get the change in mouse position  and add it to the chatbox position
    const handleMouseMove = (e: any) => {
      console.log('dragging');
      const changeInMousePositionX = e.clientX - initialMousePositionX;
      const changeInMousePositionY = e.clientY - initialMousePositionY;
      const newRight = left + changeInMousePositionX;
      const newBottom = top + changeInMousePositionY;
      console.log({changeInMousePositionX, changeInMousePositionY});
      console.log({newRight, newBottom});
      chatbox.setAttribute('style', `left: ${newRight}px; top: ${newBottom}px;`)

    }
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', handleMouseMove);
    }
    );

  }

 

  // OpeenAI chatbot
  const [chat, setChat] = useState('First Chat');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
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

    console.log('loading done')
  }
  return (
    <div className={`chatbox ${windowStatus}`} key={index}>

        <div className="chatbox__header"
         onMouseDown={dragChatbox} >
          <div className="chatbox__header__title">Copilot <span>Powery by OpenAI</span>
          </div>
          <div className="chatbox__header__buttons">
            <div className="maximize"
              onClick={() => setWindowStatus('maximize')}
            ></div>
            <div className="minimize"
              onClick={() =>setWindowStatus('minimize')}
            ></div>
            <div className="close"
              onClick={() =>setWindowStatus('close')}
            ></div>

          </div>
        </div>

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
