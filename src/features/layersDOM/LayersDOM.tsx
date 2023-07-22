import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectCanvasDOM } from '../canvas/canvasSlice';

interface SerializedNode {
  nodeName: string;
  attributes: { [key: string]: string };
  children: SerializedNode[];
}
const RenderNode = ({node, index}:any) => {
  console.log('node', node);
  let dataFlowId = node.attributes['data-flow-id'];
  if(node.nodeName !== '#text'){
  return (
    <div className="node" key={index} data-layer-id={dataFlowId}>
      <div className="node-name">{node.nodeName}</div>
      <div className="node-children">
        {
          node.children.map((child:any,childIndex:any) => (
            <RenderNode node={child} />
          ))
        }
      </div>
    </div>
  );
  }else{
    return null
  }
}
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