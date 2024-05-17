export const renderImg = (hotelSingle)=>{
  let startImg = hotelSingle.images?.length > 0 && hotelSingle.images[0]
  if (startImg) {
    let regex = /[{}]/g;
    startImg = startImg.replace(regex, "");
    startImg = startImg.replace(/size/g, "1024x768");
    return (
      <div className="hotels-img"
        style={{ backgroundImage: `url(${startImg})` }}
      >
      </div>
    )
  } else {
    return <div className="hotels-img"></div>
  }
}

export const renderImgSingle = (hotelSingle)=>{
  let startImg = hotelSingle.imgHotel
  if (startImg) {
    let regex = /[{}]/g;
    startImg = startImg.replace(regex, "");
    startImg = startImg.replace(/size/g, "1024x768");
    return (
      <div className="hotels-img"
        style={{ backgroundImage: `url(${startImg})` }}
      >
      </div>
    )
  } else {
    return <div className="hotels-img"></div>
  }
}