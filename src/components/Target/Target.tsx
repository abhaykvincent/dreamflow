import React, { useEffect, useState } from 'react';
import './Target.scss';

interface TargetProps {
  targetID: string;
}
//Interface for target data
interface TargetData {
  name: string;
  tag: string;
  classes: string[];
  breadcrumb: string[];
}
function getElementSignature(element: HTMLElement) {
  let name = element.tagName.toLowerCase();
  let id = element.id ? '#' + element.id : '';
  let className = element.className ? '.' + element.className.split(' ').join('.') : '';
  return name + className + id;
}
const Target: React.FC<TargetProps> = ({ targetID }) => {
  const [targetData, setTargetData] = useState({
    name: '',
    tag: '',
    classes: [],
    breadcrumb: []
  } as TargetData);
  useEffect(() => {
    if (targetID) {
      // Get target element data-flow-id
      const target = document.querySelector(`[data-flow-id="${targetID}"]`);
      // Get target name
      const name = target?.getAttribute('name');
      // Get target tag
      const tag = target?.tagName;
      // Get target classes
      const classes = target?.classList;
      // Get target breadcrumb (parent elemenets) till body using DOM API
      let selectedElement = document.querySelector('#selectedElementId'); // change this to select your element
      let parents = [];
      let parentElement = target?.parentElement;
      let breadcrumbs = [];
      // make breadcrumb reverse oredr of parents

      
      while (parentElement) {
          parents.push(parentElement);
          breadcrumbs.push(getElementSignature(parentElement));
          if(parentElement.id === 'canvas') break;
          parentElement = parentElement.parentElement;
      }
      setTargetData({
        name: name ? name : '',
        tag: tag ? tag : '',
        classes: classes ? Array.from(classes) : [],
        breadcrumb: breadcrumbs ? Array.from(breadcrumbs) : []
      });
   
    }
  }, [targetID]);

  return (
    <div className="panel__section target">
      <div className="panel__label">
        {
          targetData.name ? targetData.name : targetData.tag
        }
      </div>
      <div className="panel__input">
        <div className="target__tag">header</div>
        <div className="target__states">:hover</div>
    </div>
    <div className="breadcrumbs">
      {
      targetData.breadcrumb.map((node,index)=>(
        <div key={index} className="node">{node}</div>
      ))

        
      }
    </div>
  
  </div>
  );
};

export default Target;
/* 75 -> 61 */