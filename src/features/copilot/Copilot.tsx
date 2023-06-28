import { useState } from 'react';
import './Copilot.scss';
import ChatBox from '../../components/ChatBox/ChatBox';

export function Copilot() {
  const [chatCount, setChatCount] = useState(0);
  const onNewChat = () => {
    setChatCount(chatCount + 1);
  }

  return (
    <div className="copilot">
      {
        [...Array(chatCount)].map((_, i) => <ChatBox  index={i}/>)
      }
      <div className="newChat"
        onClick={onNewChat}
      >New Chat</div>
    </div>
  );
}
