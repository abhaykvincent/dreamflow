import React, { useEffect, useState } from 'react';
import './ChatBox.scss';
import { cssNumber } from 'jquery';

export default function ChatBox({index}: {index: number}) {
  const [windowStatus, setWindowStatus] = useState('maximize');
  const dragChatbox = (e: any) => {
    console.log('clicked');
    const chatbox = document.getElementsByClassName('chatbox')[index] as HTMLDivElement;
    if (!chatbox) return;
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
            <div className="message">
            </div>
            <div className="message">
            </div>
            <div className="message">
            </div>
            <div className="message">
            </div>
            <div className="message">
            </div>
          </div>
          <div className="input__message">
            <input type="text" placeholder="Type a message" />
          </div>
        </div>

      </div>
  );
};
