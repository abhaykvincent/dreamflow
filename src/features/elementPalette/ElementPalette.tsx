import React, { useState } from 'react';
import './ElementPalette.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTarget, setStyles, setTarget, updateCanvasHTML } from '../canvas/canvasSlice';
import $ from 'jquery';
/* HTML Element SVG icons */
import icon_h  from '../../assets/icons/elements/awesome-heading.svg'
import icon_p  from '../../assets/icons/elements/metro-paragraph-left.svg'
import icon_a  from '../../assets/icons/elements/awesome-link.svg'
import icon_img  from '../../assets/icons/elements/awesome-image.svg'
import icon_div  from '../../assets/icons/elements/material-check-box-outline-blank.svg'
import icon_inputText  from '../../assets/icons/elements/element-input.svg'
import icon_inputButton  from '../../assets/icons/elements/elemenet-button.svg'
import icon_section  from '../../assets/icons/elements/element-section.svg'

function generateUniqueID() {
  const timestamp = Date.now();
  const randomSuffix = Math.floor(Math.random() * 1000);
  return `${timestamp}-${randomSuffix}`;
}
function getLabelAndIcon(target: HTMLElement) {
  const elementName = target.tagName
  const elementId = target.dataset.flowId
  const label = elementName ? elementName : elementId
  const icon = AVAILABLE_ELEMENTS.find(element => element.tag === target.tagName.toLowerCase())?.icon
  return { label, icon }
}
function highlightTargetElementInCanvas(target:any){
  document.querySelector('.canvas *.selected')?.classList.remove('selected')
  target.classList.add('selected')
}
function createHTMLElement(tag: string, target: string) {
  const newElement = document.createElement(tag);
  newElement.innerHTML = tag;
  newElement.dataset.flowId = generateUniqueID();
  document.querySelector(`[data-flow-id="${target}"]`)?.appendChild(newElement);
  return newElement;
}
function showTolltip(target:any){
  const tooltip = document.querySelector('.target-tooltip-active') as HTMLElement
  const { label, icon } = getLabelAndIcon(target)
  tooltip.innerHTML = `
    <div class="icon" style="${icon ? `background-image: url(${icon})` : ''}"></div>
    <div class="label">${label}</div>
  `;
  const rect = target.getBoundingClientRect();
  tooltip.style.top = `${rect.top}px`;
  tooltip.style.left = `${rect.left}px`;
  tooltip.classList.remove('hide')
}
function handleElementHover(newElement: HTMLElement) {
  newElement.addEventListener('mouseover', (e: any) => {
    e.stopPropagation();
    showTolltip(e.currentTarget);
  });
  // Hover out elemment to hide tooltip
  newElement.addEventListener('mouseout', (e: any) => {
    e.stopPropagation();

    const tooltip = document.querySelector('.target-tooltip') as HTMLElement;
    if (tooltip) {
      tooltip.innerHTML = '';
      tooltip.classList.add('hide');
    }
  }
  );
}
function handleTooltipHover() {
  const tooltip = document.querySelector('.target-tooltip-active') as HTMLElement;
  tooltip.addEventListener('mouseover', (e: any) => {
    tooltip.classList.add('slide-down');
  });
  tooltip.addEventListener('mouseout', (e: any) => {
    tooltip.classList.remove('slide-down');
  }
  );
}
const AVAILABLE_ELEMENTS =[
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

]
export function ElementPalette() {
  const dispatch = useAppDispatch();
  const targetID = useAppSelector(selectTarget);
  function createElementWithTooltip(target:string,tag:string){
    const newElement = createHTMLElement(tag, target);
    newElement.addEventListener('click', (e: any) => {
      e.stopPropagation();
      // Store Target
      dispatch(setTarget(e.currentTarget.dataset.flowId));
      
      highlightTargetElementInCanvas(e.currentTarget);
      showTolltip(e.currentTarget);
    });
    // Hover on element to show tooltip
    handleElementHover(newElement);
    handleTooltipHover();

    const currentCanvasHTML = $('#canvas').html();
   dispatch(updateCanvasHTML(currentCanvasHTML));
  } 
  return (
    <>
    <div className="tabs">Elements</div>
    <div className="elements-dragabbles">
    {
      AVAILABLE_ELEMENTS.map(element=>(
        <div key={element.tag} 
          className={`element  html-${element.tag}` }
          data-testid={`  html-${element.tag}` }
          onClick={()=>createElementWithTooltip(targetID,element.tag)}
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
//  210 -> 164 -> 158