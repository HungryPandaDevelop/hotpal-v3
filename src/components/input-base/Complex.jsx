import { useEffect } from 'react';

import { FieldArray } from 'redux-form';

import RenderInputText from './Text'; // поле стандартное

import RenderInputPhone from './Phone'; // поле стандартное

import RenderInputDate from './Date'; // поле стандартное

import RenderInputTextarea from './Textarea'; // поле текста

import RenderInputSelect from './Select';



const TemplateInputComplex = ({ allFields, fields, btnAddText, className }) => {

  useEffect(() => {
    fields.push();
  }, []);

  const choiseFields = (hobbyParam) => {

    return allFields.map((item, index) => {
      switch (item.type) {
        case 'text':
          return (
            <div key={index} className={item.wrapClass}>
              <RenderInputText
                // className='input-decorate'
                // name={`${hobbyParam}.${item.name}`}
                // placeholder={item.placeholder}
                obj={{ ...item, name: hobbyParam + '.' + item.name }}

              />
            </div>
          )
        case 'phone':
          return (
            <div key={index} className={item.wrapClass}>
              <RenderInputPhone
                className='input-decorate'
                name={`${hobbyParam}.${item.name}`}
              />
            </div>
          )
        case 'date':
          return (
            <div key={index} className={item.wrapClass}>
              <RenderInputDate
                className='input-decorate'
                name={`${hobbyParam}.${item.name}`}
                placeholder={item.placeholder}
              />
            </div>
          )
        case 'textarea':
          return (
            <div key={index} className={item.wrapClass}>
              <RenderInputTextarea
                obj={{ ...item, name: hobbyParam + '.' + item.name }}
              />
            </div>
          )
        case 'select':
          return (
            <div key={index} className={item.wrapClass}>
              {item.label && <label><b>{item.label}</b></label>}
              <RenderInputSelect
                name={`${hobbyParam}.${item.name}`}
                placeholder={item.placeholder}
                options={item.options}
              />
            </div>
          )
        default:
      }
    })
  };

  return (
    <div className={className}>
      {fields.map((item, index) => (
        <div key={index} className="complex-input">
          <div className="main-grid">
            {choiseFields(item, allFields)}
            <div
              onClick={() => fields.remove(index)}
              className="complex-delete-field ico-in"
            >
            </div>
          </div>
        </div>
      ))}
      <div className="btn-container col-12">
        <div className='btn btn--green ico-in ico-in--left btn-add' onClick={() => { fields.push(); }}>
          <i></i><span>{btnAddText}</span>
        </div>
      </div>
    </div>
  )
}

const RenderInputComplex = ({ name, allFields, label, btnAddText, num, className }) => {

  return (
    <>
      {num && <i className="num-offset">{num}</i>}
      {label && (<label><b>{label}</b></label>)}
      <FieldArray
        allFields={allFields}
        name={name}
        component={TemplateInputComplex}
        btnAddText={btnAddText}
        num={num}
        className={className}
      />
    </>
  )
}


export default RenderInputComplex
