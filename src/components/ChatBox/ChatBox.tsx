import React, {useRef, useState } from 'react';
import './ChatBox.scss';
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';

export default function ChatBox({index}: {index: number}) {
  const chatbox = useRef<HTMLDivElement>(null);
  const [windowStatus, setWindowStatus] = useState('maximize');
  return (
    <div className={`chatbox ${windowStatus}`} key={index} ref={chatbox}>
      <ChatHeader chatbox={chatbox} index={index} setWindowStatus={setWindowStatus} windowStatus={windowStatus}/>
      <ChatBody/>
    </div>
  );
};

