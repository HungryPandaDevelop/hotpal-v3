export const renderCountTravel = (travelList,hotel,uid) => {
  // console.log(travelList,hotel,uid)
  let count = 0;
  travelList.map(item => {
    // console.log(item.idHotel, hotel)
    if (item.idHotel === hotel && item.userRef !== uid) {
      count++
    }
  })

  return count;
}

