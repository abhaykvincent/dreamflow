import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTarget } from '../canvas/canvasSlice';
import ElementPalette from '../elementPalette/ElementPalette';
import LayersDOM from '../layersDOM/LayersDOM';
import './Sidebar.scss';

const SIDEBAR_TOOLS = [
  'elements',
  'layers',
]
export function Sidebar() {
  const targetID=useSelector(selectTarget);
  const [activeSidebarTool, setActiveSidebarTool] = useState('elements');
  useEffect(() => {

    let node = document.querySelector(`[data-layer-id="${targetID}"]`) as HTMLElement;
    if(node){
      node.classList.add('selected');
    }
  }, [targetID]);
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
        <ElementPalette activeSidebarTool={activeSidebarTool}/>
        <LayersDOM activeSidebarTool={activeSidebarTool}/>
      </div>
    </div>
  );
}