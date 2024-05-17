import { Field } from 'redux-form';
import { useState, useEffect, useRef } from "react"

const TempateInput = (props) => {

  const {
    input,
    meta: { error }
  } = props;

  const {
    label,
    placeholder,
    text,
    textSecond,
    options,
    className,
    subType
  } = props.obj;

  const [tags, setTags] = useState([]);


  const [originList, setOriginList] = useState(options);
  const [filterList, setFilterList] = useState(options);

  const [showPopup, setShowPopup] = useState(false);

  const [term, setTerm] = useState('');

  const inputRef = useRef();

  const onTagsAdd = (item) => {
    setTags([...tags, item]);

    console.log('item', filterList.filter(origin => origin !== item))

    setFilterList(filterList.filter(origin => origin !== item))
  };

  const addOwn = () => {
    // console.log('t', [...tags, term])
    setTags([...tags, term]);

    setTerm('');

    setFilterList(originList);
  }


  const onRemoveTags = (el) => {

    setTags(tags.filter(item => item !== el));

    setFilterList([...filterList, el]) // такое себе

  }
  const [firstLoad, setFirstLoad] = useState(0);

  useEffect(() => {
    if (input.value && firstLoad === 0) {
      setFirstLoad(1)
      // console.log('in')


      if (input.value && input.value.length > 2) {

        let sting = input.value;

        // sting = sting.replace(/="/g, "='");
        // sting = sting.replace(/">/g, "'>");

        let inputValue = JSON.parse(sting);

        setTags(inputValue);
        let tempArr = options;


        console.log('input.value', inputValue)

        inputValue.map(el => tempArr = tempArr.filter(item => el !== item));

        setOriginList(tempArr);
        setFilterList(tempArr);

      }
    }


    input.onChange(tags);
  }, [tags]);




  const filterOptions = (e) => {

    setTerm(e.target.value);

    setFilterList(originList.filter(el => {
      if ((el.toLowerCase()).indexOf(e.target.value) >= 0) { return el; }
    }));
  };


  const renderOptions = (filterList) => {

    if (subType) return false;

    return (
      <ul className="tags-popup ln">
        {filterList.length === 0 ? 'Список пуст' : filterList.map((item, index) => (
          <li key={index} onClick={() => { onTagsAdd(item) }} dangerouslySetInnerHTML={{ __html: item }}></li>
        ))}
      </ul>)
  }



  return (
    <div className={`tags-add-container ${className}`}>
      <div className="tags-container">
        <h3>{label}:</h3>
        <div className="tags-addted">

          {tags.length === 0 ? 'Список пуст' : tags.map((item, index) => (
            <span
              key={index}
              className="tag"
              onClick={() => { onRemoveTags(item) }}
            ><i dangerouslySetInnerHTML={{ __html: item }}></i><em></em></span>))}
        </div>
      </div>
      <div className="tags-add-input">
        <div className="tags-add-hint">
          <h3>{text}</h3>
          <div className="tags-add-hint-text">
            {textSecond}
          </div>
        </div>
        <div className={`${showPopup ? 'active' : ''} input-box tags-search`}>
          <input
            className="input-decorate"
            type="text"
            placeholder={placeholder}
            ref={inputRef}
            value={term}
            onChange={filterOptions}
            onBlur={() => { setShowPopup(false) }}
            onFocus={() => { setShowPopup(true) }}
          />
          <i></i>
          {renderOptions(filterList)}
        </div>
        {subType && <div className='btn btn--blue' onClick={addOwn}>Добавить интерес</div>}
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
