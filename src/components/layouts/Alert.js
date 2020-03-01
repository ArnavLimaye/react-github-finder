import React from "react";

const Alert = ({ alert }) => {
  return (
    alert !== null && (
      <div className={`alert-${alert.type}`}>
        <i className='fas fa-info-circle'>Please enter something</i>
      </div>
    )
  );
};

export default Alert;
