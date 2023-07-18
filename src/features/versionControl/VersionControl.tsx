import React from 'react'

function VersionControl() {
    return <div className="git">
      <div className="dropdown disabled repository ">
        <div className="input">
          jm-ecommerce
        </div>
        <div className="label">Repository</div>
      </div>
      <div className="dropdown branch">
        <div className="input">
          <span>fix/</span> product-option
        </div>
        <div className="label">Branch</div>
  
      </div>
    </div>;
  }

export default VersionControl