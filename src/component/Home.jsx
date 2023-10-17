import React from 'react'
import Products from './Products';

function Home() {
    return(
    <div classNameName="hero">
      <div className="card bg-dark text-white border-0">
        <img src="/assets/bg.jpg" className="card-img" alt="Background"
        height="550px"/>
        <div className="card-img-overlay">
            <div classNameName="container">
          <h5 className="card-title display-3 fw-bolder mb-0">NEW SEASON
          ARRIVALS</h5>
            
    </div>
  </div>
</div>
<Products/>
    </div>
  );
}

export default Home




