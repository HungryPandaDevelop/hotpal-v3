import RenderInput from 'components/input/RenderInput';

import { reduxForm } from 'redux-form';

import { useState } from 'react';

import { inputs } from './inputs';

const TemplateForm = (props) => {

  const {

    waitAnsw,
    submitSuccess,
    invalid,

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

  if (!inputs) {
    return <>Empty Fields For Form...</>
  }





  return (

    <form
      className="form main-grid"
    >
      <RenderInput
        type="single"
        fields={inputs.name}
        checkErrorSubmit={checkErrorSubmit}

      />


      <RenderInput
        type="single"
        fields={inputs.email}
        checkErrorSubmit={checkErrorSubmit}
      />

      <RenderInput
        type="single"
        fields={inputs.dateBerth}
        checkErrorSubmit={checkErrorSubmit}
      />

      <RenderInput
        type="single"
        fields={inputs.hotelFind}
        checkErrorSubmit={checkErrorSubmit}
      />


      <RenderInput
        type="single"
        fields={inputs.imgsAccount}
        checkErrorSubmit={checkErrorSubmit}
      />

      <RenderInput
        type="single"
        fields={inputs.gender}
        checkErrorSubmit={checkErrorSubmit}
      />
      <RenderInput
        type="single"
        fields={inputs.password}
        checkErrorSubmit={checkErrorSubmit}
      />

      <div className="btn-container">
        <button className="btn--blue btn" onClick={onSubmit} >
          {waitAnsw ? (<>Loading...</>) : (
            <><i></i><span>Регистрация</span></>
          )}
        </button>
      </div>
    </form>

  )
}


export default reduxForm({
  form: 'singleInput',
  enableReinitialize: true,
})(TemplateForm);