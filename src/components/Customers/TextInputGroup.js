import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'; // takes 2 parameters, the initial class we want to apply then another class using object that depend on a condition

const TextInputGroup = ({
  label,
  name,
  value,
  placeholder,
  type,
  onChange,
  error

}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input 
        type={type}
        name={name} 
        className={classnames("form-control form-control-sm text-capt", {
          'is-invalid':error
        })} 
        placeholder={placeholder}
        value={value}
        onChange={onChange} 
        />
        {error && <div className="text-danger">{error}</div>}
        
    </div>    
  )
} 

TextInputGroup.propTypes = {

  label:PropTypes.string.isRequired,
  name:PropTypes.string.isRequired,
  value:PropTypes.string.isRequired,
  type:PropTypes.string.isRequired,
  onChange:PropTypes.func.isRequired,
}

TextInputGroup.defaultProps = {
  type: 'text' // input type default is text otherwise specify in the property ex. email, password as type
}

export default TextInputGroup;
