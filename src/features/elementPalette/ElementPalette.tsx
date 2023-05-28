import React, { useState } from 'react';
import './ElementPalette.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTarget, setTarget } from '../canvas/canvasSlice';

export function Elementpalette() {
  const dispatch = useAppDispatch();

  const target = useAppSelector(selectTarget);

  function createIdString() {
    const date = new Date();
    const timestamp = date.getTime();
    const randomSuffix = Math.floor(Math.random() * 1000); // Add a random suffix to avoid conflicts
    return `${timestamp}-${randomSuffix}`;
  }


  function highlightTarget(target:any){
    //clear current target class: selected
    document.querySelector('.canvas >.selected')?.classList.remove('selected')
    target.classList.add('selected')
  }
  
  function elementCreation1881(target:string,tag:string){
    const newElement = document.createElement(tag); 
    newElement.innerHTML= tag;
    newElement.dataset.flowId=createIdString()
    document.querySelector(`[data-flow-id="${target}"]`)?.appendChild(newElement);
    // Newly created elemenet listning click event for target selecting
    newElement.addEventListener('click', (e:any)=>{
      // setting new target
      dispatch(setTarget(e.target.dataset.flowId))
      highlightTarget(e.target)
    })
  }
  
  return (
    <>
    <div className="tabs">Elements</div>
    <div className="elements-dragabble">

      <div className="element h"
        onClick={()=>elementCreation1881(target,'h1')}
      >
        <div className="element_icon"></div>
        <div className="element_label">Heading</div>
      </div>
      <div className="element p"
        onClick={()=>elementCreation1881(target,'p')}
        >
        <div className="element_icon"></div>
        <div className="element_label">Paragraph</div>
      </div>
      <div className="element a"
        onClick={()=>elementCreation1881(target,'a')}
        >
        <div className="element_icon"></div>
        <div className="element_label">Link</div>
      </div>
      <div className="element div"
        onClick={()=>elementCreation1881(target,'div')}
        >
        <div className="element_icon"></div>
        <div className="element_label">Link</div>
      </div>

    </div>
    </>
  );
}
