import { useState } from 'react';

import { ElementPalette } from '../elementPalette/ElementPalette';
import './Sidebar.scss';

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




export function Sidebar() {
  let canvas = document.getElementById('canvas') as HTMLElement;
  let allNodes: any[] = [];
  if(canvas){
    allNodes = gatherNodes(canvas);
  }

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
            {
              allNodes.map((node, index) => {
                return (
                  <div className="node" key={index}>{node.node.tagName}</div>
                )
              })
            }
              
          </div>
        </div>

      </div>
    </div>
  );
}
