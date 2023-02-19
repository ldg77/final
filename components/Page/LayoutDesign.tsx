import React from "react";

function LayoutDesign({ children }: any) {
  return (
    <div>
      <div className="info">
        <div className="description">bla</div>
        {children}
      </div>
      <div className="frame"></div>
    </div>
  );
}

export default LayoutDesign;
