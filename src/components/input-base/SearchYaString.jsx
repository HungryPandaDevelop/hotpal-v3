import { Field } from 'redux-form';
import { useEffect } from 'react';

// import ClearYaMap from 'components/partInputCoords/ClearYaMap'

const TempateInput = (props) => {

  // const [currentLocation, setCurrentLocation] = useState([0, 0]);

  const {
    input,
  } = props;

  const {
    label,
    labelSecond,
    placeholder,
    wrapClass,
    setGetCoords
  } = props.obj;

  const initSuggest = () => {
    // console.log('sugg 1')
    const { ymaps } = window;
    if (ymaps.SuggestView) {
      // console.log('sugg 2')
      const suggest = new ymaps.SuggestView('coords-ya');

      suggest.events.add('select', (e) => {

        const val = String(e.get('item').value.trim());

        let myGeocoder = ymaps.geocode(val);
        // console.log('sugg 3', val)
        myGeocoder.then((res) => {
          // console.log('coords', res)
          const coords = [res.geoObjects.get(0).geometry._coordinates[0], res.geoObjects.get(0).geometry._coordinates[1]]

          setGetCoords(coords)
        }).catch(err => {
          console.log('er', err)
        });
      });
    }
  }


  useEffect(() => {

    setTimeout(() => {
      initSuggest()
    }, 1000);

  }, []);




  return (
    <div className={wrapClass}>

      {label && <label htmlFor='coords-ya' className="col-12"><b>{label}</b><span>{labelSecond}</span></label>}

      <input
        // {...input}
        id='coords-ya'
        type="text"
        className="input-decorate"
        defaultValue={input.value.address}
        autoComplete="off"
        placeholder={placeholder}
      />

    </div>

  )
}
const RenderInput = ({ obj }) => {


  return <Field
    name={obj.name}
    obj={obj}
    component={TempateInput}
  />
}


export default RenderInput