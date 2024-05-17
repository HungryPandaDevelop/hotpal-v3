
import { useState, useEffect } from 'react';

import { Field, change } from 'redux-form';

import axios from 'axios';

// import storeImage from 'services/storeImage';

import { useRef } from 'react';

const TemplateFile = (props) => {

  const inputRef = useRef(null);

  // const storage = getStorage();

  const {
    input,
    // meta: { error }
  } = props;

  const {
    label,
    labelSecond,
    wrapClass,
    textEmpty,
    dispatch,
    messageRef
  } = props.obj;

  const [nameFile, setNameFile] = useState([]);
  const [loadingFile, setLoadingFile] = useState(false);


  useEffect(() => {
    // console.log('token', token)
    setNameFile(input.value);

  }, [input]);
  const onCallFileInput = () => {
    inputRef.current.click();
  }

  const onChange = async (e) => {
    setLoadingFile(true);

    const files = e.target.files;
    let fileUrls = [];

    dispatch(change('chatForm', 'message', ' '));

    try {
      messageRef.current.focus();
      for (let index = 0; index < files.length; index++) {
        // [...files].map((file, index) => {

        const formData = new FormData();
        formData.append("image", files[index]);

        const response = await axios.post(`https://hotpal.ru/api/upload.php`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        fileUrls.push({ url: response.data.imageURL, id: response.data.newFileName });
        // fileFull.push(response.data.newFileName);

      }


      setNameFile(fileUrls);
      input.onChange(fileUrls);
      setLoadingFile(false);
    }
    catch (err) {
      console.log('err', err);
    }

  };

  const deleteFile = async (deleteItem) => {
    console.log('deleteItem', deleteItem)
    try {
      const res = await axios.post(`https://hotpal.ru/api/deleteUpload.php`, { fileToDelete: deleteItem }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      console.log('Результат удаления файла:', res);

      setNameFile(nameFile.filter(item => item.id !== deleteItem))

      input.onChange(nameFile.filter(item => item.id !== deleteItem))


    } catch (err) {
      console.error('Ошибка при удалении файла', err);
    }
  }


  return (
    <div className={wrapClass}>

      {label && <label><b>{label}</b>{labelSecond && <div className='hint-input-file'><i><span>{labelSecond}</span></i></div>}</label>}

      <div
        className="file-input-container"
      >
        {loadingFile === true && <div className="preloader"></div>}
        <div className="file-decorate" onClick={onCallFileInput} ><span>{textEmpty}</span><i></i></div>
        {/* <input ref={elRef} type="text" {...input} value={nameFile} className="input-file-second" /> */}
        <input
          type="file"
          onChange={onChange}
          className="input-file"
          accept=".jpg, .jpeg, .png, .svg"
          ref={inputRef}
          multiple
        />
        {nameFile && nameFile.map((item, index) => (
          <div className="dragdrop-file-item" key={index}>
            <div className="dragdrop-file-img">
              <img src={item.url} alt={item.url} />
            </div>
            <i className="delete-img-dragdrop" onClick={() => { deleteFile(item.id) }}></i>
          </div>
        ))}
      </div>

    </div>
  )
}


const RenderInputFile = ({ obj }) => {

  return <Field
    name={obj.name}
    obj={obj}
    component={TemplateFile}
  />

}



export default RenderInputFile;