import { Field } from 'redux-form';
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import { useEffect, useRef } from "react";


const TempateInput = (props) => {

  let $input = useRef(null);
  let dp = useRef(null);

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

    dp.current = new AirDatepicker($input.current, {
      range: true,
      multipleDatesSeparator: ' - ',
      dateFormat: 'dd.MM.yyyy'
    });
  }, []);




  return (
    <div className={wrapClass}>
      {label && <label htmlFor={input.name}><b>{label}</b> {labelSecond ? <span>{labelSecond}</span> : ''}</label>}
      <div className="data-input-container">
        <input
          {...input}
          // type="date"
          placeholder={placeholder}
          id={input.name}
          ref={$input}
          className={`input-date input-decorate ${checkErrorSubmit && error && 'input-error'}`}
        />

      </div>
      {(checkErrorSubmit && (error && <span className='input-error-text'>{error}</span>))}
    </div>
  );
}


const RenderInputDateRange = ({ obj }) => {



  return <Field
    name={obj.name}
    obj={obj}
    component={TempateInput}
  // validate={obj.validate}
  />;
}



export default RenderInputDateRange;