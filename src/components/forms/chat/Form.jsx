import RenderInput from 'components/input/RenderInput';

import { inputs } from './inputs';

import { reduxForm } from 'redux-form';

import {
  useState,
  useRef
} from 'react';

// --------------------------------------------------------------------

const TemplateForm = (props) => {
  const {
    waitAnsw,
    submitSuccess,
    submitInvite,
    reset,
    colText,
    colBtn,
    invalid,
    dispatch,
  } = props;

  const messageRef = useRef(null);

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
      reset();
    }


  };

  const customFieldImg = {
    ...inputs.fileMessage,
    dispatch: dispatch,
    messageRef: messageRef
  }

  const customFieldMessage = {
    ...inputs.message,
    messageRef: messageRef,
    onSubmit: onSubmit
  }

  const customFieldsInv = {
    ...inputs.invite,
    submitInvite: submitInvite,
    dispatch: dispatch
  }




  return (
    <form>

      <div className="main-grid">
        <div className={`${colText ? colText : 'col-8'} col-xs-12`}>
          <div className="form-container">

            <RenderInput
              type="single"
              fields={customFieldMessage}
              checkErrorSubmit={checkErrorSubmit}
            />

            <RenderInput
              type="single"
              fields={customFieldImg}
              dispatch={dispatch}
            />

          </div>
        </div>
        <div className={`${colBtn ? colBtn : 'col-4'} col-xs-12 chat-btns-outer`}>

          <RenderInput
            type="single"
            fields={customFieldsInv}
          />

          <div className="btn-container">
            <button className="btn--blue btn" onClick={onSubmit} >
              {waitAnsw ? (<>Loading...</>) : (
                <><i></i><span>Отправить</span></>
              )}
            </button>
          </div>
        </div>
      </div>
    </form >
  )
}



export default reduxForm({
  form: 'chatForm',
  enableReinitialize: true,
})(TemplateForm);


