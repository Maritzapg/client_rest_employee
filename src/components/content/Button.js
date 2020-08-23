import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <div onClick={onClick} className='ui right floated small primary labeled icon button'>
      <i className='user icon'></i> {text}
    </div>
  );
};

export default Button;
