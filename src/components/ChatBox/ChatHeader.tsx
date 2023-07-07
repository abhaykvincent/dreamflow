import { RefObject, useEffect, useRef } from "react";

interface ChatHeaderProps {
  chatbox: RefObject<HTMLDivElement>;
  setWindowStatus: (status: string) => void;
  index: number;
  windowStatus: string;
}
const ChatHeader: React.FC<ChatHeaderProps> = ({setWindowStatus, index, windowStatus }) => {
  const isChatboxDraggableRef = useRef<boolean>(true);
  let initialMousePositionX: number;
  let initialMousePositionY: number;
  let initialChatboxPositionX: number;
  let initialChatboxPositionY: number;
  const adjustChatboxForWindowStatus = () => {
    let chatbox = document.getElementsByClassName('chatbox')[index] as HTMLDivElement;
    if (windowStatus === 'close') {
      chatbox?.setAttribute('style', `right: ${8 * 4.5}px; bottom: ${8 * 7.5}px;`);
      isChatboxDraggableRef.current = false;
    } else {
      isChatboxDraggableRef.current = true;
    }
  }
  const handleMouseMove = (e: MouseEvent) => {
    let chatboxCurrent = document.getElementsByClassName('chatbox')[index] as HTMLDivElement;
    const changeInMousePositionX = e.clientX - initialMousePositionX;
    const changeInMousePositionY = e.clientY - initialMousePositionY;
    console.log(changeInMousePositionX, changeInMousePositionY);
    const newLeft =  initialChatboxPositionX + changeInMousePositionX;
    const newTop = initialChatboxPositionY + changeInMousePositionY;

    chatboxCurrent?.setAttribute('style', `left: ${newLeft}px; top: ${newTop}px;`);
  }
  const dragChatbox = (e: React.MouseEvent) => {
    initialMousePositionX = e.clientX;
    initialMousePositionY = e.clientY;
    let chatboxCurrent = document.getElementsByClassName('chatbox')[index] as HTMLDivElement;
    initialChatboxPositionX = chatboxCurrent.getBoundingClientRect().left;
    initialChatboxPositionY = chatboxCurrent.getBoundingClientRect().top;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', handleMouseMove);
    });
  }

  useEffect(() => {
  adjustChatboxForWindowStatus();
  },[windowStatus]);

  return (
    <div className="chatbox__header"
      onMouseDown={dragChatbox} >
      <div className="chatbox__header__title">Copilot <span>Powered by OpenAI</span>
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
  )
}
export default ChatHeader