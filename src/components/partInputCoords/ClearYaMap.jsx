import { useRef } from 'react';

import { YMaps, Map, ZoomControl } from 'react-yandex-maps';
import { useState, useEffect } from 'react';

import addPlacemark from 'components/partInputCoords/addPlacemark';

const ClearYaMap = ({ currentLocation, centerPosition, changePosition, multy }) => {



  const myMapRef = useRef(null);

  const [myMap, setMyMap] = useState(null);
  const [loadMap, setLoadMap] = useState(false);
  const [globalPoint, setGlobalPoint] = useState(null);


  let addPosition = (pos, index) => {

    // 
    myMapRef.current.geoObjects.remove(globalPoint);

    let tempPoint = addPlacemark(myMap, myMapRef, pos, null, index);

    setGlobalPoint(tempPoint);
    // currentLocation && myMapRef.current.setCenter(currentLocation);
    myMapRef.current.geoObjects.add(tempPoint);

  };

  useEffect(() => {
    // console.log('currentLocation', currentLocation)

    if (loadMap) {
      if (currentLocation) {
        if (multy) {
          // console.log('remove all')
          myMapRef.current.geoObjects.removeAll();

          currentLocation.map((el, index) => {
            addPosition(el, index)
          });
        } else {
          addPosition(currentLocation, 0);
        }
      } else {
        myMapRef.current.geoObjects.removeAll();
      }

      // console.log('currentLocation', currentLocation);
    }
  }, [loadMap, currentLocation]);

  useEffect(() => {
    if (loadMap) {
      myMapRef.current.setCenter(centerPosition)
    }
  }, [centerPosition])


  return (
    <div className="ya-map">
      <YMaps
        query={{ apikey: 'fdb17d90-1d93-4d15-aa02-45c372d5e0f8' }}

      >
        <Map
          id="map"
          width="100%"
          height="100%"
          defaultState={
            {
              center: centerPosition ? centerPosition : [55.714247, 37.764375],
              zoom: 11
            }
          }
          modules={["util.bounds", "multiRouter.MultiRoute", "Placemark", "geocode"]}
          onLoad={(y) => {
            // myMap.current = y;
            setMyMap(y)
            setLoadMap(true)
            // console.log('ready', y);
          }}
          onBoundsChange={(e) => {
            changePosition && changePosition(e)
          }}
          instanceRef={myMapRef}
        >

          <ZoomControl />
        </Map>
      </YMaps>
    </div>
  )
}

export default ClearYaMap
