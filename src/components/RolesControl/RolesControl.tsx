
import React, { useEffect, useState } from 'react';
import './RolesControl.scss';

const roles = ['Design','Code']; // An array of labels
const RolesControl: React.FC = () => {
  const [highlightedRole, setHighlightedRole] = useState('Design');
  const toggleRole = (role:string) => {
    setHighlightedRole(role);
  };
  return (
    <div className="roles">
      <div className="tab-button">
        <div className={`highlighter ${highlightedRole.toLowerCase()}`}></div>
        <div className="tabs">
        {
          roles.map(role=>(
            <div key={role} className={`role ${role.toLowerCase()} ${ (role===highlightedRole?'highlighted':'')} `}
            onClick={() => toggleRole(role)}
            >{role}</div>
          ))
        }
        </div>
      </div>
    </div>
  );
};

export default RolesControl;
/* 75 -> 61 */