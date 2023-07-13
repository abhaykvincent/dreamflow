import React, { useState } from 'react';
import './ElementPalette.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTarget, setTarget, updateCanvasHTML } from '../canvas/canvasSlice';
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


import icon_h_orange  from '../../assets/icons/elements/orangeElements/awesome-heading.svg'
import icon_p_orange  from '../../assets/icons/elements/orangeElements/metro-paragraph-left.svg'
import icon_a_orange  from '../../assets/icons/elements/orangeElements/awesome-link.svg'
import icon_img_orange  from '../../assets/icons/elements/orangeElements/awesome-image.svg'
import icon_div_orange  from '../../assets/icons/elements/orangeElements/material-check-box-outline-blank.svg'
import icon_inputText_orange  from '../../assets/icons/elements/orangeElements/element-input.svg'
import icon_inputButton_orange  from '../../assets/icons/elements/orangeElements/elemenet-button.svg'
import icon_section_orange  from '../../assets/icons/elements/orangeElements/element-section.svg'
import generateUniqueID from '../../app/utils/uniqueIdGenerator';


const AVAILABLE_ELEMENTS =[
  {
    tagName: "Div",
    tag: "div",
    icon: icon_div,
    iconOrange: icon_div_orange
  },
  {
    tagName: "Section",
    tag: "section",
    icon: icon_section,
    iconOrange: icon_section_orange
  },
  {
    tagName: "H1",
    tag: "h1",
    icon: icon_h,
    iconOrange: icon_h_orange
  },
  {
    tagName: "P",
    tag: "p",
    icon: icon_p,
    iconOrange: icon_p_orange
  },
  {
    tagName: "Img",
    tag: "img",
    icon: icon_img,
    iconOrange: icon_img_orange
  },
  {
    tagName: "A",
    tag: "a",
    icon: icon_a,
    iconOrange: icon_a_orange
  },
  {
    tagName: "Input",
    tag: "input",
    icon: icon_inputText,
    iconOrange: icon_inputText_orange
  },
  {
    tagName: "Button",
    tag: "button",
    icon: icon_inputButton,
    iconOrange: icon_inputButton_orange
  }

]
function getLabelAndIcon(target: HTMLElement,isPrimarySelection:boolean) {
  if(isPrimarySelection){
    const elementName = target.tagName
    const elementId = target.dataset.flowId
    const label = elementName ? elementName : elementId
    const icon = AVAILABLE_ELEMENTS.find(element => element.tag === target.tagName.toLowerCase())?.icon
    return { label, icon }
  }
  else{
    const elementName = target.tagName
    const elementId = target.dataset.flowId
    const label = elementName ? elementName : elementId
    const icon = AVAILABLE_ELEMENTS.find(element => element.tag === target.tagName.toLowerCase())?.iconOrange
    return { label, icon }
  }
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
 console.log(target)
  return newElement;
}
function showTolltipActive(target:any){
  const tooltip = document.querySelector('.target-tooltip-active') as HTMLElement
  const isPrimarySelection = true;
  const { label, icon } = getLabelAndIcon(target,isPrimarySelection)
  tooltip.innerHTML = `
    <div class="icon" style="${icon ? `background-image: url(${icon})` : ''}"></div>
    <div class="label">${label}</div>
  `;
  const rect = target.getBoundingClientRect();
  tooltip.style.top = `${rect.top}px`;
  tooltip.style.left = `${rect.left}px`;
  tooltip.classList.remove('hide')
}
function showTolltip(target:any){
  const tooltip = document.querySelector('.target-tooltip') as HTMLElement;
  const isPrimarySelection = false;
  const { label, icon } = getLabelAndIcon(target,isPrimarySelection)
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
      showTolltipActive(e.currentTarget);
    });
    // Hover on element to show tooltip
    handleElementHover(newElement);
    handleTooltipHover();

   dispatch(updateCanvasHTML());
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
//  210 -> 164 