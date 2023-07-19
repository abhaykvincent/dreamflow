import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ElementPalette } from '../elementPalette/ElementPalette';
import { selectCanvasDOM } from '../canvas/canvasSlice';
import './Sidebar.scss';
import { random } from 'lodash';
import { all } from 'axios';

const SIDEBAR_TOOLS = [
  'elements',
  'layers',
]

interface NodeObj {
  element: HTMLElement,
  children: []
}

function gatherNodes(node:HTMLElement){
  let nodes:NodeObj[] = [];
  let canvas = document.getElementById('canvas') as HTMLElement;
  let children = canvas.children;

  for(let i = 0; i < children.length; i++){
    let child = children[i] as HTMLElement;
    let node = {
      element: child,
      children: []
    } as NodeObj;
    nodes.push(node);
  }

  return nodes as NodeObj[];
}

const RenderNode = ({node, index}:any) => {
  console.log('node', node);
  let dataFlowId = node.dataset.flowId;
  return (
    <div className="node" key={dataFlowId} data-layer-id={dataFlowId}>
      <div className="node-name">{node.nodeName}</div>
      <div className="node-children">
        {
          node.children.map((child:any,childIndex:any) => (
            <RenderNode node={child} index={childIndex+ random(0, 10000)} />
          ))
        }
      </div>
    </div>
  );
}

export function Sidebar() {
  const canvasDOM = useSelector(selectCanvasDOM);
  const [allNodes, setAllNodes] = useState<NodeObj[]>([]);
  useEffect(() => {
    let canvas = document.getElementById('canvas') as HTMLElement;
    if(canvas){
      setAllNodes(gatherNodes(canvas))
    }
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
          {
            activeSidebarTool === 'layers' && allNodes[0] &&
            allNodes[0].children.map((node, index) => (
              <RenderNode node={node} index={index + random(0, 10000)} />
            ))
          }
          </div>
        </div>

      </div>
    </div>
  );
}
