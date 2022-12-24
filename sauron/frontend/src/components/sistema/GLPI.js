import React from "react";


const GLPI = ({campos}) => {

  return (
    <>
    {campos.map((item) => (
      <div className="mb-3">
        <label htmlFor={item} className="form-label">{item}</label>
        <input type="text" id={item} name={item} className="form-control" />
      </div>
    ))}
    </>
  )
}

export default GLPI;
