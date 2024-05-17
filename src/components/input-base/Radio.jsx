
import { Field } from 'redux-form';
import { connect } from 'react-redux';

const TemplateInputRadio = ({ name, label, labelSecond, options, input, num, className }) => {

  return (
    <div className={className}>
      {num && <i className="num-offset">{num}</i>}
      {label && <label><b>{label}</b> {labelSecond ? <span>{labelSecond}</span> : ''}</label>}
      <div className="checkbox-container">
        {options.map((item, index) => (
          <div className='checkbox' key={index}>
            <label>

              <input
                {...input}
                name={name}
                value={item.value}
                type="radio"
                checked={input.value === item.value ? 'checked' : ''}
              />
              <span></span>
              <em>{item.label}</em>
            </label>
          </div>
        ))}
      </div>

    </div>
  );
}

const RenderInputRadio = ({
  name,
  label,
  labelSecond,
  options,
  num,
  inputValueConnect,
  className,
  hideByClickId
}) => {

  if (hideByClickId && !inputValueConnect) { return false }
  else if (inputValueConnect.length > 0 && hideByClickId.indexOf(inputValueConnect) === -1) {
    return false;
  }
  return <Field
    name={name}
    label={label}
    labelSecond={labelSecond}
    options={options}
    component={TemplateInputRadio}
    num={num}
    className={className}
  />;
}


const mapStateToProps = (state) => {

  return {
    inputValueConnect: state.inputConnectState.inputValueConnect,
  }
}
export default connect(mapStateToProps)(RenderInputRadio);