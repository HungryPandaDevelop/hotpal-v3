import { Field } from 'redux-form';
import { useEffect } from 'react';

const TempateInput = (props) => {

  const {
    input,
    meta: { error }
  } = props;

  const {
    label,
    labelSecond,
    placeholder,
    maxLength,
    wrapClass,
    checkErrorSubmit,
    setErrCheck,
  } = props.obj;


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
      {label && <label htmlFor={input.name}><b>{label}</b>{labelSecond && <div className='hint-input'><i><span>{labelSecond}</span></i></div>}</label>}
      <textarea
        {...input}
        type="textarea"
        id={input.name}
        className={`input-decorate ${checkErrorSubmit && error && 'input-error'} `}
        placeholder={placeholder}
        maxLength={maxLength}
      >
      </textarea>

      {(checkErrorSubmit && (error && <span className='input-error-text'>{error}</span>))}
    </div>
  );
}

const RenderInputTextarea = ({ obj }) => {


  return <Field
    name={obj.name}
    validate={obj.validate}
    obj={obj}
    component={TempateInput}
  />;
}


export default RenderInputTextarea;