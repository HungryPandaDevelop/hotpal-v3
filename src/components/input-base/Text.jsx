import { Field } from 'redux-form';
import { useState, useEffect } from 'react';


const TempateInput = (props) => {

  const {
    input,
    meta: { error }
  } = props;

  const {
    label,
    labelSecond,
    placeholder,
    wrapClass,
    disabled,
    checkErrorSubmit,
  } = props.obj;



  const [firstLoad, setFirstLoad] = useState(0);


  useEffect(() => {
    if (input.value && firstLoad === 0) {
      setFirstLoad(1);
      input.onChange(input.value);
    }
  }, [input, firstLoad]);

  return (
    <div className={wrapClass}>
      {/* {<i className="num-offset">{num}</i>} */}
      {label && <label htmlFor={input.name}>{label} {labelSecond && <div className='hint-input'><i><span>{labelSecond}</span></i></div>}</label>}
      <input
        {...input}
        placeholder={placeholder}
        className={`input-decorate ${checkErrorSubmit && error && 'input-error'}`}
        disabled={disabled}

      />

      {(checkErrorSubmit && (error && <span className='input-error-text'>{error}</span>))}
    </div>
  );
}



const RenderInputText = ({ obj }) => {

  return <Field
    name={obj.name}
    obj={obj}
    validate={obj.validate}
    component={TempateInput}
  />;
}



export default RenderInputText;