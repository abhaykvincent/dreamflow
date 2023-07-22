import React, { useState } from 'react';
import './ElementPalette.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTarget, setTarget, updateCanvasHTML } from '../canvas/canvasSlice';
import generateUniqueID from '../../app/utils/uniqueIdGenerator';
import { AVAILABLE_ELEMENTS } from '../canvas/avaiableElements';

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
  handleTooltipHover();
}
function handleTooltipHover() {
  const tooltip = document.querySelector('.target-tooltip-active') as HTMLElement;

    tooltip.addEventListener('mouseenter', (e: any) => {

      setTimeout(() => {
      console.log('enter')
      tooltip.classList.add('slide-down');
      }, 10);
    });

  tooltip.addEventListener('mouseleave', (e: any) => {
    console.log('leave')
    tooltip.classList.remove('slide-down');
  }
  );
  
}
export default function ElementPalette( {activeSidebarTool}:{activeSidebarTool:string}) {
  const dispatch = useAppDispatch();
  const targetID = useAppSelector(selectTarget);
  function handleElementCreate(target:string,tag:string){
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

   dispatch(updateCanvasHTML());
  } 
  return (
    <div className={`side-panel elements ${activeSidebarTool == 'elements' ? '':'hide'}`}>
      <div className="tabs">
        <div className="tab highlighted">Elements</div>
      </div>
      <div className="elements-dragabbles">
      {
        AVAILABLE_ELEMENTS.map(element=>(
          <div key={element.tag} 
            className={`element  html-${element.tag}` }
            data-testid={`  html-${element.tag}` }
            onClick={()=>handleElementCreate(targetID,element.tag)}
          >
            <div className="element_icon"
              style={element.icon?{backgroundImage:`url(${element.icon})`,  color:'red'}:{}}
            ></div>
            <div className="element_label">{element.tagName}</div>
          </div>
        ))
      }
      </div>
    </div>
  );
}
//  210 -> 164 ->130 -> 142