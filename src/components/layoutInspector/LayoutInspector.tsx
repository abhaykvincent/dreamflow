import React, { useEffect, useState } from 'react';
import './LayoutInspector.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';


export function LayoutInspector({display}: {display: string}) {

  // LAYOUT INSPECTOR
  // Description: This component is responsible for displaying, highlighting and toggling the layout of the selected element
  console.log('display', display);

  // State
  // 1. Layout Tabs [display: block, flex, grid, none]
  const layoutTabs = ['block', 'flex', 'grid' , 'inline-block', 'inline', 'none']
  const [highlightedLayoutTab, setHighlightedLayoutTab] = useState('block');

  // Functions

  // 1. Toggle Layout Tab
  // Description: toggles the highlighted layout tab based on the tab clicked, passed as a parameter
  const toggleLayoutTab = (layoutTab:string) => {
    // set the highlighted layout tab to the tab clicked
    setHighlightedLayoutTab(layoutTab);
  };

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
