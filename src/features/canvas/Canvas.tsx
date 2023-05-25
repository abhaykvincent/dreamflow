import React, { useEffect, useState } from 'react';
import './Canvas.scss';

export function Canvas() {
  let canvasData=''


  useEffect(()=>{
    let canvasElements = document.querySelectorAll('.canvas > *')
    canvasElements.forEach(element => {
      element.addEventListener('click', (e:any)=>{
        console.log(e.target.nodeName);
        console.log(typeof(e));
        debugger
      })
    });
  },[canvasData])

  return (
    <div className="canvas" data-flow-id="canvas">{canvasData}</div>
  );
}
