import { Field } from 'redux-form';
import { useState, useEffect, useRef } from 'react';

import { russianCities } from 'base/russianCities';


const TempateInput = (props) => {

  const {
    input,
    meta: { error }
  } = props;

  const {
    label,
    labelSecond,
    // placeholder,
    wrapClass,
  } = props.obj;

  // const [сhoiseName, setСhoiseName] = useState(placeholder ? placeholder : 'Выбрать город');

  const [filterVal, setFilterVal] = useState('');

  const [russianCitiesList, setRussianCities] = useState(russianCities);

  const selectRef = useRef(null);
  const inputRef = useRef(null);

  const [open, setOpen] = useState(false);


  useEffect(() => {


    // if (!input.value) {
    //   setСhoiseName(placeholder ? placeholder : 'Выбрать город')
    // }


    inputRef.current.addEventListener("focus", selectOpen);
    // inputRef.current.addEventListener("blur", selectClose);

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
    // return () => {
    //   inputRef.current.removeEventListener("focus", changeOpen);
    //   inputRef.current.removeEventListener("blur", changeOpen);

    // };


    function handleClick(e) {
      if (selectRef && selectRef.current) {
        const ref = selectRef.current
        if (!ref.contains(e.target)) {
          setOpen(false)
        }
      }
    }

    function selectOpen() {
      // console.log('ch')
      setOpen(true)
    }

    // function selectClose() {
    //   console.log('ch')
    //   setOpen(false)
    // }


  }, [input]);

  const choiseCity = (e) => {

    setFilterVal('');

    setRussianCities(russianCities);

    setFilterVal(e.currentTarget.getAttribute('namecity'));
    setOpen(false);

    // setСhoiseName(e.currentTarget.getAttribute('namecity'));
    input.onChange(e.currentTarget.getAttribute('namecity'));
  }

  const onSearchCity = (e) => {

    setFilterVal(e.target.value);

    const dataSearch = russianCities.filter(item => (item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0));

    setRussianCities(dataSearch)

  }

  const clearFilterVal = () => {
    setFilterVal('');
    // setСhoiseName(placeholder ? placeholder : 'Выбрать город');
    setRussianCities(russianCities);
    // setOpen(false);
  }

  const renderCityList = (russianCitiesListParam) => {

    return (russianCitiesListParam.length > 0) ? russianCitiesListParam.map((item, index) => (
      <li
        key={index}
        coords={[item.coords.lat, item.coords.lon]}
        namecity={item.name}
        onClick={choiseCity}

      >
        {item.name}</li>
    )) : (<li>Список пуст</li>);
  }


  return (
    <div className={wrapClass}>
      {label && <label><b>{label}</b>{labelSecond && <div className='hint-input'><i><span>{labelSecond}</span></i></div>}</label>}
      <div
        ref={selectRef}
        className={`custom-select search-select ${open ? 'active' : ''}`}

      >
        <div className={`search-field-container ${filterVal.length > 0 ? 'search-choises' : ''}`}>
          <em
            onClick={clearFilterVal}
          ></em>
          <input
            type="text"
            value={filterVal}
            ref={inputRef}
            className="search-input input-decorate"
            onChange={onSearchCity}
            placeholder="Введите название города"
          />
        </div>
        {/* {open && ( */}
        <ul
          className='ln'
        >
          {renderCityList(russianCitiesList)}
        </ul>
        {/* )} */}
      </div>
    </div>


  );
}



const RenderInputCity = ({ obj }) => {

  return <Field
    name={obj.name}
    obj={obj}
    component={TempateInput}

  />;
}


export default RenderInputCity;