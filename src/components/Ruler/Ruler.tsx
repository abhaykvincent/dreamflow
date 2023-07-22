import React, { useEffect } from 'react'

function Ruler({canvasDimensionsStore}:any){
    const { width, left } = canvasDimensionsStore;
    useEffect(() => {
        const ruler = document.getElementById('responsive-ruler')
        
        if (ruler) {
          ruler.style.width = `${width}px`;
          ruler.style.left = `${left}px`;
        }
    
    }, [width, left]);
    
    const Marks = Array.from(Array(Math.ceil(width?width / 50:0)).keys())
    .map(index => {
        const value = 50 * index;
        return (
            <div key={index} className="responsive-ruler__horizontal__mark" style={{left: value}}>
            <div className="responsive-ruler__horizontal__mark__label">{value}</div>
            </div>
        );
    });
  return(
      <div id="responsive-ruler">
        <div className="responsive-ruler__horizontal"> 
        {Marks}
        </div>
      </div>
  )
}

export default Ruler