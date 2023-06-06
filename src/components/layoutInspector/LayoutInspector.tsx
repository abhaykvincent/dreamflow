import React, { useEffect, useState } from 'react';
import './LayoutInspector.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

interface LayoutInspectorProps {
  layoutStyle: string;
  targetID: string;
}

export function LayoutInspector({layoutStyle,targetID} : LayoutInspectorProps) {

  // LAYOUT INSPECTOR
  // Description: This component is responsible for displaying, highlighting and toggling the layout of the selected element

  // State
  // 1. Layout Tabs [display: block, flex, grid, none]
  const layoutTabs = ['block', 'flex', 'grid' , 'inline-block', 'inline', 'none']
  const [highlightedLayoutTab, setHighlightedLayoutTab] = useState(layoutStyle);

  // Functions

  // 1. Toggle Layout Tab
  // Description: toggles the highlighted layout tab based on the tab clicked, passed as a parameter
  const toggleLayoutTab = (layoutTab:string) => {

    // set the highlighted layout tab to the tab clicked
    setHighlightedLayoutTab(layoutTab);
  };


  // LIFE CYCLE METHODS

  // 1. useEffect - highlightedLayoutTab
  // when the highlightedLayoutTab changes, update the layout style of the selected element
  useEffect(() => {
    // Get target element data-flow-id
    const target = document.querySelector(`[data-flow-id="${targetID}"]`);
    // set the layout style of the selected element to the highlighted layout tab
    target?.setAttribute('style', `display: ${highlightedLayoutTab}`);
    
  }, [highlightedLayoutTab]);



  return(
    <div className="layout-inspector">
      <div className="panel-section__title">Layout</div>
      <div className="panel__section layout">
        <div className="layout-property">
          <div className="layout-property__label">Display</div>
        </div>
        <div className="tab__wrap">
          <div className={`highlighter ${highlightedLayoutTab}`}></div>
          <div className="layout-tabs">
          {
            layoutTabs.map(tab=>(
              <div key={tab} className={`layout-tab ${tab} ${ (tab===highlightedLayoutTab?'highlighted':'')} `}
              onClick={() => toggleLayoutTab(tab)}
              ></div>
            ))
          }
          </div>
        </div>

      </div>
    </div>
  )
}
