// https://github.com/sanniassin/react-input-mask
import React from 'react';
import InputMask from 'react-input-mask';

const InputMascara = (props) => (
  <InputMask
    mask={props.mask}
    onChange={props.onChange}
    type={props.type}
    name={props.name}
    className={props.className}
    value={props.value}
    placeholder={props.placeholder}
    maskPlaceholder={null} // Null para não exibir os "___.___.___"
    ref={props.innerRef}
  />
);

export default InputMascara;