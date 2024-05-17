import { Field } from 'redux-form';
import { useState, useEffect, useRef } from "react"

const TempateInput = (props) => {

  const {
    input
  } = props;

  const {
    label,
    options,
    wrapClass,
  } = props.obj;

  const [choisesTags, setChoisesTags] = useState([]);


  useEffect(() => {

    if (input.value) {
      setChoisesTags(input.value);
    } else {
      setChoisesTags([])
    }


    input.onChange(choisesTags);
  }, [choisesTags]);

  useEffect(() => {

    if (!input.value) {
      setChoisesTags([])
    }

  }, [input]);



  const onActiveTags = (item) => {
    if (choisesTags.includes(item)) {
      setChoisesTags(choisesTags.filter(el => item !== el));
      input.onChange(choisesTags.filter(el => item !== el));
    } else {
      setChoisesTags([...choisesTags, item]);
      input.onChange([...choisesTags, item]);
    }

  };



  return (
    <div className={wrapClass}>
      {label && (<label>{label}</label>)}
      <div className="tags-container">
        {options.map((item, index) => (
          <span
            key={index}
            className={`tag tag--link ${choisesTags.includes(item) ? 'active' : ''}`}
            onClick={() => { onActiveTags(item) }}
            dangerouslySetInnerHTML={{ __html: item }}
          ></span>))}
      </div>
    </div>
  )
}


const EditionTags = ({ obj }) => {

  return <Field
    name={obj.name}
    obj={obj}
    component={TempateInput}
  />;
}

export default EditionTags
