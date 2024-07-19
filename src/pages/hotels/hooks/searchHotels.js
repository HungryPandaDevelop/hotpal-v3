import axios from 'axios';

// https://8124-37-204-10-198.ngrok-free.app
const url = 'https://b7c3-37-204-10-198.ngrok-free.app';
export const autocompleteSearch = (term) => {

  // console.log('search start')
  return axios.get(url + "/autocomplete-search", {
    headers: {
      'ngrok-skip-browser-warning': true
    },
    params: {
      query: term
    }
  }).then(res => {
    const response = res;
    // console.log('search end', response)
    return response;
  });
}

export const hotelsDataSingle = (hotelPrices) => {


  let tempArrayHotels = hotelPrices.map(el => {
    return el.id
  })

  return axios.get(url + "/hotels-data", {
    headers: {
      'ngrok-skip-browser-warning': true
    },
    params: {
      arrayHotels: tempArrayHotels
    }
  }).then(res => {

    return res.data;

  });
}

export const hotelsData = (hotelPrices, type) => {
  // console.log('start hotelsData', hotelPrices)

  let tempArrayHotels = hotelPrices;

  if (type === 'auto') {
    tempArrayHotels = tempArrayHotels.filter(el => el.type === 'hotels')
  }

  tempArrayHotels = tempArrayHotels.map(el => {
    return el.id
  });


  return axios.get(url + "/hotels-data", {
    headers: {
      'ngrok-skip-browser-warning': true
    },
    params: {
      arrayHotels: tempArrayHotels
    }
  }).then(res => {
    // console.log('res hotelsData', res)

    var renderArrHotels = [];

    // hotelPrices.forEach((el,index) => {
    //     renderArrHotels.push({ ...res.data.find(e => e.id === el.id), price: el.rates, index: index, el: el })
    // });
    // console.log('res', res)
    res.data.length > 0 && res.data.forEach((el, index) => {
      let findPrice = hotelPrices.find(e => e.id === el.id)
      renderArrHotels.push({ price: findPrice.rates, ...el })
    });

    return renderArrHotels;

  });
}


export const geoSearch = (longitude, latitude, dateFrom, dateTo, personCount) => {
  // console.log('loading....', dateFrom,dateTo)

  // let tempArrayHotels = [];
  // let tempArrayPrices = [];


  return axios.get(url + "/geo-search", {
    headers: {
      'ngrok-skip-browser-warning': true
    },
    params: {
      longitude: longitude,
      latitude: latitude,
      dateFrom: dateFrom,
      dateTo: dateTo,
      personCount: personCount,
    }
  }).then(res => {
    // console.log('loaded', res)
    // if (res.data.length > 0) {

    //   tempArrayHotels = res.data.map(el => {
    //     return el.id
    //   })
    //   tempArrayPrices = res.data.map(el => {
    //     return [el.id, el.rates]
    //     // return el.id
    //   })
    //   // setArrayPrices(tempArrayPrices)
    //   return [tempArrayHotels, tempArrayPrices]
    // }
    return res.data;
    // getDetailHotels(tempArrayHotels, tempArrayPrices)
  });

}

// export const regionSearch = (id,dateFrom,dateTo,personCount) => {
//   console.log('loading....', dateFrom,dateTo)

//   let tempArrayHotels = [];
//   let tempArrayPrices = [];


//   return axios.get(url+"/region-search", {
//     headers: {
//       'ngrok-skip-browser-warning': true
//     },
//     params: {
//       regionId: id,
//       dateFrom: dateFrom,
//       dateTo: dateTo,
//       personCount: personCount,
//     }
//   }).then(res => {
//     // console.log('loaded', res)
//     if (res.data.length > 0) {

//       tempArrayHotels = res.data.map(el => {
//         return el.id
//       })
//       tempArrayPrices = res.data.map(el => {
//         return [el.id, el.rates]
//         // return el.id
//       })
//       // setArrayPrices(tempArrayPrices)
//       return [tempArrayHotels, tempArrayPrices]
//     }

//     // getDetailHotels(tempArrayHotels, tempArrayPrices)
//   });

// }


export const hotelPage = (id, dateFrom, dateTo, personCount) => {
  // console.log('loading....', dateFrom,dateTo)

  // let tempArrayHotels = [];
  // let tempArrayPrices = [];


  return axios.get(url + "/hotel-page", {
    headers: {
      'ngrok-skip-browser-warning': true
    },
    params: {
      id: id,
      dateFrom: dateFrom,
      dateTo: dateTo,
      personCount: personCount,
    }
  }).then(res => {
    // console.log('loaded', res)


    if (res.data.length > 0) {

      // tempArrayHotels = res.data.map(el => {
      //   return el.id
      // })
      // tempArrayPrices = res.data.map(el => {
      //   return [el.id, el.rates]
      //   // return el.id
      // })
      // setArrayPrices(tempArrayPrices)
      return res.data
    }

    // getDetailHotels(tempArrayHotels, tempArrayPrices)
  });


}
