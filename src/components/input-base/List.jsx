import { Field } from 'redux-form';
import { ReduxCheckbox, Checkboxes } from 'react-form-checkbox';


const TemplateInputList = ({ input, label }) => (
  <div className="checkbox">
    <label>
      {label}
      <input type="checkbox" {...input} />
      <span></span>
    </label>
  </div>
);


const RenderInputList = ({ name, label, labelSecond, options, num }) => {

  return (
    <>
      {num && <i className="num-offset">{num}</i>}
      {label && (<label><b>{label}</b><span>{labelSecond}</span></label>)}
      <Field
        name={name}
        component={ReduxCheckbox(Checkboxes)}
        data={options}
        itemComponent={TemplateInputList}

      />
    </>
  );
}

export default RenderInputList;