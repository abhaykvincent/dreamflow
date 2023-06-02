import React, { useState } from 'react';
import './ElementPalette.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTarget, setTarget } from '../canvas/canvasSlice';

/* icons */
import icon_h  from '../../assets/icons/elements/awesome-heading.svg'
import icon_p  from '../../assets/icons/elements/metro-paragraph-left.svg'
import icon_a  from '../../assets/icons/elements/awesome-link.svg'
import icon_img  from '../../assets/icons/elements/awesome-image.svg'
import icon_div  from '../../assets/icons/elements/material-check-box-outline-blank.svg'
import icon_inputText  from '../../assets/icons/elements/element-input.svg'
import icon_inputButton  from '../../assets/icons/elements/elemenet-button.svg'
import icon_section  from '../../assets/icons/elements/element-section.svg'

export function ElementPalette() {
  const [elements, setElements] = useState([
    {
      tagName: "Div",
      tag: "div",
      icon: icon_div
    },
    {
      tagName: "Section",
      tag: "section",
      icon: icon_section
    },
    {
      tagName: "H1",
      tag: "h1",
      icon: icon_h
    },
    {
      tagName: "P",
      tag: "p",
      icon: icon_p
    },
    {
      tagName: "Img",
      tag: "img",
      icon: icon_img
    },
    {
      tagName: "A",
      tag: "a",
      icon: icon_a
    },
    {
      tagName: "Input",
      tag: "input",
      icon: icon_inputText
    },
    {
      tagName: "Button",
      tag: "button",
      icon: icon_inputButton
    }

  ]);
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
    document.querySelector('.canvas .selected')?.classList.remove('selected')
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
    // hover on elemment to show tooltip
    newElement.addEventListener('mouseover', (e:any)=>{
      const tooltip = document.querySelector('.target-tooltip') as HTMLElement
      if(tooltip){
        tooltip.innerHTML = e.target.dataset.flowId
        //get position of target
        const rect = e.target.getBoundingClientRect();
        tooltip.style.top = `${rect.top}px`;
        tooltip.style.left = `${rect.left}px`;
        //add class
        tooltip.classList.remove('hide');
      }
    })
    // hover out elemment to hide tooltip

    newElement.addEventListener('mouseout', (e:any)=>{
      const tooltip = document.querySelector('.target-tooltip') as HTMLElement
      if(tooltip){
        tooltip.innerHTML = ''
        //remove class  
        tooltip.classList.add('hide')
      }
    }
    )
  }

    
  
  return (
    <>
    <div className="tabs">Elements</div>
    <div className="elements-dragabble">

    {
      elements.map(element=>(
      <div key={element.tag} className={`element  html-${element.tag}` }
        onClick={()=>elementCreation1881(target,element.tag)}
      >
        <div className="element_icon"
          style={element.icon?{backgroundImage:`url(${element.icon})`,  color:'red'}:{}}
        ></div>
        <div className="element_label">{element.tagName}</div>
      </div>

      ))
    }

    </div>
    </>
  );
}
