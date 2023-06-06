
import React, { useEffect, useState } from 'react';
import './Inspector.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTarget } from '../canvas/canvasSlice';
import { LayoutInspector } from '../../components/layoutInspector/LayoutInspector';

//Interface for target data
interface TargetData {
  name: string;
  tag: string;
  classes: string[];
  breadcrumb: string[];
}

export function Inspector() {
  // State: Target Element
  const targetID = useAppSelector(selectTarget);
  // Target Data
  const [targetData, setTargetData] = useState({
    name: '',
    tag: '',
    classes: [],
    breadcrumb: []
  } as TargetData);
  // On Target change, update target data
  useEffect(() => {
    function getElementSignature(element: HTMLElement) {
      let name = element.tagName.toLowerCase();
      let id = element.id ? '#' + element.id : '';
      let className = element.className ? '.' + element.className.split(' ').join('.') : '';
      return name + className + id;
  }
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
      

console.log(parents);


      setTargetData({
        name: name ? name : '',
        tag: tag ? tag : '',
        classes: classes ? Array.from(classes) : [],
        breadcrumb: breadcrumbs ? Array.from(breadcrumbs) : []
      });
    }
  }, [targetID]);
  

  const [inspectorPanels, setInspectorPanels] = useState({
    panels: [
    {name: 'Style',class:'visualStyle'},
    {name: 'Settings',class:'properties'},
    {name: 'States',class:'interactions'}
    ],
    highlightedTab: 'visualStyle'
  })
  const toggleHighlight = (panel:string) => {
    setInspectorPanels({...inspectorPanels,highlightedTab:panel})
  };




  return (
    <div className="inspector">
       <div className="tabs__wrap">
            <div className={`highlighter ${inspectorPanels.highlightedTab.toLowerCase()}`}></div>
            <div className="tab-button">
              <div className="tabs"
              style={{userSelect:'none'}}>
              {
                inspectorPanels.panels.map(panel=>(
                  <div key={panel.class} className={`tab ${inspectorPanels.highlightedTab.toLowerCase()} ${ (panel.class=== inspectorPanels.highlightedTab?'highlighted':'')} `}
                  onClick={() => toggleHighlight(panel.class)}
                  >{panel.name}</div>
                ))
              }
              </div>
              <div className="tabs__shadow"></div>
            </div>
          </div>
       <div className="panels">
        <div className={`panel ${inspectorPanels.highlightedTab === 'visualStyle' ? 'active' : ''}`}>
          
          {/* As a web designer, I want to see the element tag, name, breadcrumb trail, and associated classes within the Inspector when I select an element. This way, I can better understand the context and styling of the element, which allows me to make more accurate and efficient changes to its design attributes.*/}
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
          {/* Create component button */}
          <div className="panel__section create_component">
            <div className="panel_button">Create Component </div>
          </div>
          {/* Style section: Spacing */}
          <div className="panel-section__title">Spacing</div>
          <div className="panel__section spacing">

            <div className="spacing__wrap">
              <div className="spacing__label">Padding</div>
              <div className="spacing__input">
                <input type="number" className="spacing__input__field" />
                <input type="number" className="spacing__input__field" />
                <input type="number" className="spacing__input__field" />
                <input type="number" className="spacing__input__field" />
              </div>
            </div>

            <div className="spacing__wrap">
              <div className="spacing__label">Margin</div>
              <div className="spacing__input">
                <input type="number" className="spacing__input__field" />
                <input type="number" className="spacing__input__field" />
                <input type="number" className="spacing__input__field" />
                <input type="number" className="spacing__input__field" />
              </div>
            </div>
            
          </div>
          <LayoutInspector/>
        </div>
        <div className={`panel ${inspectorPanels.highlightedTab === 'properties' ? 'active' : ''}`}>
          
          {/* As a web designer, I want to see the element tag, name, breadcrumb trail, and associated classes within the Inspector when I select an element. This way, I can better understand the context and styling of the element, which allows me to make more accurate and efficient changes to its design attributes.*/}
          <div className="panel__section target">
              <div className="panel__label">
                {
                  targetData.name ? targetData.name : targetData.tag
                }
              </div>
              <div className="panel__input">
                <div className="target__tag">ttt</div>
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
          {/* Create component button */}
          <div className="panel__section create_component">
            <div className="panel_button">Create Component </div>
          </div>
          <div className="panel__section create_component">
            <div className="panel_button">Create Component </div>
          </div>
          <div className="panel__section create_component">
            <div className="panel_button">Create Component </div>
          </div>
          <div className="panel__section create_component">
            <div className="panel_button">Create Component </div>
          </div>
          <div className="panel__section create_component">
            <div className="panel_button">Create Component </div>
          </div>
        </div>
        <div className={`panel ${inspectorPanels.highlightedTab === 'interactions' ? 'active' : ''}`}>
          Intractions
        </div>
       </div>
      </div>
  );
}
