import React from 'react';

import './form-input.styles.css';

const FormInput = ({ handleChange, label, ...otherProps }) => (
  <div className='group'>
    <input id="my-input" className='form-input' onChange={handleChange} {...otherProps} />
    {label ? (
      <label
      for="my-input"
        className={`form-input-label`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
