import React, { useEffect, useState } from 'react';
import './LayoutInspector.scss';

interface LayoutInspectorProps {
  layoutStyle: string;
  targetID: string;
}

const LAYOUT_TABS = ['block', 'flex', 'grid', 'inline-block', 'inline', 'none'];

// Helper function to update CSS rule for the target selector
const updateCSSRule = (targetSelector: string, highlightedLayoutTab: string) => {
  const styleSheet = document.styleSheets[0] as CSSStyleSheet;
  let ruleExists = false;

  // Check if the rule already exists
  for (const rule of styleSheet.cssRules) {
    if (rule.cssText.startsWith(targetSelector)) {
      ruleExists = true;
      // Update the existing rule with the new display value
      (rule as CSSStyleRule).style.display = highlightedLayoutTab;
      break;
    }
  }

  // If the rule does not exist, create a new one
  if (!ruleExists) {
    const newRule = `${targetSelector} { display: ${highlightedLayoutTab}; }`;
    styleSheet.insertRule(newRule, styleSheet.cssRules.length);
  }
};

const LayoutInspector: React.FC<LayoutInspectorProps> = ({ layoutStyle, targetID }) => {
  
  const [highlightedLayoutTab, setHighlightedLayoutTab] = useState(layoutStyle);

  useEffect(() => {
    // When the highlightedLayoutTab state changes, update the CSS rule for the target selector
    updateCSSRule(`[data-flow-id="${targetID}"]`, highlightedLayoutTab);
  }, [highlightedLayoutTab, targetID]);

  return (
    <div className="layout-inspector">
      <div className="panel-section__title">Layout</div>
      <div className="panel__section layout">
        <div className="layout-property">
          <div className="layout-property__label">Display</div>
        </div>
        <div className="tab__wrap">
          <div className={`highlighter ${highlightedLayoutTab}`} />
          <div className="layout-tabs">
            {/* Render layout tabs */}
            {LAYOUT_TABS.map((tab) => (
              <div
                key={tab}
                className={`layout-tab ${tab} ${tab === highlightedLayoutTab ? 'highlighted' : ''}`}
                onClick={() => setHighlightedLayoutTab(tab)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutInspector;
