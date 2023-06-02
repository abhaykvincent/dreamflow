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
import { Console } from 'console';

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
    document.querySelector('.canvas >.selected')?.classList.remove('selected')
    target.classList.add('selected')
  }
  
  function elementCreation1881(target:string,tag:string){
    const newElement = document.createElement(tag); 
    newElement.innerHTML= tag;
    newElement.dataset.flowId=createIdString()
    document.querySelector(`[data-flow-id="${target}"]`)?.appendChild(newElement);




    // Eve with a element create should be done here

    // Target Element Highlight
    /*  Target Tooltip  
      - Hover on element to show tooltip
      - Hover out element to hide tooltip */


  

    // TARGET
    // Taget Element Highlight
    newElement.addEventListener('click', (e:any)=>{
      dispatch(setTarget(e.currentTarget.dataset.flowId))
      highlightTarget(e.currentTarget)

      const tooltip = document.querySelector('.target-tooltip-active') as HTMLElement
      const { label, icon } = getLabelAndIcon(e.currentTarget)
      //HTML for Element type icon, Element name and flow id( if element name is not available)
      tooltip.innerHTML = `
        <div class="icon" style="${icon ? `background-image: url(${icon})` : ''}"></div>
        <div class="label">${label}</div>
      `;
      const rect = e.currentTarget.getBoundingClientRect();
      tooltip.style.top = `${rect.top}px`;
      tooltip.style.left = `${rect.left}px`;
      tooltip.classList.remove('hide')
    })

    // TOOLTIP  
    /* Functions */
    function getLabelAndIcon(target: HTMLElement) {
      const elementName = target.tagName
      const elementId = target.dataset.flowId
      const label = elementName ? elementName : elementId
      const icon = elements.find(element => element.tag === target.tagName.toLowerCase())?.icon
      return { label, icon }
    }
    // Hover on element to show tooltip
    newElement.addEventListener('mouseover', (e:any)=>{
      const tooltip = document.querySelector('.target-tooltip') as HTMLElement
      const { label, icon } = getLabelAndIcon(e.currentTarget)

      //HTML for Element type icon, Element name and flow id( if element name is not available)
      tooltip.innerHTML = `
        <div class="icon" style="${icon ? `background-image: url(${icon})` : ''}"></div>
        <div class="label">${label}</div>
      `;
      //Target Positioning
      const rect = e.target.getBoundingClientRect();
      tooltip.style.top = `${rect.top}px`;
      tooltip.style.left = `${rect.left}px`;
      //  Display Tooltip
      tooltip.classList.remove('hide')
    })
    // Hover out elemment to hide tooltip
    newElement.addEventListener('mouseout', (e:any)=>{
      const tooltip = document.querySelector('.target-tooltip') as HTMLElement
      if(tooltip){
        tooltip.innerHTML = ''
        // Hide Tooltip
        tooltip.classList.add('hide')
      }
    }
    )


    // Hover on tooltip to slide tooltip to the down
    const tooltip = document.querySelector('.target-tooltip-active') as HTMLElement
    tooltip.addEventListener('mouseover', (e:any)=>{
      tooltip.classList.add('slide-down')
    })
    // Hover out tooltip to slide tooltip to the up
    tooltip.addEventListener('mouseout', (e:any)=>{
      tooltip.classList.remove('slide-down')
    }
    )

  } 

    
  
  return (
    <>
    <div className="tabs">Elements</div>
    <div className="elements-dragabble">

    {
      elements.map(element=>(
      <div className={`element  html-${element.tag}` }
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
