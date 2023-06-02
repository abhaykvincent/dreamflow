/* As a web developer, I want to have a tabbed interface for the Visual Style, Properties, and Interactions editors. This will allow me to conveniently switch between panels with a single click while editing components, improving my productivity and workflow.

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



Consider usability and accessibility best practices for tabbed interfaces.

Task: Design the tabbed interface Description: Create a visually appealing and user-friendly design for the tabbed interface.

Sub-tasks:

Determine the layout and placement of the tabs within the interface.

Design the appearance of the tabs, considering factors such as color, typography, and icons.

Ensure consistency with the overall application's design and branding guidelines.

Create mockups or prototypes to visualize the tabbed interface design.

Task: Implement tabbed navigation

Description: Develop the functionality to switch between panels (Visual Style, Properties, and Interactions) using tabs.

Sub-tasks:

Identify the appropriate JavaScript framework or library for implementing tabbed navigation.

Create tabs for each editor panel and display them in the interface.

Implement the logic to switch the active panel when a tab is clicked.

Ensure smooth transitions between panels when switching tabs.

Task: Load content for each panel

Description: Load the relevant content for each panel when a tab is clicked.

Sub-tasks:

Define the content structure for each editor panel (Visual Style, Properties, and Interactions).

Implement the functionality to load the appropriate content when switching tabs.

Ensure that data and changes made in one panel are retained when switching to another.

Task: Synchronize changes between panels

Description: Ensure that changes made in one panel are reflected in the others, maintaining synchronization.

Sub-tasks:

Establish mechanisms to track changes made in each panel (e.g., listeners, data bindings).

Implement the synchronization logic to update related content in other panels when changes occur.

Test and verify that changes made in one panel are correctly propagated to others.

Task: Handle validation and error handling

Description: Implement validation and error handling mechanisms for user inputs in each editor panel.

Sub-tasks:

Define validation rules for each input field or control in the Visual Style, Properties, and Interactions editors.

Implement real-time validation to provide feedback on invalid inputs.

Display error messages and highlight invalid fields when necessary.

Ensure error handling and graceful recovery from errors or exceptions.

Task: Test and debug

Description: Conduct thorough testing of the tabbed interface and resolve any issues or bugs.

Sub-tasks:

Create test cases to cover different scenarios, including switching between panels and handling edge cases.

Perform functional testing to ensure the tabbed interface functions as expected.

Identify and address any bugs, glitches, or compatibility issues.

Gather feedback through usability testing and make necessary improvements. */


import React, { useState } from 'react';
import './Inspector.scss';

export function Inspector() {
  const [inspectorPanels, setInspectorPanels] = useState({
    panels: [
    {name: 'Style',class:'visualStyle'},
    {name: 'Settings',class:'properties'},
    {name: 'Intractions',class:'interactions'}
    ],
    highlightedTab: 'visualStyle'
  })
  const toggleHighlight = (panel:string) => {
    setInspectorPanels({...inspectorPanels,highlightedTab:panel})
  };
  return (
    <div className="inspector">
       <div className="tabs__wrap">
         <div className="tabs">
            <div className="tab-button">
              <div className={`highlighter ${inspectorPanels.highlightedTab.toLowerCase()}`}></div>
              <div className="tabs">
              {
                inspectorPanels.panels.map(panel=>(
                  <div key={panel.class} className={`tab ${inspectorPanels.highlightedTab.toLowerCase()} ${ (panel.class=== inspectorPanels.highlightedTab?'highlighted':'')} `}
                  onClick={() => toggleHighlight(panel.class)}
                  >{panel.name}</div>
                ))
              }
              </div>
            </div>
          </div>
       </div>
      </div>
  );
}
