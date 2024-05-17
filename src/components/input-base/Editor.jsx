import { Field } from 'redux-form';
import { useEffect } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const TempateInput = (props) => {

  const {
    input,
    meta: { error }
  } = props;

  const {
    label,
    labelSecond,
    wrapClass,
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

  const handleChange = (value) => {
    input.onChange(value);
  };

  const COLORS = [
    "#000000", "#e60000", "#ff9900", "#ffff00", "#008A00", "#0066cc", "#9933ff",
    "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff",
    "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff",
    "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2",
    "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"
  ];
  var toolbarOptions = [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image'],
    ['clean'],
    [{ 'color': COLORS }, { 'background': COLORS }]

  ];

  const modules = {
    toolbar: toolbarOptions,
  };


  return (
    <div className={wrapClass}>
      {label && <label htmlFor={input.name}><b>{label}</b>{labelSecond && <div className='hint-input'><i><span>{labelSecond}</span></i></div>}</label>}

      <ReactQuill
        modules={modules}
        theme='snow'
        value={input.value}
        onChange={handleChange}
        className={`input-decorate ${error && 'input-error'}`}
      />

    </div>
  );
}

const RenderInputEditor = ({ obj }) => {


  return <Field
    name={obj.name}
    validate={obj.validate}
    obj={obj}
    component={TempateInput}
  />;
}


export default RenderInputEditor;