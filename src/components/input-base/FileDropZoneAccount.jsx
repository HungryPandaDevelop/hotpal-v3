
import { useState, useEffect } from 'react';

import { Field } from 'redux-form';

import axios from 'axios';

import { useDropzone } from 'react-dropzone'

import TinySlider from "tiny-slider-react";
import 'tiny-slider/dist/tiny-slider.css';
// import { type } from '@testing-library/user-event/dist/type';

const settings = {
  // lazyload: true,
  nav: false,
  controls: true,
  mouseDrag: true,
  loop: false,
  items: 1,
  // gutter: 15,
};



const TemplateFile = (props) => {


  const {
    input,
    meta: { error }
  } = props;



  const {
    label,
    labelSecond,
    minLengthText,
    wrapClass,
    setErrCheck,
    checkErrorSubmit
  } = props.obj;

  // console.log('onSubmit', onSubmit)

  const [nameFile, setNameFile] = useState([]);

  const [arrFiles, setArrFiles] = useState([]);

  const [loadingFile, setLoadingFile] = useState(false);

  useEffect(() => {
    // console.log('input.name', input.value)
    if (setErrCheck) {
      if (error) {
        setErrCheck(false);
      }
      else {
        setErrCheck(true);
      }
    }

  }, [error]);

  useEffect(() => {
    // console.log('input.value', input.value)
    if (input.value) {

      let toObj = [];
      if ('object' === typeof input.value) {
        toObj = input.value;
        // console.log('1')
      }
      else {
        toObj = JSON.parse(input.value);
      }


      setArrFiles(toObj)
      setNameFile(toObj);
    }
  }, [input]);


  const onDrop = async (acceptedFiles) => {
    setLoadingFile(true);

    // console.log('acceptedFiles', acceptedFiles);

    const files = acceptedFiles;

    let fileUrls = [];

    try {

      for (let index = 0; index < files.length; index++) {
        // [...files].map((file, index) => {

        const formData = new FormData();
        formData.append("image", files[index]);

        const response = await axios.post(`https://hotpal.ru/api/upload.php`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        // console.log('res', response)

        fileUrls.push({ url: response.data.imageURL, id: response.data.newFileName });
        // fileFull.push(response.data.newFileName);

      }


      setNameFile([...arrFiles, ...fileUrls]);
      input.onChange([...arrFiles, ...fileUrls]);
      setLoadingFile(false);
    }
    catch (err) {
      console.log('err', err);
    }


  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] }
  });


  const deleteFile = async (deleteItem) => {
    console.log('deleteItem', deleteItem)
    try {
      const res = await axios.post(`https://hotpal.ru/api/deleteUpload.php`, { fileToDelete: deleteItem }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      // console.log('Результат удаления файла:', res);

      setNameFile(nameFile.filter(item => item.id !== deleteItem))

      input.onChange(nameFile.filter(item => item.id !== deleteItem))


    } catch (err) {
      console.error('Ошибка при удалении файла', err);
    }
  }


  const renderTiny = (files, settingsParams, classParam) => {


    if (files.length === 0) {
      return false
    }

    // console.log('files', typeof files)

    // files = JSON.parse(files);

    return <div className={classParam}>
      <TinySlider settings={settingsParams} >
        {files.map((item, index) => (
          <div className="tiny-account-item" key={index}>
            <div className="tiny-account-img">
              <img src={item.url} alt={item.url} />
              <div className="tiny-account-shadow"></div>
              <i className="delete-img-dragdrop" onClick={() => { deleteFile(item.id) }}></i>
            </div>
          </div>
        ))}

      </TinySlider>
    </div>

  }


  return (
    <div className={wrapClass}>

      <div className="tiny-account">

        {nameFile.length === 0 && (
          <div className="tiny-account-stub">
            <span><b>Добавьте свое фото</b></span>
            <i></i>
          </div>
        )}

        {renderTiny(nameFile, settings)}
      </div>

      {label && <label><b>{label}</b>{labelSecond && <div className='hint-input-file hint-tiny-file'><i><span>{labelSecond}</span></i></div>}</label>}

      <div className={`dragdrop-container ${isDragActive ? 'dragged' : ''}`} {...getRootProps()}>
        <input {...getInputProps()} />
        {loadingFile === true ? <div className="preloader"></div> : (<span>Перетащите несколько файлов сюда или нажмите, чтобы выбрать файлы</span>)}
      </div>

      {renderTiny(nameFile, { ...settings, items: 3, gutter: 15, }, 'dragdrop-uploaded-tiny')}
      {(checkErrorSubmit && (error && <span className='input-error-text'>{minLengthText}</span>))}
    </div>

  )
}


const RenderInputFile = ({ obj }) => {

  return <Field
    name={obj.name}
    obj={obj}
    component={TemplateFile}
    validate={obj.validate}
  />

}


export default RenderInputFile
