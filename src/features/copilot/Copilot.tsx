import { useState } from 'react';
import './Copilot.scss';
import ChatBox from '../../components/ChatBox/ChatBox';

export function Copilot() {

  const [chatCount, setChatCount] = useState(0);
  const onNewChat = (e:any) => {
    e.stopPropagation();
    setChatCount(chatCount + 1);
  }
  const [showHistory , setShowHistory] = useState(false);
  const historyHandler = (e:any) => {
    e.stopPropagation();
    setShowHistory(!showHistory);
  }
    
  return (
    <div className={`copilot ${showHistory?'show-history':''}`}>
      {
        [...Array(chatCount)]
        .map((_, i) => 
          <ChatBox  index={i}/>
        )
      }
      <div className="newChat"
        onClick={onNewChat}
      >
        <p>New Chat</p>
        <p className='history__button' onClick={historyHandler}>History</p>
        
        </div>
    </div>
  );
}
