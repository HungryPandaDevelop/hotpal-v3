import RenderInput from 'components/input/RenderInput';

import { reduxForm } from 'redux-form';

import { useState } from 'react';

// --------------------------------------------------------------------

let TemplateForm = (props) => {
  const {
    fields,
    btnSubmitText,
    waitAnsw,
    submitSuccess,
    invalid,
    children

  } = props;



  const [checkErrorSubmit, setCheckErrorSubmit] = useState(false);

  const onSubmit = (e) => {
    let idTimeCheck;
    e.preventDefault();

    if (invalid) {


      setCheckErrorSubmit(true);
      clearTimeout(idTimeCheck);

      idTimeCheck = setTimeout(() => {
        setCheckErrorSubmit(false);
      }, 3000);

    } else {

      submitSuccess();
    }
  };

  if (!fields) {
    return <>Empty Fields For Form...</>
  }

  return (
    <form
      className="form main-grid"
    >
      <RenderInput
        fields={fields}
        checkErrorSubmit={checkErrorSubmit}
        onSubmit={onSubmit}
      />

      <div className="col-12 btn-container">
        <button className="btn--blue btn" onClick={onSubmit} >
          {waitAnsw ? (<>Loading...</>) : (
            <><i></i><span>{btnSubmitText}</span></>
          )}
        </button>
        {children}
      </div>


    </form>
  )
}

TemplateForm = reduxForm({
  form: 'singleInput'  // a unique identifier for this form
})(TemplateForm)

export default TemplateForm;


