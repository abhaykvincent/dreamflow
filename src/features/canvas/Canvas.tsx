import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { selectCanvasDOM, selectCanvasDimensions, setTarget, updateCanvasDimensions } from './canvasSlice';
import './Canvas.scss';
import $ from 'jquery';
import icon_h  from '../../assets/icons/elements/awesome-heading.svg'
import icon_p  from '../../assets/icons/elements/metro-paragraph-left.svg'
import icon_a  from '../../assets/icons/elements/awesome-link.svg'
import icon_img  from '../../assets/icons/elements/awesome-image.svg'
import icon_div  from '../../assets/icons/elements/material-check-box-outline-blank.svg'
import icon_inputText  from '../../assets/icons/elements/element-input.svg'
import icon_inputButton  from '../../assets/icons/elements/elemenet-button.svg'
import icon_section  from '../../assets/icons/elements/element-section.svg'

function highlightTargetElementInCanvas(target:any){
  document.querySelector('.canvas *.selected')?.classList.remove('selected')
  target.classList.add('selected')
}
function generateUniqueID() {
  const timestamp = Date.now();
  const randomSuffix = Math.floor(Math.random() * 1000);
  return `${timestamp}-${randomSuffix}`
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
function getLabelAndIcon(target: HTMLElement) {
  const elementName = target.tagName
  const elementId = target.dataset.flowId
  const label = elementName ? elementName : elementId
  const icon = AVAILABLE_ELEMENTS.find(element => element.tag === target.tagName.toLowerCase())?.icon
  return { label, icon }
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
export function Canvas() {

  const dispatch = useAppDispatch();
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });
  const canvasDimensionsStore = useSelector(selectCanvasDimensions);
  const canvasDOM= useState(useSelector(selectCanvasDOM));

  // ONLY run once on mount
  // Setting canvas dimensions & dispatching to store
  // IMPORTANT: This will replace the initial state of canvasDimensions in the store which is {width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0}
  useEffect(() => {
    const canvas = document.getElementById('canvas');
    if (canvas) {
      const { clientWidth, clientHeight} = canvas;
      const { top, left, right, bottom } = canvas.getBoundingClientRect();
      setCanvasDimensions({ width: clientWidth, height: clientHeight, top, left, right, bottom });
      dispatch(updateCanvasDimensions(canvasDimensions));
    }
  },[]);

  useEffect(() => {
    const elements = document.querySelectorAll('.canvas *') as NodeListOf<HTMLElement>;
    elements.forEach(element => {
      element.dataset.flowId = generateUniqueID();
      element.addEventListener('click', (e: any) => {
        e.stopPropagation();
        // Store Target
        dispatch(setTarget(e.currentTarget.dataset.flowId));
        
        highlightTargetElementInCanvas(e.currentTarget);
        showTolltip(e.currentTarget);
        handleElementHover(element);
      handleTooltipHover();
      });
    });
  }, [canvasDOM]);

  useEffect(() => {
    dispatch(updateCanvasDimensions(canvasDimensions));
  }, [canvasDimensions]);

  // Syncing canvas dimensions with store
  useEffect(() => {
    const canvas = document.getElementById('canvas');
    if (canvas) {
      const { width, left } = canvasDimensionsStore;
      canvas.style.width = `${width}px`;
      canvas.style.left = `${left}px`;
    }
  }, [canvasDimensionsStore]);

  // Obstacle detection
  const obstacle = document.getElementsByClassName('side-panels')[0];
  const obstacleRight = obstacle ? obstacle.getBoundingClientRect().right : 0;


  const handleWestControlDrag = (e: any) => {
    const canvas = document.getElementById('canvas');
    if (!canvas) return;

    const { clientWidth} = canvas;
    const { left } = canvas.getBoundingClientRect();
    const initialMousePositionX = e.clientX;

    const handleMouseMove = (e: any) => {
      const mousePositionX = e.clientX;
      const difference = initialMousePositionX - mousePositionX;
      const newWidth = (clientWidth + difference * 2)+16;
      const newLeft = left - difference;
      // Making sure canvas dosent overlap with obstracles
      if (newWidth > 280+8  && mousePositionX > obstacleRight+8*2){
        canvas.setAttribute('style', `width: ${newWidth}px; left: ${newLeft}px;`);
        setCanvasDimensions((prevDimensions) => ({ ...prevDimensions, width: newWidth, left: newLeft }));
      }
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', handleMouseMove);
    });
  };

  const handleEastControlDrag = (e: any) => {
    const canvas = document.getElementById('canvas');
    if (!canvas) return;

    const { clientWidth} = canvas;
    const { left } = canvas.getBoundingClientRect();
    const initialMousePositionX = e.clientX;

    const handleMouseMove = (e: any) => {
      const mousePositionX = e.clientX;
      const currentCanvasLeft = canvas.getBoundingClientRect().left;
      const difference = mousePositionX-initialMousePositionX;
      const newWidth = (clientWidth + difference * 2)+16*2;
      const newLeft = left - difference;
      // Making sure canvas dosent overlap with obstracles
      if ( currentCanvasLeft - 8*2 >  obstacleRight){
        canvas.setAttribute('style', `width: ${newWidth}px; left: ${newLeft}px;`);
        setCanvasDimensions((prevDimensions) => ({ ...prevDimensions, width: newWidth, left: newLeft }));

      }
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', handleMouseMove);
    });
  };

  return (
    <>
      <div className="canvas" id="canvas" data-flow-id="canvas" data-testid="canvas"></div>
      <div className="target-tooltip"></div>
      <div className="target-tooltip-active"></div>
      <div className="canvas-responsive-controls">
        <div
          className="responsive-control control__east"
          style={{ top: canvasDimensions.top, left: canvasDimensions.left+canvasDimensions.width, width: 4, height: canvasDimensions.height }}
          onMouseDown={handleEastControlDrag}
        ></div>
        <div
          className="responsive-control control__south"
          style={{ top: canvasDimensions.bottom, left: canvasDimensions.left, width: canvasDimensions.width, height: 4 }}
        ></div>
        <div
          className="responsive-control control__west"
          style={{ top: canvasDimensions.top, left: canvasDimensions.left, width: 4, height: canvasDimensions.height }}
          onMouseDown={handleWestControlDrag}
        ></div>
      </div>
    </>
  );
}
// Line count -  137 ->
