import { useState, useEffect, useRef } from 'react';
import { Field } from 'redux-form';


const TempateInput = (props) => {
  // console.log('hi', props)
  const {
    input,
    // meta: { error }
  } = props;

  const {
    label,
    labelSecond,
    placeholder,
    options,
    wrapClass,
    // checkErrorSubmit,
    // setErrCheck,
  } = props.obj;

  // создание селекта

  const selectRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState(placeholder);


  useEffect(() => {

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);

    function handleClick(e) {
      if (selectRef && selectRef.current) {
        const ref = selectRef.current
        if (!ref.contains(e.target)) {
          setOpen(false);
        }
      }
    }

  }, []);




  useEffect(() => {
    if (input.value) {

      const findEl = (options.filter((fl) => fl.value === input.value));
      if (findEl.length > 0) {
        setSelect(findEl[0].label);
        input.onChange(findEl[0].value);
      };

    }
    else {
      setSelect(placeholder)
    }
  }, [input]);
  // console.log(options, select)

  const renderOptions = options.map((li) => {
    return (
      <li
        key={li.value}
        onClick={() => { onSelectedChange(li) }}>
        {li.label}
      </li>
    )
  });


  const onSelectedChange = (value) => {

    setSelect(value.label);
    input.onChange(value.value);
  }


  return (
    <div className={wrapClass}>
      {label && (<label><b>{label}</b> <span>{labelSecond}</span></label>)}
      <div
        ref={selectRef}
        className={`custom-select ${open ? 'active' : ''}`}
        onClick={() => { setOpen(!open) }} >
        <span>{select}</span>
        <i></i>
        <ul className='ln'>
          {renderOptions}
        </ul>
      </div>

    </div>
  )
}

const RenderInputSelect = ({ obj }) => {


  return <Field
    name={obj.name}
    obj={obj}
    component={TempateInput}
  />

}


export default RenderInputSelect;