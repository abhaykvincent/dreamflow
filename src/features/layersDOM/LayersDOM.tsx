import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectCanvasDOM } from '../canvas/canvasSlice';
import './LayersDOM.scss'

interface SerializedNode {
  nodeName: string;
  attributes: { [key: string]: string };
  children: SerializedNode[];
}
const RenderNode = React.memo(({ node }: { node: SerializedNode }) => {
  let dataFlowId = node.attributes['data-flow-id'];
  if (node.nodeName !== '#text') {
    return (
      <React.Fragment key={dataFlowId}>
        <div className="node" data-layer-id={dataFlowId}>
          <div className="node-name">{node.nodeName}</div>
          <div className="node-children">
            {node.children.map((child: SerializedNode) => (
              <RenderNode key={child.attributes['data-flow-id']} node={child} />
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    return null;
  }
});
export default function LayersDOM( {activeSidebarTool}:{activeSidebarTool:string}) {
  const [allNodes, setAllNodes] = useState<SerializedNode[]>([]);
  const canvasDOM = useSelector(selectCanvasDOM) as SerializedNode;
  useEffect(() => {
    let canvas = document.getElementById('canvas') as HTMLElement;
    if(canvas){
      setAllNodes([canvasDOM])
    }
  }, [canvasDOM]);

  useEffect(() => {
    console.log('activeSidebarTool', activeSidebarTool);
    console.log(`${activeSidebarTool == 'layers' ? '':'hide'}`);
  }, [activeSidebarTool]);

  return (
    <div className={`side-panel layers ${activeSidebarTool == 'layers' ? '':'hide'}`}>
        <div className="tabs">
          <div className="tab highlighted">Layers</div>
        </div>
        <div className="nodes">
        {
          activeSidebarTool === 'layers' && allNodes[0] &&
          allNodes[0].children.map((node, index) => (
            <RenderNode node={node} />
          ))
        }
        </div>
    </div>
  )
}