import userMarker from 'default/frontend/images/icons-app/marker-map-blue.svg'

const addPlacemark = (myMap, myMapRef, coords, setOptions, itemId) => {

  let myMarkerOptions = {
    iconLayout: 'default#image',
    iconImageHref: userMarker,
    iconImageSize: [30, 42],
  }

  let setMarkerStyle = myMarkerOptions;


  const placemark = new myMap.Placemark(
    coords,
    {
      itemId: itemId

    }
    , {
      ...setMarkerStyle,
      // Отключаем кнопку закрытия балуна.
      balloonCloseButton: false,
    });
  // 

  if (setOptions === 'myMarker') {
    return placemark
    //myMapRef.current.geoObjects.remove(placemark);
    // console.log(myPoint.length)

  } else {
    myMapRef.current.geoObjects.add(placemark);
    return placemark;

  }

};

export default addPlacemark;