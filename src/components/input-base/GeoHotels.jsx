import { Field } from 'redux-form';

import ClearYaMap from 'components/partInputCoords/ClearYaMap'

const TempateInput = (props) => {

  // const [currentLocation, setCurrentLocation] = useState([55.714247, 37.764375]);

  const {
    input,
  } = props;

  const {
    label,
    labelSecond,
    wrapClass,
    getCoords,
    loading,
    listingsCoords
  } = props.obj;



  const filterCoordsFromHotel = () => {
    return !loading && listingsCoords
      ? listingsCoords.map(el => [el.latitude, el.longitude])
      : null;
  }



  const changePosition = (e) => {

    input.onChange(e.originalEvent.newCenter);
  }

  return (
    <div className={wrapClass}>

      {label && <label htmlFor='coords-ya' className="col-12"><b>{label}</b><span>{labelSecond}</span></label>}


      <ClearYaMap
        currentLocation={filterCoordsFromHotel()}
        multy={true}
        centerPosition={getCoords}
        changePosition={changePosition}
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