import { Field } from 'redux-form';
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import { useEffect, useRef } from "react";

import { InputMask } from '@react-input/mask';

const TempateInput = (props) => {

  let dp = useRef(null);
  let inputRef = useRef(null);


  const {
    input,
    meta: { error }
  } = props;

  const {
    label,
    labelSecond,
    placeholder,
    wrapClass,
    checkErrorSubmit,
    setErrCheck,
  } = props.obj;

  useEffect(() => {
    // console.log('input.name', input.value)
    if (setErrCheck) {
      if (error) {
        setErrCheck(false);
      }
      else {
        setErrCheck(true);
      }
    }

  }, [error]);

  useEffect(() => {
    // Save instance for the further update

    dp.current = new AirDatepicker(inputRef.current, {
      dateFormat: 'dd-MM-yyyy'
    });
  }, []);




  return (
    <div className={wrapClass}>
      {label && <label htmlFor={input.name}><b>{label}</b> {labelSecond ? <span>{labelSecond}</span> : ''}</label>}
      <div className="data-input-container">

        <InputMask
          {...input}
          placeholder={placeholder}
          id={input.name}
          className={`input-date input-decorate ${checkErrorSubmit && error && 'input-error'}`}
          mask="__-__-____"
          replacement={{ _: /\d/ }}
          ref={inputRef}
          readOnly
        />


      </div>
      {(checkErrorSubmit && (error && <span className='input-error-text'>{error}</span>))}
    </div>
  );
}


const RenderInputDate = ({ obj }) => {



  return <Field
    name={obj.name}
    obj={obj}
    component={TempateInput}
    validate={obj.validate}
  />;
}



export default RenderInputDate;