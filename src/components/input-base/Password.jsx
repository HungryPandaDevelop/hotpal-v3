import { Field } from 'redux-form';
import { useState, useEffect } from 'react';


const TemplateFieldPassword = (props) => {

  const {
    input,
    meta: { error }
  } = props;

  const {
    label,
    labelSecond,
    placeholder,
    checkErrorSubmit,
    setErrCheck,
    wrapClass,
  } = props.obj;

  const [showPass, setShowPass] = useState(false);


  useEffect(() => {

    if (setErrCheck) {
      if (error) {
        setErrCheck(false);
      }
      else {
        setErrCheck(true);
      }
    }

  }, [error]);


  return (
    <div className={wrapClass}>
      {label && <label htmlFor={input.name}>{label} {labelSecond && <div className='hint-input'><i><span>{labelSecond}</span></i></div>}</label>}
      <div className={`input-password ${showPass ? 'view-pass' : ''}`}>
        <input
          type={showPass ? ("text") : ("password")}
          {...input}
          placeholder={placeholder}
          className={`input-decorate ${checkErrorSubmit && error && 'input-error'}`}
        />

        <i data-visibility={showPass} onClick={() => { setShowPass(!showPass) }}></i>
      </div>
      {(checkErrorSubmit && (error && <span className='input-error-text'>{error}</span>))}
    </div>
  )
}

const RenderInputPassword = ({ obj }) => {



  return <Field
    name={obj.name}
    validate={obj.validate}
    obj={obj}
    component={TemplateFieldPassword}
  />;
}

export default RenderInputPassword;