
import { useState, useEffect } from 'react';
import { Field } from 'redux-form';


const TempateInput = (props) => {

  const {
    input,
    // reset,
    // meta: { error }
  } = props;

  const {
    label,
    options,
    wrapClass,
  } = props.obj;

  const [switchStatus, setSwitchStatus] = useState(false);


  const switchChange = (status) => {


    setSwitchStatus(status)
    if (status) {
      input.onChange(options[1].value);

    } else {
      input.onChange(options[0].value);

    }

  };

  useEffect(() => {

    // console.log('input.value', input.value)

    if (options[0].value === input.value) {
      switchChange(false);
    }
    else if (options[1].value === input.value) {
      switchChange(true);
    }
    if (!input.value) {

      switchChange(false);
    }
    // }
  }, [input]);



  return (
    <div className={wrapClass}>
      <label><b >{label}</b></label>
      <div
        className="switch-container"
        onClick={() => { switchChange(!switchStatus) }}
      >
        <span dangerouslySetInnerHTML={{ __html: options[0].name }}></span>
        <div
          className={`switch-input  ${switchStatus ? 'switch-input--active' : ''}`}

        >
          <i></i>
        </div>
        <span dangerouslySetInnerHTML={{ __html: options[1].name }}></span>
      </div>
    </div>
  )
}

const RenderInputSwitch = ({ obj }) => {

  return <Field
    name={obj.name}
    obj={obj}
    component={TempateInput}
  />;
}


export default RenderInputSwitch;