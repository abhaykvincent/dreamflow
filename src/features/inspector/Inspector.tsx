
import React, { useEffect, useState } from 'react';
import './Inspector.scss';
import { useAppSelector } from '../../app/hooks';
import { selectTarget, selectTargetStyles } from '../canvas/canvasSlice';
import LayoutInspector from '../../components/layoutInspector/LayoutInspector';
import { PositionInspector } from '../../components/positionInspector/PositionInspector';
import { SizeInspector } from '../../components/sizeInspector/SizeInspector';
import Target from '../../components/Target/Target';
import { SpacingInspector } from '../../components/SpacingInspector/SpacingInspector';



export function Inspector() {

  const [inspectorPanels, setInspectorPanels] = useState({
    panels: [
    {name: 'Style',class:'visualStyle'},
    {name: 'Settings',class:'properties'},
    {name: 'States',class:'interactions'}
    ],
    highlightedTab: 'visualStyle'
  })
  const toggleInspectorPanels = (panel:string) => {
    setInspectorPanels({...inspectorPanels,highlightedTab:panel})
  };
  // State: Target Element
  const targetID = useAppSelector(selectTarget)

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
              onClick={() => toggleInspectorPanels(panel.class)}
              >{panel.name}</div>
            ))
          }
          </div>
          <div className="tabs__shadow"></div>
        </div>

      </div>
      <div className="panels">
        <div className={`panel ${inspectorPanels.highlightedTab === 'visualStyle' ? 'active' : ''}`}>
          
          {/* Style section: Target */}
          <Target targetID={targetID} />
          {/* Create component button */}
          <div className="panel__section create_component">
            <div className="panel_button">Create Component </div>
          </div>
          {/* Style section: Spacing */}
         <SpacingInspector targetID={targetID} />
          {/* Style section: Layout */}
          <LayoutInspector targetID={targetID} />
          {/* Style section: Position */}
          <PositionInspector targetID={targetID} />
          {/* Style section: Size */}
          <SizeInspector targetID={targetID} />
          
        </div>
        <div className={`panel ${inspectorPanels.highlightedTab === 'properties' ? 'active' : ''}`}>
          {/* Create component button */}
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
// lines      - 156 ->  147 -> 112 ->
// complexity - 44 -> 
