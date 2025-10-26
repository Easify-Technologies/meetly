import React from "react";

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader">
        <div className="cup">
          <div className="cup-handle" />
          <div className="smoke one" />
          <div className="smoke two" />
          <div className="smoke three" />
        </div>
        <div className="load">..........................</div>
      </div>
    </div>
  );
};

export default Loader;
