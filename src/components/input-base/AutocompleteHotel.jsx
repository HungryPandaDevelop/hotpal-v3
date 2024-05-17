import { Field } from 'redux-form';
import { useState, useEffect, useRef } from 'react';

// import { russianCities } from 'base/russianCities';

import { autocompleteSearch } from 'pages/hotels/hooks/searchHotels';

const TempateInput = (props) => {

  const {
    input,
    // meta: { error }
  } = props;

  const {
    label,
    labelSecond,
    placeholder,
    wrapClass,
  } = props.obj;

  const [idTime, setIdTime] = useState(null)

  // const [сhoiseName, setСhoiseName] = useState(placeholder ? placeholder : 'Выбрать город');
  const [loading, setLoading] = useState(false);
  const [filterVal, setFilterVal] = useState('');

  const [russianCitiesList, setRussianCities] = useState([]);

  const selectRef = useRef(null);
  const inputRef = useRef(null);

  const [open, setOpen] = useState(false);


  useEffect(() => {

    inputRef.current.addEventListener("focus", selectOpen);
    // console.log('input.value', input.value)
    if (input.value) {
      // input.onChange(input.value);
      setFilterVal(input.value)
    }

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick)
    };


    function handleClick(e) {
      if (selectRef && selectRef.current) {
        const ref = selectRef.current
        if (!ref.contains(e.target)) {
          setOpen(false)
        }
      }
    }

    function selectOpen(e) {
      setOpen(true)
      inputRef.current.select()
      onSearchCity(e)
    }




  }, [input]);

  const choiseCity = (e) => {

    setFilterVal('');

    setRussianCities('');

    setFilterVal(e.currentTarget.getAttribute('namecity'));
    setOpen(false);

    // setСhoiseName(e.currentTarget.getAttribute('namecity'));
    input.onChange(e.currentTarget.getAttribute('namecity'));
  }


  const onSearchCity = (e) => {
    setLoading(true)

    clearTimeout(idTime)

    setIdTime(setTimeout(() => {

      autocompleteSearch(e.target.value).then(res => {
        console.log('regions get', res)
        setLoading(false)
        setRussianCities(res.data)
      });

    }, 1000))

    setFilterVal(e.target.value);

    input.onChange(e.currentTarget.getAttribute('namecity')); // ?
  }

  const clearFilterVal = () => {
    setFilterVal('');
    // setСhoiseName(placeholder ? placeholder : 'Выбрать город');
    setRussianCities('');
    // setOpen(false);
  }

  const renderCityList = (russianCitiesListParam) => {

    return (russianCitiesListParam.length > 0) ? russianCitiesListParam.map((item, index) => {
      // if (item.type !== 'Railway Station') {
      return (
        <li
          key={index}
          // coords={[item.coords.lat, item.coords.lon]}
          className={(item.type === 'hotels') ? 'hotels' : ''}
          namecity={item.name}
          onClick={choiseCity}
          id={item.id}

        >
          {/* {item.type === 'City' && (<>Город</>)} */}
          {/* {item.type === 'Neighborhood' && (<>При Город</>)} */}
          {/* {item.type === 'hotels' && (<>Отель</>)} */}
          {/* {item.type === 'Multi-Region (within a country)' && (<>Регион</>)} */}

          {item.name}</li>
      )
      // }

    }) : (<></>);
  }


  return (
    <div className={wrapClass}>

      {label && <label><b>{label}</b>{labelSecond && <div className='hint-input'><i><span>{labelSecond}</span></i></div>}</label>}
      <div
        ref={selectRef}
        className={`custom-select search-select ${open ? 'active' : ''}`}

      >
        <div className={`search-field-container ${filterVal.length > 0 ? 'search-choises' : ''}`}>

          <input
            {...input}
            type="text"
            value={filterVal}
            ref={inputRef}
            className="search-input input-decorate"
            onChange={onSearchCity}
            placeholder={placeholder}
          />
          {loading ? (<>
            <div className="preloader-input">
              <div className="preloader"></div>
            </div>

          </>) : (<em
            onClick={clearFilterVal}
          ></em>)}
        </div>
        {open && (
          <ul
            className='ln'
          >
            {renderCityList(russianCitiesList)}
          </ul>
        )}
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