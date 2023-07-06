import React from 'react'

function ChatHeader( setWindowStatus: any, index: number, windowStatus: string) {
  let isChatboxDraggable = true;
  let chatbox = document.getElementsByClassName('chatbox')[index] as HTMLDivElement;
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
  return (
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
  )
}

export default ChatHeader