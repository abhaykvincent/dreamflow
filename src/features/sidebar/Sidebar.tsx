import { useEffect, useState } from 'react';

import { ElementPalette } from '../elementPalette/ElementPalette';
import './Sidebar.scss';
import { useSelector } from 'react-redux';
import { selectCanvasDOM } from '../canvas/canvasSlice';
import $ from 'jquery';

const SIDEBAR_TOOLS = [
  'elements',
  'layers',
]
interface NodeObj {
  node: HTMLElement;
  children: NodeObj[];
}

function gatherNodes(element: HTMLElement): NodeObj[] {
  let nodes: NodeObj[] = [{
      node: element,
      children: []
  }];

  for (let i = 0; i < element.children.length; i++) {
      let childElement = element.children[i] as HTMLElement;
      let childNodes = gatherNodes(childElement);
      nodes[nodes.length - 1].children = childNodes;
  }

  return nodes;
}

// function to create DOM layer from node object
// each node with html <div className="node" key={index}>{node.node.tagName}</div>


const generateLayer = (value:any,level:number,currentLayer:any) => {
  $(value).children().each(function(index:number, v:any) {

    let lvl = level + 1;

    let newLayer = document.createElement('div');
    newLayer.className = 'layer';

    let selectorClasses=$('.selected')[0].className.replace('selected','');

    // if selectorClasses starts with flow, remove it
    if(selectorClasses.startsWith('flow')) {
      selectorClasses = selectorClasses.replace('flow','');
      // all uppercase
      selectorClasses = selectorClasses.toUpperCase();
    }
    console.log(selectorClasses)
    //class name exept 'selected
    // get tag name of the element
    newLayer.innerHTML=`<div class="layer__tab">${v.tagName}<div/>`
    
    newLayer.dataset.layerId = $(v).data('flow-id');
    newLayer.style.marginLeft = lvl*4 + 'px';
    newLayer.style.borderLeft = lvl*0.5+'px solid rgba(255, 255, 255, 0.1)'
    currentLayer.append(newLayer);
    generateLayer(v,lvl++,newLayer);
  });
}

export function Sidebar() {
  const canvasDOM = useSelector(selectCanvasDOM);
  let canvas = document.getElementById('canvas') as HTMLElement;
  const [allNodes, setAllNodes] = useState<NodeObj[]>([]);
  
  useEffect(() => {if(canvas){
    setAllNodes(gatherNodes(canvas))
  }
  }, []);
  useEffect(() => {
    let canvas = document.getElementById('canvas') as HTMLElement;
    if(canvas){
      setAllNodes(gatherNodes(canvas))
    }

    generateLayer('#canvas',0,$('.nodes'));
  }, [canvasDOM]);

  const [activeSidebarTool, setActiveSidebarTool] = useState('elements');
  return (
    <div className="sidebar">
      <div className="tools">
        {
          SIDEBAR_TOOLS.map((tool, index) => {
            return (
              <div 
                className={`quick-tool ${tool} ${activeSidebarTool == tool ? 'active':''}`}
                onClick={()=>setActiveSidebarTool(tool)}
                key={index}
              ></div>
            )
          })
        }

        <div className="quick-tool pages disabled"></div> {/* Disabled */}
        <div className="quick-tool assets disabled"></div> {/* Disabled */}
        
      </div>
      <div className="side-panels">

        <div className={`side-panel elements ${activeSidebarTool == 'elements' ? '':'hide'}`}>
          <ElementPalette/>
        </div>
        <div className={`side-panel layers ${activeSidebarTool == 'layers' ? '':'hide'}`}>
          <div className="tabs">Layers</div>
          <div className="nodes">
           
          </div>
        </div>

      </div>
    </div>
  );
}
