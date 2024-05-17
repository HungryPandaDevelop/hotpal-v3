import { useState, useEffect } from 'react';
import { Field } from 'redux-form';

import ReactSlider from 'react-slider'

const TempateInput = (props) => {

  const {
    input,
    meta: { error }
  } = props;

  const {
    label,
    wrapClass,
    range,
  } = props.obj;

  const [startValue, setStartValue] = useState([range[0], range[1]])


  const resetValue = () => {
    setStartValue([range[0], range[1]])
  }

  useEffect(() => {
    if (input.value) {
      input.onChange(startValue)
    } else {
      input.onChange(startValue)
      resetValue();
    }

  }, [input])

  return (
    <div className={wrapClass}>
      {label && <label htmlFor={input.name}><b>{label}</b></label>}
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="range-thumb"
        trackClassName="range-track"
        defaultValue={[range[0], range[1]]}
        ariaLabel={['Upper thumb']}
        // ariaValuetext={state => `Thumb value ${state.valueNow}`}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        pearling
        minDistance={2}
        value={[startValue[0], startValue[1]]}
        min={range[0]}
        max={range[1]}
        onAfterChange={(value) => {
          // console.log(`onAfterChange: ${JSON.stringify(value[0])}`)
          setStartValue(value)
          input.onChange(value)
        }
        }
      />
    </div>
  );
}



const RenderInputText = ({ obj }) => {

  return <Field
    name={obj.name}
    obj={obj}
    component={TempateInput}
  />;
}



export default RenderInputText;