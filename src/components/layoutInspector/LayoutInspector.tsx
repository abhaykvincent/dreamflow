import React, { useEffect, useState } from 'react';
import './LayoutInspector.scss';

interface LayoutInspectorProps {
  targetID: string;
}

const LAYOUT_TABS = ['block', 'flex', 'grid', 'inline-block', 'inline', 'none'];

const updateCSSRule = (targetSelector: string, highlightedLayoutTab: string) => {
  const styleSheet = document.styleSheets[0] as CSSStyleSheet;
  let ruleExists = false;

  for (const rule of styleSheet.cssRules) {
    if (rule.cssText.startsWith(targetSelector)) {
      ruleExists = true;
      (rule as CSSStyleRule).style.display = highlightedLayoutTab;
      break;
    }
  }

  if (!ruleExists) {
    const newRule = `${targetSelector} { display: ${highlightedLayoutTab}; }`;
    styleSheet.insertRule(newRule, styleSheet.cssRules.length);
  }
};

const LayoutInspector: React.FC<LayoutInspectorProps> = ({ targetID }) => {
  const [highlightedLayoutTab, setHighlightedLayoutTab] = useState('');

  useEffect(() => {
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
/* 75 -> 61 */