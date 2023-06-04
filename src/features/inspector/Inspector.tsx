/* 
User Story 1: DONE
As a web developer, I want to have a tabbed interface for the Visual Style, Properties, and Interactions editors. This will allow me to conveniently switch between panels with a single click while editing components, improving my productivity and workflow.

Acceptance Criteria:

There should be three tabs in the interface representing Visual Style, Properties, and Interactions editors.

Clicking on a tab should switch the active panel to the corresponding editor.

The tabbed interface should have a visually appealing design that is consistent with the overall application.

The active tab should be visually distinguishable from inactive tabs to provide clear feedback to the user.

Each editor panel should load the relevant content when its corresponding tab is clicked.

Changes made in one panel should be synchronized and reflected in the other panels to maintain consistency.

Real-time validation should be implemented to provide feedback on invalid inputs in each editor panel.

Error messages should be displayed and invalid fields should be highlighted when necessary.

The tabbed interface should be tested on different browsers and devices to ensure consistent behavior.

Bugs, glitches, and compatibility issues should be identified and resolved through thorough testing and debugging.

The tabbed interface should be intuitive and user-friendly, enhancing the overall editing experience for web developers.Task: Design tabbed interface for editors



Title: IN-PROCESS

Enhancement of Element Identification and Styling in Inspector

User Story 2: 

As a web designer, I want to see the element tag, name, breadcrumb trail, and associated classes within the Inspector when I select an element. This way, I can better understand the context and styling of the element, which allows me to make more accurate and efficient changes to its design attributes.

Acceptance Criteria for the User Story:



1. When a designer selects an element in the design view, the Inspector panel should automatically update to display the following:

   - The name of the selected element

   - The HTML tag of the selected element

   - The breadcrumb trail representing the hierarchical path of the selected element

   - All classes associated with the selected element

2. The designer should be able to modify the classes associated with the selected element directly from the Inspector panel.

3. Breadcrumb navigation should be clickable, allowing the designer to select parent elements from the breadcrumb trail itself.

4. All changes made in the Inspector panel should reflect in real-time on the selected element in the design view.

5. When the designer deselects the element or selects a different element, the Inspector panel should update accordingly with the new element's information.

6. The Inspector panel should function correctly and display accurate information for all kinds of elements present in the design view, including nested elements.

7. The features should work effectively for a variety of screen sizes and resolutions, ensuring the tool is responsive and adaptive.

8. The new features should not affect the existing functionalities of the IDE or slow down the performance of the application.


Features that can be added to enhance the functionality of the inspector panel in your Visual Web Builder IDE. Here are some additional possibilities:

**Inline Style Editing**: Allow users to modify the CSS directly from the inspector panel. When a user selects an element, display all the CSS properties related to that element, and allow for editing right within the panel. 
2. **State Management**: Show the different states of an element (e.g., hover, active, focus) and allow the designer to modify the styles of these states directly from the inspector panel.
3. **Box Model Visualization**: Provide a visual representation of the CSS box model (content, padding, border, margin) for the selected element. This would help designers better understand the sizing and spacing of an element.
4. **Responsiveness Preview**: Allow users to see how the selected element will look on different screen sizes and resolutions.
5. **Event Handlers**: Show the JavaScript event handlers attached to the element (e.g., onClick, onMouseOver, etc.). 
6. **Accessibility Features**: Indicate whether elements meet accessibility guidelines (e.g., has a defined 'alt' attribute for images).
7. **Component/Template Usage**: If your IDE supports component-based or template-based design, the inspector could also indicate where a selected component/template is used throughout the project.
8. **Animation Controls**: If the element has any animations or transitions applied, controls could be provided to adjust these directly within the inspector panel.
9. **History/Changes Tracking**: A feature that keeps track of changes made to the element, allowing users to go back to previous versions.

Remember, while adding features, it's crucial to maintain balance and avoid overwhelming users with too many options. The features should be organized in a user-friendly and intuitive way.
*/
import React, { useState } from 'react';
import './Inspector.scss';

export function Inspector() {
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
              <div className="panel__label">Div</div>
              <div className="panel__input">
                <div className="target__tag">header</div>
                <div className="target__states">:hover</div>
            </div>
            <div className="doctype">html</div>
            <div className="breadcrumbs">
              <div className="node">body</div> <span>&gt;</span>
              <div className="node">header</div> <span>&gt;</span>
              <div className="node">div.logo</div> <span>&gt;</span>
              <div className="node">img</div>
            </div>
            </div>
        </div>
        <div className={`panel ${inspectorPanels.highlightedTab === 'properties' ? 'active' : ''}`}>
          Settings
        </div>
        <div className={`panel ${inspectorPanels.highlightedTab === 'interactions' ? 'active' : ''}`}>
          Intractions
        </div>
       </div>
      </div>
  );
}
