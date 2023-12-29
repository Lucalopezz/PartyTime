import React from 'react';

const TextArea = ({ text, placeholder, handleOnChange, value, name }) => {
  return (
    <label>
      <span>{text}</span>
      <textarea
        name={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
      />
    </label>
  );
};

export default TextArea;